export default class LineBuffer {
  lines: string[];

  constructor(lines: string[]) {
    this.lines = lines;
  }

  applyTransform(transform: (lines: string[]) => string[]) {
    this.lines = transform(this.lines);
  }
}
