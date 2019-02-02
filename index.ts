#!/usr/bin/env node

import fs from "fs";

const fileName = process.argv[2];

const input = readFile(fileName);
let output = input.replace("print", "console.log");
writeFile(fileName.replace(".py", ".js"), output);

/**
 * Returns the contents of a file for a given path
 */
function readFile(path: string | number | Buffer | import("url").URL) {
  return fs.readFileSync(path).toString();
}

function writeFile(
  path: string | number | Buffer | import("url").URL,
  data: string
) {
  fs.writeFileSync(path, data);
}
