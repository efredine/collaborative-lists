# collaborative-lists

Lists that multiple users can sort and edit in real-time.  List updates are instantaly propagated to all users.

## Tech Stack
- Architecturally similar to Chatty app.  Uses the simple React boiler-plate for the front-end and node in the back end.
- Using Socket.io rather than WS.
- Useing Redux and React DND (for drag and drop).
- Anticipate using Postgres or Mongo for data storage, continue to use Node for the server

## Prototype features
- a single global list stored in memory on the server
- one tab shows the list and another tab shows the history of changes to the list
- users can add to the list, mark items as completed and sort the list using drag and drop
- users can filter their view for all items, completed items or active items
- adding, updating and sorting (with drag and drop) synchronized across multiple users in real-time with socket.io

## Vision/Possible Features
- use cases: multi-person, recurring shopping list, project to-do list, group decisions (where to go, what to eat, etc.)
- multiple lists - each list with it's own 'short URL' so it can be easily shared
- use React Router to navigate between different list URLS
- keep track of different users (sessions, registration and signin)
- auto-suggesting list items based on prior lists - for example, when I buy bananas I often also buy frozen berries
- populate lists with search results - like a yelp search, so users can collaborate on which restaurant they want to visit
- automatically render images/links -etc.
