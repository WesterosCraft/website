import users from "./users-830.json" assert { type: "json" };
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

(async () => {
  // @ts-ignore
  const newarr = [];

  // @ts-ignore
  Object.entries(users.users).forEach(([key, value]) => {
    // @ts-ignore
    newarr.push({
      // @ts-ignore
      username: value.username || key,
      rank: value?.nodes?.find((n) => n.type === "inheritance")?.key,
    });
  });

  const pathx = path.join(__dirname + "/users.json");
  // @ts-ignore
  fs.writeFileSync(pathx, JSON.stringify(newarr));
})();
