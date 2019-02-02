#!/usr/bin/env node

import { readFile, writeFile } from "./io";
import program from "commander";
import * as transforms from "./transforms";

program
  .option("-r, --run", "Run Programm after compilation")
  .parse(process.argv);

const fileName = program.args[0];

const input = readFile(fileName);
let buffer = input.split("\n");
buffer = transforms.removeEmptyLines(buffer);
buffer = transforms.addVariableDeclarations(buffer);
buffer = transforms.replacePrint(buffer);

let output = "";

for (const line of buffer) {
  output += line + ";\n";
}

writeFile(fileName.replace(".py", ".js"), output);
