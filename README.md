# collaborative-lists

Lists that multiple users can sort and edit in real-time.  List updates are instantaly propagated to all users.

Prototype built to understand how to use React, Redux, React DND (drag and drop) and animations in React while synchronizing changes across multiple users.

Turns out the 'one-way' data architecture imposed by Redux and React is an excellent fit for supporting multiple users!

## Tech Stack
- Architecturally similar to Chatty app.  Uses the simple React boiler-plate for the front-end and node in the back end.
- Using Socket.io rather than WS.
- [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/redux)
- [React DND](http://gaearon.gith2ub.io/react-dnd/) for drag and drop.
- [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) to animate additions and deletions from the list
- Anticipate using Postgres or Mongodb for data storage
- Node with Express and Socket.io for the server

## Prototype features
- a single global list stored in memory on the server
- one tab shows the list and another tab shows the history of changes to the list
- users can add to the list, mark items as completed and sort the list using drag and drop
- users can filter their view for all items, completed items or active items
- adding, updating and sorting (with drag and drop) synchronized across multiple users in real-time with socket.io
- animates items being added to list

## Making it multi-user and multi-list
- proper data model with persistant storage
- keep track of different users (sessions, registration and signin)
- multiple lists - each list with it's own 'short URL' so it can be easily shared
- use React Router to navigate between different list URLS + api for retrieving list specific data
- socket updates using rooms or something similar to broadcast list specific updates

## Vision/Possible Features
- use cases: multi-person, recurring shopping list, project to-do list, group decisions (where to go, what to eat, etc.)
- auto-suggesting list items based on prior lists - for example, when I buy bananas I often also buy frozen berries (for smoothies)
- populate lists with search results - like a yelp search, so users can collaborate on which restaurant they want to visit
- automatically render images/links -etc.
- group messaging in history/channel tab
- ability to like/rate items
- ability to edit list items
- infinite undo/redo
- list suggestions based on location where list is used/created (i.e. shopping lists are store dependent)
- animate list being sorted
- badges with update count on history/channel tab