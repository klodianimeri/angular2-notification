"use strict";
var NotificationPosition = (function () {
    function NotificationPosition(top, bottom, left, right) {
        this.Top = top;
        this.Bottom = bottom;
        this.Left = left;
        this.Right = right;
    }
    NotificationPosition.prototype.isValid = function () {
        return !(this.Top && this.Bottom) && !(this.Left && this.Right);
    };
    NotificationPosition.getDefault = function () {
        return new NotificationPosition(true, false, false, true);
    };
    Object.defineProperty(NotificationPosition.prototype, "Class", {
        get: function () {
            return (this.Top ? "top" : "bottom") + "-" + (this.Left ? "left" : "right");
        },
        enumerable: true,
        configurable: true
    });
    NotificationPosition.prototype.topOrBottom = function () {
        return this.Top ? "top" : "bottom";
    };
    return NotificationPosition;
}());
exports.NotificationPosition = NotificationPosition;
//# sourceMappingURL=position.js.map