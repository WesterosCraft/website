import guides from "./backup-guide.json" assert { type: "json" };
import path from "node:path";
import fs from "node:fs";
import { findUp } from "find-up";
import { fileURLToPath } from "url";
// @ts-ignore
import toMarkdown from "@sanity/block-content-to-markdown";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const serializers = {
  types: {
    video: (props: any) => `{% video id="${props.node.url}" /%}`,
    figure: (props: any) => `-------- FIGURE HERE EVENTUALLY --------`,
    callout: (props: any) => `-------- CALLOUT HERE EVENTUALLY --------`,
  },
};

async function doesDirectoryExist(path: string) {
  const r = await findUp(path, { type: "directory" });
  return !!r;
}

const categoryMap = (region: string) => {
  switch (region) {
    case "8837ee46-c394-4de7-93e7-cfcc140dac62":
      return "rulesAndGuidelines";
    case "5f099069-f0ea-4077-b723-af85761811d6":
      return "gettingStarted";
    case "e1ac352f-1567-410a-ac16-d516ef533faf":
      return "resources";
    case "52a3451d-02e6-4cea-bcc4-e97b78a99e74":
      return "tutorials";
  }
};

(async () => {
  //search for directory. if it exists, overwrite, otherwise create a new directory and file

  guides.slice(0, 5).forEach(async (guide) => {
    const pathx = path.join(
      __dirname + "/../src/content/docs",
      guide.slug.current
    );

    const directoryExists = await doesDirectoryExist(pathx);

    if (!directoryExists) {
      fs.mkdirSync(pathx, { recursive: true });
    }

    const fileContent = `---
title: ${guide.title}
docCategory: ${categoryMap(guide.guideCategory._ref)}
---${"\n" + toMarkdown(guide.body, { serializers })}\n`;

    fs.writeFileSync(pathx + "/index.mdoc", fileContent);
  });
})();
