import { Percolation } from "./Percolation";
export class PercolationStats {
  private thresholds: number[] = [];
  private meanValue: number = 0;
  private stddevValue: number = 0;

  constructor(n: number, trials: number) {
    if (n <= 0 || trials <= 0) {
      throw new Error("Both n and trials must be greater than 0");
    }

    for (let i = 0; i < trials; i++) {
      const percolation = new Percolation(n);
      while (!percolation.percolates()) {
        const row = Math.floor(Math.random() * n + 1);
        const col = Math.floor(Math.random() * n + 1);
        percolation.open(row, col);
      }
      const numberOfOpenSites = percolation.numberOfOpenSites();
      this.thresholds.push(numberOfOpenSites / (n * n));
    }

    this.meanValue = this.mean();
    this.stddevValue = this.stddev();
  }

  mean(): number {
    const sum = this.thresholds.reduce((acc, val) => acc + val, 0);
    return sum / this.thresholds.length;
  }

  stddev(): number {
    const mean = this.meanValue;
    const sumSqDiff = this.thresholds.reduce(
      (acc, val) => acc + (val - mean) ** 2,
      0
    );
    return Math.sqrt(sumSqDiff / (this.thresholds.length - 1));
  }

  confidenceLo(): number {
    return (
      this.meanValue -
      (1.96 * this.stddevValue) / Math.sqrt(this.thresholds.length)
    );
  }

  confidenceHi(): number {
    return (
      this.meanValue +
      (1.96 * this.stddevValue) / Math.sqrt(this.thresholds.length)
    );
  }
}
