import * as _ from "lodash";

/** A progress tracker for a loop with a known end. */
export class Progress {
  private started: boolean;
  private period: number;

  constructor(private iterations: number) {
    this.started = false;
    this.period = Math.floor(iterations / 100);
  }

  track(iteration: number) {
    if (!this.started) {
      process.stdout.write("Working... 0.0%");
      this.started = true;
      return;
    }

    if (iteration + 1 === this.iterations) {
      process.stdout.clearLine(-1);
      process.stdout.cursorTo(0);
      return;
    }

    if (iteration % this.period === 0) {
      const periods = iteration / this.period;
      process.stdout.cursorTo(11);
      process.stdout.write(`${periods}%`);
      process.stdout.clearLine(1);
    }
  }
}
