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
var notification_1 = require("./../../../services/notification/notification/notification");
var SimpleNotificationComponent = (function () {
    function SimpleNotificationComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.onActionClicked = new core_1.EventEmitter();
    }
    SimpleNotificationComponent.prototype.onActionClick = function (action) {
        this.onActionClicked.emit(action);
    };
    SimpleNotificationComponent.prototype.addClass = function (classToAdd) {
        this._renderer.setElementClass(this._element.nativeElement, classToAdd, true);
    };
    SimpleNotificationComponent.prototype.removeClass = function (classToAdd) {
        this._renderer.setElementClass(this._element.nativeElement, classToAdd, false);
    };
    SimpleNotificationComponent.prototype.initialize = function (notification) {
        if (this.Notification) {
            this.removeClass(this.Notification.Position.Class);
        }
        this.Notification = notification;
        this.addClass(this.Notification.Position.Class);
    };
    Object.defineProperty(SimpleNotificationComponent.prototype, "IsActionNotification", {
        get: function () {
            return this.Notification instanceof notification_1.ActionNotification;
        },
        enumerable: true,
        configurable: true
    });
    SimpleNotificationComponent.prototype.setHighlightClasses = function () {
        var classes = {};
        if (this.IsActionNotification && this.Notification.HighlightClass) {
            var stringClasses = new Array();
            if (this.Notification.HighlightClass.indexOf(" ") > -1) {
                stringClasses = this.Notification.HighlightClass.split(" ");
            }
            else {
                stringClasses.push(this.Notification.HighlightClass);
            }
            stringClasses.forEach(function (classElement) {
                classes[classElement] = true;
            });
        }
        return classes;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SimpleNotificationComponent.prototype, "onActionClicked", void 0);
    SimpleNotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "simple-notification",
            templateUrl: "./simple-notification.component.html",
            styleUrls: ["./simple-notification.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [common_1.NgIf, common_1.NgFor, common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], SimpleNotificationComponent);
    return SimpleNotificationComponent;
}());
exports.SimpleNotificationComponent = SimpleNotificationComponent;
//# sourceMappingURL=simple-notification.component.js.map