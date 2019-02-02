export function replacePrint(contents: string[]): string[] {
  return contents.map(line => {
    return line.replace("print", "console.log");
  });
}

export function addVariableDeclarations(contents: string[]): string[] {
  return contents.map(line => {
    return line.indexOf("=") > 0 ? "let " + line : line;
  });
}

export function removeEmptyLines(contents: string[]): string[] {
  return contents.filter(line => {
    return line.length > 0;
  });
}
