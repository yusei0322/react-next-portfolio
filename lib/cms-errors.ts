// SDKの新旧エラー形式を扱う講師提供の補助関数です。
export function isCMSNotFound(error: unknown): boolean {
  if (typeof error === "object" && error !== null && "status" in error) {
    return error.status === 404;
  }
  return error instanceof Error && /^fetch API response status: 404(?:\n|$)/.test(error.message);
}
