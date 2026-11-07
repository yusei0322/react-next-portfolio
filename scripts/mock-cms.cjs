// CI専用。実際のアプリや学生の起動コマンドからは読み込みません。
if (process.env.CURRICULUM_CHECK !== '1') throw new Error('CI専用モックです。');
const originalFetch = globalThis.fetch;
const make = (endpoint, id) => ({
  id, title: endpoint === 'blogs' ? '教材検証ブログ' : '教材検証作品',
  description: '接続経路の確認', content: '<p>本文テスト<strong>強調</strong></p><script>alert(1)</script>',
  createdAt: '2026-09-01T00:00:00.000Z', updatedAt: '2026-09-01T00:00:00.000Z',
  publishedAt: '2026-09-01T00:00:00.000Z',
});
globalThis.fetch = async (input, init) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (url.hostname !== 'curriculum-ci.microcms.io') return originalFetch(input, init);
  const [, , , endpoint, id] = url.pathname.split('/');
  if (!['blogs', 'works'].includes(endpoint)) return Response.json({ message: 'Not Found' }, { status: 404 });
  if (id) return id === 'cms-test' ? Response.json(make(endpoint, id)) : Response.json({ message: 'Not Found' }, { status: 404 });
  return Response.json({ contents: url.searchParams.get('limit') === '0' ? [] : [make(endpoint, 'cms-test')], totalCount: 1, offset: 0, limit: 100 });
};
