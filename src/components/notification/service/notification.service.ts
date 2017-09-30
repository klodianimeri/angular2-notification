import { Injectable } from '@angular/core';

import { NotificationBase, SimpleNotification, ActionNotification } from "./notification/notification";

import { Observer, Observable, Subject } from "rxjs/Rx";

@Injectable()
export class NotificationService {
    static DefaultExitTime: number = 6000;
    public NotificationStream: Subject<NotificationBase> = new Subject<NotificationBase>();

    constructor() {
    }

    static Simple(): SimpleNotification {
        return new SimpleNotification();
    }

    static Action(): ActionNotification {
        return new ActionNotification();
    }

    Show(notification: NotificationBase) {
        this.NotificationStream.next(notification);
    }
}

export * from "./notification/notification";