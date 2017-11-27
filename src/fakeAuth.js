class auth {
  authenticated = false;
  subscribers = [];

  subscribe = (subscriber) => {
    subscriber(this.authenticated);
    this.subscribers = [...this.subscribers, subscriber];
  };

  notify = () => {
    this.subscribers
      .forEach(subscriber => subscriber(this.authenticated));
  };

  toggle = () => {
    this.authenticated = !this.authenticated;
    this.notify();
  };
}

export const fakeAuth = new auth();
