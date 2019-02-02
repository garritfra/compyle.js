import fs from "fs";

/**
 * Returns the contents of a file for a given path
 */
export function readFile(path: string | number | Buffer | import("url").URL) {
  return fs.readFileSync(path).toString();
}

export function writeFile(
  path: string | number | Buffer | import("url").URL,
  data: string
) {
  fs.writeFileSync(path, data);
}
