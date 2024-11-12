// Custom events

class StartEvent extends CustomEvent<null> {
  constructor() {
    super("start");
  }
}

class StopEvent extends CustomEvent<null> {
  constructor() {
    super("stop");
  }
}

class ResetEvent extends CustomEvent<null> {
  constructor() {
    super("reset");
  }
}

interface TickEventDetail {
  seconds: number;
}

class TickEvent extends CustomEvent<TickEventDetail> {
  constructor(detail: TickEventDetail) {
    super("tick", { detail });
  }
}

interface EventMap {
  start: StartEvent;
  stop: StopEvent;
  reset: ResetEvent;
  tick: TickEvent;
}

export class StopwatchController {
  #seconds: number = 0;
  #tickInterval: NodeJS.Timer | null = null;
  #eventTarget = new EventTarget();

  constructor() {}

  /**
   * Returns the elapsed seconds since the stopwatch was started.
   */
  get seconds() {
    return this.#seconds;
  }

  start() {
    if (this.#tickInterval) {
      return;
    }

    this.#tickInterval = setInterval(() => {
      this.#seconds += 0.01;

      // Dispatch tick event
      this.#eventTarget.dispatchEvent(
        new TickEvent({ seconds: this.#seconds }),
      );
    }, 10);

    // Dispatch start event
    this.#eventTarget.dispatchEvent(new StartEvent());
  }

  stop() {
    if (this.#tickInterval) {
      // Clear the tick interval
      clearInterval(this.#tickInterval);

      // Unset the tick interval
      this.#tickInterval = null;
    }

    // Dispatch stop event
    this.#eventTarget.dispatchEvent(new StopEvent());
  }

  reset() {
    // Reset the seconds to 0
    this.#seconds = 0;

    // Stop the stopwatch
    this.stop();

    // Dispatch reset event
    this.#eventTarget.dispatchEvent(new ResetEvent());
  }

  addEventListener<K extends keyof EventMap>(
    type: K,
    listener: (event: EventMap[K]) => void,
  ) {
    this.#eventTarget.addEventListener(
      type,
      listener as EventListenerOrEventListenerObject,
    );
  }

  removeEventListener<K extends keyof EventMap>(
    type: K,
    listener: (event: EventMap[K]) => void,
  ) {
    this.#eventTarget.removeEventListener(
      type,
      listener as EventListenerOrEventListenerObject,
    );
  }
}
