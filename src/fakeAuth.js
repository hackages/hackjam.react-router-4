class auth {
  authenticated = false;
  persist = true;
  subscribers = [];

  constructor(persist) {
    this.persist = persist;
    if (this.persist) {
      try {
        this.authenticated = localStorage.getItem('authenticated') === 'true';
      } catch (err) {
        console.log(err); // BEST WAY TO HANDLE ERRORS, EVER
      }
    }
  }

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
    if (this.persist) {
      localStorage.setItem('authenticated', this.authenticated.toString());
    }
    this.notify();
  };
}

export const fakeAuth = new auth(true);
