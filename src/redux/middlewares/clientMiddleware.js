import { Promise as BlueBirdPromise } from 'bluebird';

BlueBirdPromise.config({
  // Enable warnings
  warnings: true,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true,
  // Enable async hooks
  asyncHooks: true,
});

const promiseMap = {};
export default function clientMiddleware() {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, actions, ...rest } = action; // eslint-disable-line no-redeclare

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = actions;
    next({ ...rest, ...REQUEST });

    if (promiseMap[REQUEST.type]) {
      promiseMap[REQUEST.type].cancel();
      delete promiseMap[REQUEST.type];
    }
    const bluebirdWrapped = BlueBirdPromise
      .resolve(promise);

    bluebirdWrapped.then(
      (result) => next({ ...rest, result, ...SUCCESS }),
      (error) => next({ ...rest, error, ...FAILURE }),
    ).catch((error) => next({ ...rest, error, ...FAILURE }));

    if (!REQUEST.doNotIgnorePriorAction) {
      promiseMap[REQUEST.type] = bluebirdWrapped;
    }

    return bluebirdWrapped;
  };
}
