
# Angular 2 notification

A minimalistic highly configurable angular 2 toast notification

## Import this module to your angular app

```js
import { NotificationModule } from "angular2-notification";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NotificationModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## Angular 2 Notification

Add this piece of code to your app html:

```html
<notifications position="bottom-left"></notifications>
```

There are three four types of notification positions.

```html
<notifications position="bottom-left"></notifications>
<notifications position="bottom-right"></notifications>
<notifications position="top-left"></notifications>
<notifications position="top-right"></notifications>
```

If you want to throttle (default false) the notifications provide the throttle input as true. The Action Notification does not bypass this throttle so it will block the notifications until it gets a user interaction.

```html
    <notifications throttle="false"></notifications>
```

After you add this element to your app html you need to inject the notification service in your controllers and then create notifications.

```js
import { NotificationService, NotificationPosition } from "./../components/notification";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _notificationService: NotificationService) {
  }

  showNotification(){
      this._notificationService.Show(NotificationService.Action()
        .textContent("Audio on?")
        .actions(["Ok", "Cancel"])
        .highlightClass("")
        .hideDelay(1000)
        .awaitAction(true)
        .then((action) => { console.log(action); }));
  }
}
```

## Angular 2 Simple Notification

A simple notification is text info only. No action buttons.

```js
    this._notificationService.Show(NotificationService.Simple()
        .textContent("Sure 2?"));
```



Arguments:

textContent         -           text to be shown in notification toast

hideDelay           -           time in ms to hide the notification (default is 6000ms)


## Angular 2 Action Notification

With an action notification you can add buttons to the notification and expect user interaction.
An example:

```js
    this._notificationService.Show(NotificationService.Action()
        .textContent("Audio on?")
        .actions(["Ok", "Cancel"])
        .highlightClass("")
        .hideDelay(1000)
        .awaitAction(true)
        .then((action) => { console.log(action); }));
```



Arguments:

textContent         -           text to be shown in notification toast

hideDelay           -           time in ms to hide the notification (default is 6000ms)

actions             -           a string array with the button texts

highlightClass      -           a string to be added to the buttons as a class

awaitAction         -           this will nullify the hide delay and will wait for a user interaction to exit

then                -           this callback will be called with one of the actions strings that user clicks