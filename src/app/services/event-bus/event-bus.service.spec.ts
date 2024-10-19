import { TestBed } from '@angular/core/testing';
import { EventBusService } from './event-bus.service';

describe('EventBusService', () => {
  let service: EventBusService;

  beforeEach(() => {
    service = TestBed.inject(EventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch an event with the correct name and data', () => {
    const eventName = 'testEvent';
    const eventData = { key: 'value' };

    // Spy on window.dispatchEvent using Jest
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    service.dispatchEvent(eventName, eventData);

    // Check that window.dispatchEvent was called with the correct event
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      new CustomEvent(eventName, { detail: eventData })
    );
  });

  it('should listen for the correct event and trigger the callback with the correct data', () => {
    const eventName = 'testEvent';
    const eventData = { key: 'value' };

    const mockCallback = jest.fn(); // Create a mock function for the callback

    // Spy on window.addEventListener
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    service.listenForEvent(eventName, mockCallback);

    // Manually dispatch the event with the same name
    const mockEvent = new CustomEvent(eventName, { detail: eventData });
    window.dispatchEvent(mockEvent);

    // Ensure that window.addEventListener was called with the correct event name
    expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, expect.any(Function));

    // Check that the callback was triggered with the correct event data
    expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining({ detail: eventData }));
  });

  it('should fail if the dispatched event has a different name than the one listened for', () => {
    const listenEventName = 'correctEvent';
    const dispatchEventName = 'wrongEvent';
    const eventData = { key: 'value' };

    const mockCallback = jest.fn(); // Create a mock function for the callback

    service.listenForEvent(listenEventName, mockCallback);

    // Manually dispatch the event with a different name
    const mockEvent = new CustomEvent(dispatchEventName, { detail: eventData });
    window.dispatchEvent(mockEvent);

    // Expect that the callback was not called because the event name is wrong
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
