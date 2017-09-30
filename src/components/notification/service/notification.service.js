"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var position_1 = require("./position/position");
var notification_1 = require("./notification/notification");
var Rx_1 = require("rxjs/Rx");
var NotificationService = (function () {
    function NotificationService() {
        this.NotificationStream = new Rx_1.Subject();
        this.Position = position_1.NotificationPosition.getDefault();
    }
    NotificationService.Simple = function () {
        return new notification_1.SimpleNotification();
    };
    NotificationService.Action = function () {
        return new notification_1.ActionNotification();
    };
    NotificationService.prototype.Show = function (notification) {
        this.NotificationStream.next(notification);
    };
    NotificationService.DefaultExitTime = 6000;
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
__export(require("./notification/notification"));
__export(require("./position/position"));
//# sourceMappingURL=notification.service.js.map