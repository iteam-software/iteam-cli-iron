# Routes
## Design
The route.json file is maintained by the Iron cli. It is modified when you
ask for a new route and then saved. In Iron applications, the entire routing
tree is flattened and paths are matched exactly. We strongly discourage any
attempt to nest routes in an Iron app. Once the `*.jsx` file is created, you
may modify the render method to suite your layout and container needs.