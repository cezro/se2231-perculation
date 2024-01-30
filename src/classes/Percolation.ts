import { UF } from "./UF";

export class Percolation {
  size: number;
  nodes: UF;
  nodeStates: boolean[];

  constructor(size: number) {
    this.nodes = new UF(size);
    this.nodeStates = Array(size * size).fill(false);
    this.size = this.nodes.size;
  }

  getIndex(row: number, col: number) {
    return (row - 1) * this.size + (col - 1);
  }

  open(row: number, col: number) {
    this.nodeStates[this.getIndex(row, col)] = true;
  }

  showCurrent() {
    console.log("ids: \n", this.nodes.ids);
    console.log("nodeStates: \n", this.nodeStates);
  }
}
