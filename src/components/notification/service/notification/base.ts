import { NotificationPosition } from "./../position/position";

export class NotificationBase {
    public TextContent: string;
    public Hidedelay: number;
    public Position: NotificationPosition;

    textContent(textContent: string) {
        this.TextContent = textContent;
    }

    position(position: NotificationPosition) {
        if (!position.isValid()) {
            position = NotificationPosition.getDefault();
        }

        this.Position = position;

    }

    hideDelay(delay: number) {
        this.Hidedelay = delay;
    }
}