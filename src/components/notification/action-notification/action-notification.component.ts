import {
    Component,
    ViewEncapsulation,
    Renderer2,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    ViewContainerRef,
} from "@angular/core";

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { NotificationBase, ActionNotification } from "./../service/notification/notification";

@Component({
    moduleId: module.id,
    selector: "action-notification",
    templateUrl: "./action-notification.component.html",
    styleUrls: ["./action-notification.component.css"],
    animations: [
        trigger('notificationState', [
            state('inactive-top', style({
                top: "-70px",
                opacity: 0,
            })),
            state('inactive-bottom', style({
                bottom: "-70px",
                opacity: 0,
            })),
            state('top', style({
                top: "0px",
                opacity: 1,
            })),
            state('bottom', style({
                bottom: "0px",
                opacity: 1,
            })),
            transition('inactive-top => top', animate('220ms 80ms ease-out')),
            transition('top => inactive-top', animate('220ms ease-out')),
            transition('inactive-bottom => bottom', animate('220ms 80ms ease-out')),
            transition('bottom => inactive-bottom', animate('220ms ease-out')),

        ])
    ]
})
export class ActionNotificationComponent implements OnInit, OnDestroy {
    public Notification: NotificationBase;
    private _notificationState: string;
    private _displayTimeoutHandler: any;

    @Output() onNotificationDestroy: EventEmitter<NotificationBase> = new EventEmitter<NotificationBase>();

    onActionClick(action: string) {
        // this.destroyComponent();
        (<ActionNotification>this.Notification).execute(action);
        this.destroyComponent();
    }

    constructor(
        private _renderer: Renderer2,
        private _element: ElementRef) {

    }

    ngOnInit() {
    }

    ngOnDestroy() {
        clearTimeout(this._displayTimeoutHandler);
    }

    initialize(notification: NotificationBase) {
        if (this.Notification) {
            this._renderer.removeClass(this._element.nativeElement, this.Notification.Position.Class);
        }

        this.Notification = notification;
        this._renderer.addClass(this._element.nativeElement, this.Notification.Position.Class);
        this._notificationState = `inactive-${this.Notification.Position.topOrBottom()}`;

        setTimeout(() => {
            this._notificationState = notification.Position.topOrBottom();
        }, 50);

        if (!(<ActionNotification>this.Notification).AwaitAction) {
            this._displayTimeoutHandler = setTimeout(() => {
                this.destroyComponent();
            }, this.Notification.Hidedelay);
        }
    }

    destroyComponent() {
        if (this.Notification) {
            this._notificationState = `inactive-${this.Notification.Position.topOrBottom()}`;
        }

        setTimeout(() => {
            this.onNotificationDestroy.emit(this.Notification);
        }, 220);
    }


    get IsActionNotification(): boolean {
        return this.Notification instanceof ActionNotification;
    }

    setHighlightClasses() {
        let classes = {};

        if (this.IsActionNotification && (<ActionNotification>this.Notification).HighlightClass) {
            let stringClasses: Array<string> = new Array<string>();

            if ((<ActionNotification>this.Notification).HighlightClass.indexOf(" ") > -1) {
                stringClasses = (<ActionNotification>this.Notification).HighlightClass.split(" ");
            } else {
                stringClasses.push((<ActionNotification>this.Notification).HighlightClass);
            }

            stringClasses.forEach(classElement => {
                classes[classElement] = true;
            });
        }
        return classes;
    }
}