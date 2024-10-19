import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  dispatchEvent(eventName: string, eventData: any) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: eventData }));
  }

  listenForEvent(eventName: string, callback: (event: any) => void) {
    window.addEventListener(eventName, (event: any) => {
      callback(event);
    });
  }
}
