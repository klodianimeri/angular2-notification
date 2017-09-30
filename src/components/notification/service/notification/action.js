"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("./base");
var ActionNotification = (function (_super) {
    __extends(ActionNotification, _super);
    function ActionNotification() {
        _super.call(this);
        this.AwaitAction = false;
    }
    ActionNotification.prototype.textContent = function (textContent) {
        _super.prototype.textContent.call(this, textContent);
        return this;
    };
    ActionNotification.prototype.position = function (position) {
        _super.prototype.position.call(this, position);
        return this;
    };
    ActionNotification.prototype.hideDelay = function (delay) {
        _super.prototype.hideDelay.call(this, delay);
        return this;
    };
    ActionNotification.prototype.highlightClass = function (hclass) {
        this.HighlightClass = hclass;
        return this;
    };
    ActionNotification.prototype.action = function (action) {
        this.Actions.push(action);
        return this;
    };
    ActionNotification.prototype.actions = function (actions) {
        this.Actions = new Array();
        this.Actions = actions;
        return this;
    };
    ActionNotification.prototype.awaitAction = function (await) {
        if (await === void 0) { await = true; }
        this.AwaitAction = await;
        return this;
    };
    ActionNotification.prototype.then = function (callback) {
        this.Callback = callback;
        return this;
    };
    ActionNotification.prototype.execute = function (action) {
        if (this.Actions.indexOf(action) === -1) {
            return;
        }
        if (this.Callback instanceof Function) {
            this.Callback(action);
        }
    };
    return ActionNotification;
}(base_1.NotificationBase));
exports.ActionNotification = ActionNotification;
//# sourceMappingURL=action.js.map