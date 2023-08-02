import locations from "./backup-locations.json" assert { type: "json" };
import path from "node:path";
import fs from "node:fs";
import { findUp } from "find-up";
import { fileURLToPath } from "url";
// @ts-ignore
import toMarkdown from "@sanity/block-content-to-markdown";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const regionMap = (region: string) => {
  switch (region) {
    case "333b1884-bdae-43e2-8a96-b2c89ea89c79":
      return "dorne";
    case "bef10f36-8ac8-4780-894e-bbc1978884d3":
      return "riverlands";
    case "94dceb06-f437-481e-b8f7-eac882e6d9c3":
      return "theWall";
    case "a5b3b817-c80d-4621-967c-f13b619ae235":
      return "north";
    case "a6b0523a-c2a7-48cd-9132-86a92cd8ba9f":
      return "vale";
    case "4a1046e1-af4c-4e58-8beb-1db82b0562c7":
      return "ironIslands";
    case "fa9b1818-54dc-4799-a10b-9e25b8f0c547":
      return "westerlands";
    case "cf2197be-be99-4d62-95f6-ff452b07f0ec":
      return "crownlands";
    case "fb625d70-c2f1-4625-91b5-68b9f89064a4":
      return "stormlands";
    case "12692247-e688-4d81-838a-083b12548ece":
      return "reach";
    case "d077ff2b-0ba9-48f0-b018-72dccda16187":
      return "beyondTheWall";
  }
};

const buildCategoryMap = (buildType: string) => {
  switch (buildType) {
    case "3c75eaa9-3405-48d6-9aa1-82a7e49ff08a":
      return "city";
    case "aa78e9be-b3ce-4112-9ab3-7a052ac5b020":
      return "castle";
    case "f47f7fe4-7684-46cc-86aa-9b7275f4e0de":
      return "town";
    case "2a760f6a-022e-4f0c-9cff-9a9d9e613f6c":
      return "village";
    case "0532d707-dcfa-455c-847a-c3c6121ab875":
      return "holdfast";
    case "d2532a38-7ecc-43d9-9769-ddd442d0d831":
      return "keep";
    case "932860c4-afd3-4ddf-8f7e-24706a24c8f1":
      return "tower";
    case "f7e66aa6-0612-4c05-a4cf-9a29b113b855":
      return "clan";
    case "b27697c2-ffc7-4339-aa55-b9d248c4d015":
      return "crannog";
    case "925faa14-5220-4bda-9d69-024f6366019d":
      return "landmark";
    case "eea65049-09b1-4a2d-b340-cfa23c676618":
      return "ruin";
    case "666e74f4-1fd4-4c1d-a829-53ba176ba8cb":
      return "miscellaneous";
    default:
      return buildType;
  }
};

const serializers = {
  types: {
    video: (props: any) => `{% video id="${props.node.url}" /%}`,
    figure: (props: any) => `FIGURE HERE EVENTUALLY`,
  },
};

async function doesDirectoryExist(path: string) {
  const r = await findUp(path, { type: "directory" });
  return !!r;
}

(async () => {
  //search for directory. if it exists, overwrite, otherwise create a new directory and file

  locations.slice(0, 10).forEach(async (location) => {
    const pathx = path.join(
      __dirname + "/../src/content/locations",
      location.slug.current
    );

    const directoryExists = await doesDirectoryExist(pathx);

    console.log("🫵 directoryExists:", directoryExists);

    if (!directoryExists) {
      fs.mkdirSync(pathx, { recursive: true });
    }

    const fileContent = `---
title: ${location.title}
region: ${regionMap(location.region?._ref)}
projectStatus: ${location.projectStatus}
projectType: ${buildCategoryMap(location.buildCategory?.[0]._ref)}
warp: ${location.warp}
house: ${location.house}
application: ${location.application}
projectLeads: ${location.projectLead}
dateStarted: "${location.dateStarted?.split?.("T")?.[0]}"
dateCompleted: "${location.dateCompleted?.split?.("T")?.[0]}"
difficultyLevel: "${location.difficulty}"
redoAvailable: ${location.redoAvailable || false}
serverProject: ${location.serverProject || false}
---${"\n" + toMarkdown(location.body, { serializers })}\n`;

    fs.writeFileSync(pathx + "/index.mdoc", fileContent);
  });
})();
