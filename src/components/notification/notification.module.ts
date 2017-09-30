import {
    NgModule
} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { NotificationsComponent, NotificationDirective } from "./notification.component";
import { SimpleNotificationComponent } from "./simple-notification/simple-notification.component";
import { ActionNotificationComponent } from "./action-notification/action-notification.component";
import { NotificationService } from "./service/notification.service";

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        NotificationsComponent,
        SimpleNotificationComponent,
        ActionNotificationComponent,
        NotificationDirective
    ],
    exports: [
        NotificationsComponent,
        SimpleNotificationComponent,
        ActionNotificationComponent
    ],
    providers: [
        NotificationService
    ],
    entryComponents: [
        SimpleNotificationComponent,
        ActionNotificationComponent
    ]
})
export class NotificationModule { }