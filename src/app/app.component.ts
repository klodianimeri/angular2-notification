import { Component } from '@angular/core';

import { NotificationService, NotificationPosition } from "./../components/notification";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _notificationService: NotificationService) {
    setTimeout(() => {

      this._notificationService.Show(NotificationService.Action()
        .textContent("Audio on?")
        .actions(["Ok", "Cancel"])
        .highlightClass("")
        .hideDelay(1000)
        .awaitAction(true)
        .then((action) => { console.log(action); }));

      this._notificationService.Show(NotificationService.Action()
        .textContent("Sure 1?")
        .actions(["Yes", "No"])
        .highlightClass("")
        // .hideDelay(1000)
        .awaitAction(true)
        .then((action) => { console.log(action); }));

      this._notificationService.Show(NotificationService.Simple()
        .textContent("Sure 2?"));
      // .hideDelay(1000)
      // .awaitAction(true)

      this._notificationService.Show(NotificationService.Action()
        .textContent("Sure 3?")
        .actions(["Yes", "No"])
        .highlightClass("")
        // .hideDelay(1000)
        // .awaitAction(true)
        .then((action) => { console.log(action); }));


    }, 4000);


  }
}

