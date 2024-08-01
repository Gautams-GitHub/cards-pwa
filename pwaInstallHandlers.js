// https://github.com/FilipChalupa/pwa-install-handler

class PwaInstallHandler {
  constructor() {
    this.event = null;
    this.callbacks = [];

    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.updateEvent(event);
    });

    window.addEventListener("appinstalled", () => {
      this.updateEvent(null);
    });
  }

  /**
   * Triggers install prompt.
   */
  install = async () => {
    if (this.event) {
      this.event.prompt();
      return await this.event.userChoice.then(({ outcome }) => {
        this.updateEvent(null);
        return outcome === "accepted" || true;
      });
    } else {
      throw new Error("Not allowed to prompt.");
    }
  };

  /**
   * Returns internal `BeforeInstallPromptEvent`.
   */
  getEvent() {
    return this.event;
  }

  /**
   * Tells whether the app is ready to be installed.
   */
  canInstall() {
    return this.event !== null;
  }

  updateEvent(event) {
    if (event === this.event) {
      return;
    }
    this.event = event;
    this.callbacks.forEach((callback) => callback(this.canInstall()));
  }

  /**
   * Adds listener with a callback which is called when installability state changes.
   */
  addListener(callback) {
    callback(this.canInstall());
    this.callbacks.push(callback);
  }

  /**
   * Removes listener.
   */
  removeListener(callback) {
    this.callbacks = this.callbacks.filter(
      (otherCallback) => callback !== otherCallback
    );
  }
}

export const pwaInstallHandler = new PwaInstallHandler();
