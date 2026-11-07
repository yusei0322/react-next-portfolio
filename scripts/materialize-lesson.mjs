import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
if (process.env.CURRICULUM_CHECK !== "1") {
  throw new Error("検証専用です。学生はNotionの手順に従って編集してください。");
}
const stages = {
  starter: [],
  "blog-list": [["09-posts", "posts"]],
  "both-lists": [["09-posts", "posts"], ["09-works", "works"]],
  "blog-detail": [["10-posts", "posts"], ["09-works", "works"]],
  complete: [["10-posts", "posts"], ["10-works", "works"]],
};
const stage = process.argv[2];
if (!Object.hasOwn(stages, stage)) throw new Error("不明な検証段階です。");
for (const [source, target] of stages[stage]) {
  await writeFile(path.join("lib", `${target}.ts`), await readFile(path.join("curriculum/steps", `${source}.ts.txt`)));
}
console.log(`教材検証段階: ${stage}`);
