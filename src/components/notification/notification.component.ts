import {
    Component,
    OnInit,
    ViewChild,
    OnDestroy,
    Input,
    Renderer2,
    ElementRef,
    Directive,
    ViewContainerRef,
    ComponentFactoryResolver,
} from "@angular/core";

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { SimpleNotificationComponent } from "./simple-notification/simple-notification.component";
import { ActionNotificationComponent } from "./action-notification/action-notification.component";

import { NotificationBase, NotificationService, SimpleNotification, ActionNotification, NotificationPosition } from "./index";

@Directive({
    selector: '[notification-host]',
})
export class NotificationDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
    moduleId: module.id,
    selector: "notifications",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.css"],
})
export class NotificationsComponent implements OnInit, OnDestroy {
    private NotificationQueue: Array<NotificationBase> = Array<NotificationBase>();

    private _displayTimeoutHandler: any;
    private _leaveTimeoutHandler: any;
    private _position: NotificationPosition = new NotificationPosition();


    constructor(
        private _renderer: Renderer2,
        private _element: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private _notificationService: NotificationService) {
    }

    @ViewChild(NotificationDirective) notificationDirective: NotificationDirective;
    @ViewChild(SimpleNotificationComponent) NotificationComponent: SimpleNotificationComponent;

    @Input("position") set position(value: string) {

        switch (value) {
            case "top-left":
                this._position.setTopLeft();
                break;
            case "top-right":
                this._position.setTopRight();
                break;
            case "bottom-left":
                this._position.setBottomLeft();
                break;
            case "bottom-right":
                this._position.setBottompRight();
                break;
            default: break;
        }
    }

    @Input("stack") Stack: boolean = false;
    @Input("throttle") Throttle: boolean = false;

    ngOnInit() {
        //SET NOTIFICATIONS POSITION
        this._renderer.addClass(this._element.nativeElement, this._position.Class);

        this._notificationService.NotificationStream.subscribe(
            (notification) => {

                if (!notification.Position) {
                    notification.Position = this._position;
                }

                notification.Hidedelay = notification.Hidedelay != undefined ? notification.Hidedelay : NotificationService.DefaultExitTime;

                this.NextNotification(notification);
            },
            error => this.processError(error)
        );
    }

    ngAfterViewInit() {
    }

    private processNotifiction(notification: NotificationBase) {

        //start
        let componentFactory: any;

        if (notification instanceof SimpleNotification) {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(SimpleNotificationComponent);
        } else if (notification instanceof ActionNotification) {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(ActionNotificationComponent);
        } else {
            return;
        }

        let viewContainerRef = this.notificationDirective.viewContainerRef;

        // viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<SimpleNotificationComponent | ActionNotificationComponent>componentRef.instance).initialize(notification);

        // if (this.Throttle) {
        (<SimpleNotificationComponent | ActionNotificationComponent>componentRef.instance).onNotificationDestroy.subscribe((notification) => {

            componentRef.destroy();

            if (!this.Stack) {
                this.NotificationQueue.splice(this.NotificationQueue.indexOf(notification), 1);

                this.NextNotification();
            }

        });
    }

    private processError(error: any) {
        console.log(error);
    }


    ngOnDestroy() {
        // this.RemoveNotification();
    }

    private NextNotification(notification: NotificationBase = null) {

        if (!this.Stack) {

            if (this.Throttle) {

                if (notification) {
                    //We throtle
                    this.NotificationQueue.push(notification);
                    if (this.NotificationQueue.length == 1) {
                        this.processNotifiction(notification);
                    }
                } else if (this.NotificationQueue.length == 0) {
                    return;
                } else {
                    this.processNotifiction(this.NotificationQueue[0]);
                }

            } else {
                this.processNotifiction(notification);
            }

        } else if (this.Stack && notification) {
            //no action clicked must go since notifications are not Stackd
            if (notification instanceof ActionNotification && (<ActionNotification>notification).AwaitAction) {
                (<ActionNotification>notification).execute(null);
            }

            this.processNotifiction(notification);
        }
    }
}