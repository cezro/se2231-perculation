export class UF {
  size: number;
  sz: number[];
  ids: number[];

  constructor(size: number) {
    this.size = size;
    this.sz = Array(size ** 2).fill(1);
    this.ids = [];
    for (let i = 0; i < size ** 2; i++) {
      this.ids.push(i);
    }
  }

  root(i: number) {
    while (i != this.ids[i]) {
      this.ids[i] = this.ids[this.ids[i]];
    }
    return i;
  }

  getIndex(row: number, col: number) {
    return (row - 1) * this.size + (col - 1);
  }

  rootByRowAndColumn(row: number, col: number) {
    return this.root(this.getIndex(row, col));
  }

  union(p: number, q: number) {
    const i = this.root(p);
    const j = this.root(q);

    if (i == j) {
      return;
    }

    if (this.sz[i] < this.sz[j]) {
      this.ids[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.ids[j] = i;
      this.sz[i] += this.sz[j];
    }
  }

  showSz() {
    console.log("sz: \n", this.sz);
  }

  showIds() {
    console.log("ids: \n", this.ids);
  }
}
