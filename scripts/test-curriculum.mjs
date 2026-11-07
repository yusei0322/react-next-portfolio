import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
let passed = 0;
function load(file, imports = {}, environment = {}) {
  const text = readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }, reportDiagnostics: true });
  assert.equal(compiled.diagnostics?.filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, file);
  const sandboxModule = { exports: {} };
  vm.runInNewContext(compiled.outputText, {
    exports: sandboxModule.exports, module: sandboxModule, Error, encodeURIComponent,
    process: { env: environment },
    require: name => name === 'server-only' ? {} : Object.hasOwn(imports, name) ? imports[name] : require(name),
  }, { filename: file });
  return sandboxModule.exports;
}
async function test(name, run) { await run(); passed++; console.log(`PASS ${name}`); }
const errors = load('lib/cms-errors.ts');
await test('404だけを判定する', () => {
  assert.equal(errors.isCMSNotFound(new Error('fetch API response status: 404')), true);
  assert.equal(errors.isCMSNotFound({ status: 404 }), true);
  for (const status of [401, 403, 429, 500]) assert.equal(errors.isCMSNotFound({ status }), false);
  assert.equal(errors.isCMSNotFound(new Error('Network Error')), false);
});
await test('未設定をサンプル表示で隠さない', () => {
  const client = load('lib/microcms.ts', { 'microcms-js-sdk': { createClient: () => ({}) } });
  assert.throws(() => client.getMicroCMSClient(), /未設定/);
});
await test('サービスIDとURLを区別する', () => {
  const client = load('lib/microcms.ts', { 'microcms-js-sdk': { createClient: () => ({}) } }, { MICROCMS_SERVICE_DOMAIN: 'https://invalid.example', MICROCMS_API_KEY: 'test-only' });
  assert.throws(() => client.getMicroCMSClient(), /サービスID/);
});
for (const [file, endpoint, listFn, detailFn, sampleName] of [
  ['posts', 'blogs', 'getPosts', 'getPostBySlug', 'samplePosts'],
  ['works', 'works', 'getWorks', 'getWorkBySlug', 'sampleWorks'],
]) {
  const item = { id: 'cms-test', title: '検証タイトル', createdAt: '2026-09-01T00:00:00Z' };
  const imports = client => ({ '@/lib/microcms': { getMicroCMSClient: () => client }, '@/lib/cms-errors': errors, [`@/data/sample-${file}`]: { [sampleName]: [{ id: 'sample', slug: 'sample', title: '初期' }] } });
  await test(`${endpoint}:一覧の変換とno-store`, async () => {
    const mod = load(`curriculum/steps/09-${file}.ts.txt`, imports({ getList: async options => {
      assert.equal(options.endpoint, endpoint); assert.equal(options.queries.limit, 100);
      assert.equal(options.customRequestInit.cache, 'no-store'); return { contents: [item] };
    } }));
    const data = await mod[listFn]();
    assert.equal(data[0].slug, item.id); assert.equal(data[0].description, '');
    assert.equal(data[0].content, ''); assert.equal(data[0].thumbnail, undefined);
    assert.equal((await mod[detailFn]('sample')).title, '初期');
  });
  await test(`${endpoint}:一覧0件`, async () => {
    const mod = load(`curriculum/steps/09-${file}.ts.txt`, imports({ getList: async () => ({ contents: [] }) }));
    assert.equal((await mod[listFn]()).length, 0);
  });
  await test(`${endpoint}:詳細本文と画像を変換する`, async () => {
    const mod = load(`curriculum/steps/10-${file}.ts.txt`, imports({ getListDetail: async options => {
      assert.equal(options.contentId, 'cms-test'); assert.equal(options.customRequestInit.cache, 'no-store');
      return { ...item, content: '<p>本文</p>', thumbnail: { url: 'https://images.microcms-assets.io/test.png', width: 200, height: 100 } };
    } }));
    const data = await mod[detailFn]('cms-test'); assert.equal(data.content, '<p>本文</p>'); assert.equal(data.thumbnail.width, 200);
  });
  await test(`${endpoint}:存在しない記事とAPIの到達を区別する`, async () => {
    let probe = 0;
    const mod = load(`curriculum/steps/10-${file}.ts.txt`, imports({ getListDetail: async () => { throw new Error('fetch API response status: 404'); }, getList: async () => { probe++; return { contents: [] }; } }));
    assert.equal(await mod[detailFn]('missing'), undefined); assert.equal(probe, 1);
  });
  await test(`${endpoint}:APIの404を隠さない`, async () => {
    const error = new Error('fetch API response status: 404');
    const mod = load(`curriculum/steps/10-${file}.ts.txt`, imports({ getListDetail: async () => { throw error; }, getList: async () => { throw error; } }));
    await assert.rejects(mod[detailFn]('missing'), e => e.message === error.message);
  });
  for (const status of [401, 403, 500]) {
    await test(`${endpoint}:HTTP ${status}を404にしない`, async () => {
      const mod = load(`curriculum/steps/10-${file}.ts.txt`, imports({ getListDetail: async () => { throw new Error(`fetch API response status: ${status}`); } }));
      await assert.rejects(mod[detailFn]('cms-test'), new RegExp(String(status)));
    });
  }
}
if (process.env.SKIP_SANITIZER_TEST !== '1') {
  await test('本文からscript・イベント属性・javascript URLを除去する', () => {
    const { sanitizeRichText } = load('lib/sanitize-rich-text.ts');
    const result = sanitizeRichText('<p>本文<strong>強調</strong></p><script>alert(1)</script><img src="https://example.com/a.png" onerror="alert(2)"><a href="javascript:alert(3)">リンク</a>');
    assert.match(result, /<strong>強調<\/strong>/);
    assert.doesNotMatch(result, /<script|onerror|javascript:/i);
  });
} else { console.log('SKIP 本物のsanitize-htmlパッケージを使う検証（CIで実行）'); }
console.log(`${passed} tests passed`);
