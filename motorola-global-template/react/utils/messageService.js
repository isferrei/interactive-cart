import { BehaviorSubject } from "rxjs";

const subscriber = new BehaviorSubject(0);

const subscriber1 = new BehaviorSubject(0);

const messageService = {
  send: function(msg) {
    subscriber.next(msg);
    subscriber1.next(msg);
  }
};

export { messageService, subscriber, subscriber1 };
