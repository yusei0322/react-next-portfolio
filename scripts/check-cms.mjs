const domain = process.env.MICROCMS_SERVICE_DOMAIN?.trim();
const key = process.env.MICROCMS_API_KEY?.trim();
if (!domain || !key || !/^[a-z0-9-]+$/.test(domain)) {
  console.error("サービスIDとAPIキーを.env.localに設定してください。値は表示しません。");
  process.exit(1);
}
try {
  for (const endpoint of ["blogs", "works"]) {
    const response = await fetch(`https://${domain}.microcms.io/api/v1/${endpoint}?limit=1`, {
      headers: { "X-MICROCMS-API-KEY": key }, signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`${endpoint}: HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.contents)) throw new Error(`${endpoint}: リスト形式ではありません。`);
    console.log(`${endpoint}: 接続成功、公開コンテンツ${data.totalCount}件`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "接続を確認してください。");
  process.exitCode = 1;
}
