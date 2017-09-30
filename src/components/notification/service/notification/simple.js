"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("./base");
var SimpleNotification = (function (_super) {
    __extends(SimpleNotification, _super);
    function SimpleNotification() {
        _super.call(this);
    }
    SimpleNotification.prototype.textContent = function (textContent) {
        _super.prototype.textContent.call(this, textContent);
        return this;
    };
    SimpleNotification.prototype.position = function (position) {
        _super.prototype.position.call(this, position);
        return this;
    };
    SimpleNotification.prototype.hideDelay = function (delay) {
        _super.prototype.hideDelay.call(this, delay);
        return this;
    };
    return SimpleNotification;
}(base_1.NotificationBase));
exports.SimpleNotification = SimpleNotification;
//# sourceMappingURL=simple.js.map