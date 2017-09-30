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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var simple_notification_component_1 = require("./simple-notification/simple-notification.component");
var notification_service_1 = require("./../../services/notification/notification.service");
var NotificationsComponent = (function () {
    function NotificationsComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.Throttle = true;
        this.Notification = null;
        this.NotificationQueue = Array();
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._notificationService.NotificationStream.subscribe(function (notification) {
            if (!notification.Position) {
                notification.Position = _this._notificationService.Position;
            }
            _this.NextNotification(notification);
        }, function (error) { return _this.processError(error); });
    };
    NotificationsComponent.prototype.processNotifiction = function (notification) {
        var _this = this;
        this.RemoveNotification(function () {
            _this.NotificationState = "inactive-" + notification.Position.topOrBottom();
            var timeDisplayed = notification.Hidedelay != undefined ? notification.Hidedelay : notification_service_1.NotificationService.DefaultExitTime;
            _this.Notification = notification;
            _this.NotificationComponent.initialize(notification);
            _this.NotificationState = notification.Position.topOrBottom();
            if (_this.Notification instanceof notification_service_1.ActionNotification && _this.Notification.AwaitAction) {
                return;
            }
            _this._leaveTimeoutHandler = setTimeout(function () {
                _this.RemoveNotification(function () {
                    if (_this.Throttle) {
                        _this.NextNotification();
                    }
                });
            }, timeDisplayed);
        });
    };
    NotificationsComponent.prototype.processError = function (error) {
        this.RemoveNotification();
    };
    NotificationsComponent.prototype.onActionClicked = function (action) {
        var _this = this;
        this.Notification.execute(action);
        this.NotificationState = "inactive-" + this.Notification.Position.topOrBottom();
        this.Notification = null;
        this.RemoveNotification(function () {
            _this.NextNotification();
        });
    };
    NotificationsComponent.prototype.RemoveNotification = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (this.Notification) {
            this.NotificationState = "inactive-" + this.Notification.Position.topOrBottom();
        }
        else {
            callback();
            return;
        }
        clearTimeout(this._displayTimeoutHandler);
        clearTimeout(this._leaveTimeoutHandler);
        if (callback) {
            setTimeout(function () {
                _this.Notification = null;
                callback();
            }, 30);
        }
    };
    NotificationsComponent.prototype.ngOnDestroy = function () {
        this.RemoveNotification();
    };
    NotificationsComponent.prototype.NextNotification = function (notification) {
        if (notification === void 0) { notification = null; }
        if (this.Throttle) {
            if (notification) {
                this.NotificationQueue.push(notification);
                //We throtle
                if (this.Notification != null) {
                    return;
                }
            }
            if (this.NotificationQueue.length == 0) {
                return;
            }
            else {
                this.processNotifiction(this.Notification = this.NotificationQueue.shift());
            }
        }
        else if (!this.Throttle && notification) {
            //no action clicked must go since notifications are not throwtled
            if (this.Notification instanceof notification_service_1.ActionNotification && this.Notification.AwaitAction) {
                this.Notification.execute(null);
            }
            this.processNotifiction(notification);
        }
    };
    __decorate([
        core_1.ViewChild(simple_notification_component_1.SimpleNotificationComponent), 
        __metadata('design:type', simple_notification_component_1.SimpleNotificationComponent)
    ], NotificationsComponent.prototype, "NotificationComponent", void 0);
    NotificationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "notifications",
            templateUrl: "./notification.component.html",
            styleUrls: ["./notification.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [simple_notification_component_1.SimpleNotificationComponent, common_1.NgIf],
            animations: [
                core_1.trigger('notificationState', [
                    core_1.state('inactive-top', core_1.style({
                        top: -70,
                        opacity: 0,
                    })),
                    core_1.state('inactive-bottom', core_1.style({
                        bottom: -70,
                        opacity: 0,
                    })),
                    core_1.state('top', core_1.style({
                        top: 0,
                        opacity: 1,
                    })),
                    core_1.state('bottom', core_1.style({
                        bottom: 0,
                        opacity: 1,
                    })),
                    core_1.transition('* <=> top', core_1.animate('180ms ease-out')),
                    core_1.transition('* <=> bottom', core_1.animate('180ms ease-out')),
                ])
            ]
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notification.component.js.map