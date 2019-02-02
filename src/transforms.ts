import { keywords } from "./rules";

export function replacePrint(contents: string[]): string[] {
  return contents.map(line => {
    return line.replace("print", "console.log");
  });
}

export function addVariableDeclarations(contents: string[]): string[] {
  return contents.map((line, i) => {
    let startsWithKeyword = false;
    keywords.forEach(word => {
      console.log("line" + i + "starts with a keyword");
      if (line.search(word) > 0) {
        startsWithKeyword = true;
      }
    });

    if (startsWithKeyword) {
      return line;
    }

    return line.search(/[^=<>!][=][^<>!=]/) > 0 ? "let " + line : line;
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
  const getIndentation = (line: string) => line.search(/\S|$/);
  const contains = (arr: any[], item: any): boolean => {
    for (const e in arr) {
      if (e == item) return true;
    }
    return false;
  };

  let toBeScopeClosed: number[] = [];

  return contents.map((line, i) => {
    if (line[line.length - 1] == ":") {
      line = line.replace(":", "{");
      if (contains(toBeScopeClosed, i)) {
        line = "}" + line;
      }
      let remainingLines = contents.slice(i, contents.length);
      const levelOfIndentation = getIndentation(line);
      remainingLines.forEach((line, i) => {
        if (getIndentation(line) == levelOfIndentation) {
          toBeScopeClosed.push(i);
        }
      });
    }
    if (i == contents.length - 1 && getIndentation(line) > 0) {
      line += "}";
    }
    return line;
  });
}

export function fixElif(contents: string[]): string[] {
  let indentation = 0;
  const getIndentation = (line: string) => line.search(/\S|$/);

  return contents.map((line, i) => {
    return line.replace("elif", "else if");
  });
}
