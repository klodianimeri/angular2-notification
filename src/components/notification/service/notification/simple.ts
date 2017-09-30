import { NotificationBase } from "./base";

export class SimpleNotification extends NotificationBase {
    constructor() {
        super();
    }

    textContent(textContent: string): SimpleNotification {
        super.textContent(textContent);
        return this;
    }

    hideDelay(delay: number): SimpleNotification {
        super.hideDelay(delay);
        return this;
    }
}