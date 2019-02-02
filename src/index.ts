#!/usr/bin/env node

import { readFile, writeFile } from "./io";
import program from "commander";

program.parse(process.argv);
const fileName = program.args[0];

const input = readFile(fileName);
let output = "";

input.split("\n").forEach(line => {
  if (line === "") return;
  line = line.replace("print", "console.log");
  if (line.indexOf("=") > 0) {
    console.log(line);
    line = "let " + line;
  }

  output += line + ";\n";
});

writeFile(fileName.replace(".py", ".js"), output);
