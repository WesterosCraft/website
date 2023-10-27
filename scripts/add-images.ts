// import images from "./results.json" assert { type: "json" };

import fs from "node:fs/promises";

const results = {
  "acorn-hall-1.png": "e4kcmker1lik/acorn-hall-1",
  "amber-1.jpg": "a8dz4r6psis4/amber-1",
  "amber-10.jpg": "bt1caflblh4n/amber-10",
  "amber-2.jpg": "i12pubmqbyvy/amber-2",
  "amber-3.jpg": "osttifd5zoat/amber-3",
  "amber-4.jpg": "to4egul2ab8j/amber-4",
  "amber-5.jpg": "ptfzwhp7jlzy/amber-5",
  "amber-6.jpg": "d8fjnuyd507o/amber-6",
  "amber-7.jpg": "sgqd9psesknm/amber-7",
  "amber-8.jpg": "bvmlsnha3yba/amber-8",
  "amber-9.jpg": "gv2r0kq0y7k5/amber-9",
  "amberly-1.png": "rmt1xxdcjjoq/amberly-1",
};

for (const key in results) {
  const key_parts = key.split("-");
  const search_dir = "src/content/locations";

  fs.readdir(search_dir)
    .then((subdirs) => {
      //   console.log(subdirs);

      subdirs.forEach(async (subdir) => {
        if (subdir.includes(key_parts[0])) {
          const full_path = `${search_dir}/${subdir}/index.mdoc`;
          try {
            console.log("🫵 : subdirs.forEach : full_path", full_path);

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
                `locationImages:
                    - src: >-
                        https://bxf03rev1vvg.keystatic.net/cm4n7v612uoj/images/${results[key]}
                      ` +
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
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

// Example
// locationImages:
//   - src: >-
//       https://bxf03rev1vvg.keystatic.net/cm4n7v612uoj/images/e4kcmker1lik/acorn-hall-1
//   - src: >-
//       https://bxf03rev1vvg.keystatic.net/cm4n7v612uoj/images/e4kcmker1lik/acorn-hall-1
//     height: 1017
//     width: 1920
