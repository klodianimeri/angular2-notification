
export class NotificationPosition {
    public Top: boolean;
    public Bottom: boolean;
    public Left: boolean;
    public Right: boolean;

    constructor(top: boolean = false, bottom: boolean = true, left: boolean = false, right: boolean = true) {
        this.Top = top;
        this.Bottom = bottom;
        this.Left = left;
        this.Right = right;
    }

    setTopLeft() {
        this.Top = true;
        this.Bottom = false;
        this.Left = true;
        this.Right = false;
    }

    setTopRight() {
        this.Top = true;
        this.Bottom = false;
        this.Left = false;
        this.Right = true;
    }

    setBottomLeft() {
        this.Top = false;
        this.Bottom = true;
        this.Left = true;
        this.Right = false;
    }

    setBottompRight() {
        this.Top = false;
        this.Bottom = true;
        this.Left = false;
        this.Right = true;
    }

    isValid(): boolean {
        return !(this.Top && this.Bottom) && !(this.Left && this.Right);
    }

    static getDefault(): NotificationPosition {
        return new NotificationPosition(true, false, false, true);
    }

    get Class(): string {
        return `${this.Top ? "top" : "bottom"}-${this.Left ? "left" : "right"}`;
    }

    topOrBottom(): string {
        return this.Top ? "top" : "bottom";
    }
}