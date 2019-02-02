#!/usr/bin/env node

import { readFile, writeFile } from "./io";
import program from "commander";
import * as transforms from "./transforms";
import LineBuffer from "./Buffer";

program
  .option("-r, --run", "Run Programm after compilation")
  .parse(process.argv);

const fileName = program.args[0];

const input = readFile(fileName);
let buffer = new LineBuffer(input.split("\n"));
buffer.applyTransform(transforms.removeComments);
buffer.applyTransform(transforms.removeEmptyLines);
buffer.applyTransform(transforms.addVariableDeclarations);
buffer.applyTransform(transforms.replacePrint);

let output = "";

for (const line of buffer.lines) {
  output += line + ";\n";
}

writeFile(fileName.replace(".py", ".js"), output);
