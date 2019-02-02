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

export function removeComments(contents: string[]): string[] {
  return contents.map(line => {
    const commentIndex = line.indexOf("#");
    if (commentIndex == -1) return line;
    return line.substr(0, commentIndex).trimRight();
  });
}

export function insertBlocks(contents: string[]): string[] {
  let indentation = 0;
  const getIndentation = (line: string) => line.search(/\S|$/);

  return contents.map((line, i) => {
    if (line[line.length - 1] == ":") {
      // Update indentation with next line
      indentation = getIndentation(contents[i + 1]);
      return line.replace(":", "{");
    } else if (indentation > getIndentation(line)) {
      indentation = getIndentation(line);
      return "}" + line;
    }

    return line;
  });
}
