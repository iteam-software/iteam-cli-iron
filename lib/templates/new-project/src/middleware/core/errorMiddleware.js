/**
 * Create an error handling middleware.
 * @param {function} handler Callback that the error middleware will execute
 * on error. It will pass the error caught, the action, and the store in that
 * order to the handler.
 */
export function errorMiddlewareFactory(handler = () => {}) {
  return store => next => action => {
    try {
      return next(action);
    } catch (error) {
      // Error handling extension point
      handler(error, action, store);
      return next({
        type: '__IronApp__/Error',
        data: {
          code: 1,
          message: error.toString(),
          instance: error,
        },
      });
    }
  }
}