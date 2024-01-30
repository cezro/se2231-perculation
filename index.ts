import { UF } from "./src/classes/UF";
import { Percolation } from "./src/classes/Percolation";
import { PercolationStats } from "./src/classes/PercolationStats";

const instance = new PercolationStats(10, 100);

console.log(
  instance.confidenceHi(),
  instance.confidenceLo(),
  instance.mean(),
  instance.stddev()
);
