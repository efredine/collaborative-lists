# collaborative-lists

Provides an easy way to share lists of movies, restaurants and other activities with friends and make decisions together.

Users create lists containing cards.  Current card types include: Movies, Yelp listings and todos.  Each list has a unique URL which can be shared (by whatever means the user chooses) with other users just by sharing the URL making it easy for a group of users to edit, sort and rate the cards in the list.  An activity channel displays all activity for the list and supports an ad-hoc group chat.

Front-end built using React, Redux, React DND (drag and drop) and animations in React while synchronizing changes across multiple users.

Turns out the 'one-way' data architecture imposed by Redux and React is an excellent fit for supporting multiple users!


## Tech Stack
- Node with Express and Socket.io for the server
- [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/redux) as the front-end
- [React DND](http://gaearon.gith2ub.io/react-dnd/) for drag and drop.
- React Router so lists are easily shared just by sharing a lists URL.
- Webpack as the front-end build tool.
- Bootstrap for CSS including the use of React-Bootstrap.
- Postsgre for data storage.  Knex for migrations and building SQL queries.
- Socket.io for websockets.

## Features
- MovieSearch Builder for finding movies and adding movie cards to a list
- YelpSearch Builder for searching Yelp and adding Yelp cards to a list
- Todo Builder for adding text-based todo list cards to a list
- Drag and drop to manually sort cards in a list
- An activity channel that shows all activity on a list and allows users viewing the list to send messages to each other.
- Users can add cards to the list, mark items as completed and sort the list using drag and drop
- Users can filter their view for all items, completed items or active items
- Adding, updating and sorting (with drag and drop) synchronized across multiple users in real-time with socket.io

## User Scenarios
- Best candidate use cases: situations where multiple users are likely to collaborate in real-time - what features do they need to collaborate?
- Some possible use cases: multi-person, recurring shopping lists; project to-do list; group decisions (where to go, what to eat, etc.)

### Grocery Lists
- Often worked on by multiple people - added to over time
- Addition of last minute items
- Sorting around how the store is organized
- Recurring items/suggestions
- Location dependent recurring items

### Co-operative decision making
- deciding on a movie, place to eat, bar to go to, activity to do with a group
- one user creates an initial list and shares it with a group of people
- people can add/cross things off the list and/or rate/like items in the list
- the built-in chat channel is useful for commenting on items in the list and having group discussions

### Yelp Search Results
- One user does a Yelp search and turns search results into a list which they share with other people
- Other users can rate the items in the list and/or sort the list
- Users have a mechanims to add new entries in the list

## Feature Ideas
- Auto-suggesting list items based on prior lists - for example, when I buy bananas I often also buy frozen berries (for smoothies)
- Populate lists with search results - like a yelp search, so users can collaborate on which restaurant they want to visit
- automatically render images/links -etc.
- group messaging in history/channel tab
- ability to like/rate items
- ability to edit list items
- infinite undo/redo
- list suggestions based on location where list is used/created (i.e. shopping lists are store dependent)
- animate list being sorted
- badges with update count on history/channel tab
