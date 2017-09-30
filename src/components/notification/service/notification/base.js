"use strict";
var position_1 = require("./../position/position");
var NotificationBase = (function () {
    function NotificationBase() {
    }
    NotificationBase.prototype.textContent = function (textContent) {
        this.TextContent = textContent;
    };
    NotificationBase.prototype.position = function (position) {
        if (!position.isValid()) {
            position = position_1.NotificationPosition.getDefault();
        }
        this.Position = position;
    };
    NotificationBase.prototype.hideDelay = function (delay) {
        this.Hidedelay = delay;
    };
    return NotificationBase;
}());
exports.NotificationBase = NotificationBase;
//# sourceMappingURL=base.js.map