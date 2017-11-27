# HackJam React-Router 4
During this HackJam you'll learn how to use the latest version of React-Router 4
## Getting started

```bash
git clone https://github.com/hackages/hackjam.react-router-4
cd hackjam.react-router-4
yarn start
# Happy hacking ;)
```

## Todos
### RCMOD (Red Console Message Of Death) ☠️

The app should NOT work when you first start it.

You're going to run into a bunch of errors and whatnots, make sure that your app runs fine before going further.


### Routing oh sweet routing 🚗...

Implement the following routes

/:id => src/Components/BookDetail

/books => src/Components/Books

/dashboard => src/Components/Dashboard

/ => src/Components/Dashboard

You should only have one route rendered when you're on the / route, if not fix it!

At this point you should not have any errors in the console and a message about the protected route should displayed on the screen (you can skip this message for now).

### Using the Match and History objects
In the BookDetail page, you'll find a few comments asking you to fix things, use match and history from React router to solve them. 

### Fancy a NavLink? 👌

In your nav, you should add the 'activeLink' class to your links if the url matches their pathname

### RESTRICTED ACCESS ✋

Write a higher order route that'll protect your routes from un-authenticated users.

You'll find instructions for that one in src/hor/ProtectedRoute.js

### Those are not the search results you're looking for 🙈

On the dashboard page in the BookSearch component, have the search update the URL in order to be able to share your search results

When that component is loaded, verify whether the url contains a search query and fire a search if so.

> hint: use the withRouter Higher order component

### Going back 

On the detail page of a book, implement the back button

### Persistance is the key 🔑

Its annoying for users to re-login on page refresh (duh).

Persist the auth state in the localStorage.

## Bonus
### Code splitting
Keeping your bundle size as small as possible is really important.

This can be achieved using code splitting, for example, when the user is on the landing page, why would he need to load the library requried to display graphs on the details page?

By code splitting your app based on the routes used by the user you can make your app load really fast!

Using React-Loadable, code split your roads.


