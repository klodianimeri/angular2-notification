import { NotificationBase } from "./base";

export class ActionNotification extends NotificationBase {
    public AwaitAction: boolean = false;
    public Actions: string[];
    public Callback: (action: string) => any;
    public HighlightClass: string;

    constructor() {
        super();
    }

    textContent(textContent: string): ActionNotification {
        super.textContent(textContent);
        return this;
    }

    hideDelay(delay: number): ActionNotification {
        super.hideDelay(delay);
        return this;
    }

    highlightClass(hclass: string): ActionNotification {
        this.HighlightClass = hclass;
        return this;
    }

    action(action: string): ActionNotification {
        this.Actions.push(action);
        return this;
    }

    actions(actions: string[]): ActionNotification {
        this.Actions = new Array<string>();
        this.Actions = actions;
        return this;
    }

    awaitAction(isAwait: boolean = true): ActionNotification {
        this.AwaitAction = isAwait;
        return this;
    }

    then(callback: (action: string) => any): ActionNotification {
        this.Callback = callback;
        return this;
    }

    execute(action: string) {
        if (this.Actions.indexOf(action) === -1) {
            return;
        }

        if (this.Callback instanceof Function) {
            this.Callback(action);
        }

    }
}