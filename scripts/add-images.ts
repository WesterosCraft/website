import results from "./results.json" assert { type: "json" };
import fs from "node:fs/promises";

async function processFiles() {
  for (const key in results) {
    const key_parts = key.split("-");
    const new_key_parts = key_parts.slice(0, key_parts.length - 1);
    const new_key = new_key_parts.join("-");
    const search_dir = "src/content/locations";

    try {
      const subdirs = await fs.readdir(search_dir);

      for (const subdir of subdirs) {
        if (subdir === new_key) {
          console.log(`${subdir} | ${new_key}`);
          const full_path = `${search_dir}/${subdir}/index.mdoc`;

          try {
            const fileContent = await fs.readFile(full_path, "utf-8");
            const startBlockPos = fileContent.indexOf("---");
            const endBlockPos = fileContent.lastIndexOf("---") + 3; // Include the closing "---" in the block

            // Extract the block and modify it
            const block = fileContent.substring(startBlockPos, endBlockPos);

            // Check if locationImages property already exists in the block
            if (block.includes("locationImages")) {
              // Append new src instead of overwriting the property
              const modifiedBlock = block.replace(
                /(\s+- src: >-\s+(.+)\r?\n)+/g,
                `$&  - src: >-\n      https://bxf03rev1vvg.keystatic.net/cm4n7v612uoj/images/${results[key]}\n` // Add the new src
              );
              const modifiedContent = fileContent.replace(block, modifiedBlock);

              await fs.writeFile(full_path, modifiedContent, "utf-8");
              console.log(`Appended a src to ${full_path}`);
            } else {
              // Modify the block by adding a new line before the closing "---"
              const lastDashIndex = block.lastIndexOf("---");
              const modifiedBlock =
                block.substring(0, lastDashIndex) +
                `locationImages:\n` +
                `  - src: >-\n` +
                `      https://bxf03rev1vvg.keystatic.net/cm4n7v612uoj/images/${results[key]}` +
                "\n" +
                block.substring(lastDashIndex);

              const modifiedContent = fileContent.replace(block, modifiedBlock);
              await fs.writeFile(full_path, modifiedContent, "utf-8");
              console.log(`Added a line to ${full_path}`);
            }
          } catch (err) {
            console.log(`Error modifying file ${full_path}: ${err}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

processFiles().catch((err) => {
  console.error(err);
});
