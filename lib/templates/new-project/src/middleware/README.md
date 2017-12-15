# Middleware
Middleware are sequential action handlers which are primarily used to handle
complex, chained actions that need to interact with an external system or
need to apply intensive logic.

When creating a middleware, you must specify a relative metric for ordering
purposes.  Middleware is executed in the order it is added to the store.

## Special Notes
### errorMiddleware
The `errorMiddleware` is added in front of all other middlewares to ensure
thrown exceptions are handled properly by the application.
