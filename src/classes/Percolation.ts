import { UF } from "./UF";

export class Percolation {
  size: number;
  nodes: UF;
  nodeStates: boolean[];
  phantomTop: number;
  phantomBottom: number;

  constructor(size: number) {
    this.nodes = new UF(size);
    this.phantomTop = size ** 2;
    this.phantomBottom = size ** 2 + 1;

    this.nodes.ids.push(this.phantomTop);
    this.nodes.ids.push(this.phantomBottom);

    for (let i = 0; i < size; i++) {
      this.nodes.union(i, this.phantomTop);
      this.nodes.union(this.nodes.ids.length - 3 - i, this.phantomBottom);
    }

    this.nodeStates = Array(size * size).fill(false);
    this.size = this.nodes.size;
  }

  getIndex(row: number, col: number) {
    return (row - 1) * this.size + (col - 1);
  }

  open(row: number, col: number) {
    const openIndex = this.getIndex(row, col);
    const aboveIndex = this.getIndex(row - 1, col);
    const belowIndex = this.getIndex(row + 1, col);
    const rightIndex = this.getIndex(row, col + 1);
    const leftIndex = this.getIndex(row, col - 1);

    this.nodeStates[openIndex] = true;
    if (this.nodeStates[aboveIndex]) {
      this.nodes.union(aboveIndex, openIndex);
    }
    if (this.nodeStates[belowIndex]) {
      this.nodes.union(belowIndex, openIndex);
    }
    if (this.nodeStates[rightIndex]) {
      this.nodes.union(rightIndex, openIndex);
    }
    if (this.nodeStates[leftIndex]) {
      this.nodes.union(leftIndex, openIndex);
    }
  }

  showCurrent() {
    console.log("ids: \n", this.nodes.ids);
    console.log("nodeStates: \n", this.nodeStates);
  }

  percolates() {
    return this.nodes.connected(this.phantomTop, this.phantomBottom);
  }

  numberOfOpenSites() {
    let openSites = 0;
    this.nodeStates.forEach((i) => {
      if (i) {
        openSites++;
      }
    });
    return openSites;
  }
}
