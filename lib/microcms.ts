import "server-only";
import { createClient } from "microcms-js-sdk";

// サンプル段階では呼びません。接続段階では設定不備をサンプル表示で隠しません。
export function getMicroCMSClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN?.trim();
  const apiKey = process.env.MICROCMS_API_KEY?.trim();
  if (!serviceDomain || !apiKey) {
    throw new Error("microCMSの環境変数が未設定です。.env.localを確認して再起動してください。");
  }
  if (!/^[a-z0-9-]+$/.test(serviceDomain)) {
    throw new Error("MICROCMS_SERVICE_DOMAINにはURLではなくサービスIDだけを設定してください。");
  }
  return createClient({ serviceDomain, apiKey });
}
