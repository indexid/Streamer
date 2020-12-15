// We are trying to do the navigation from action creator and not from a component. It causes problems because of history object that is created by the browserRouter and not by us. So we can't just navigate from action creator like from component. We need to change our history object and our router to make navigation possible from action creator.
// It's hard to access history object that was created by browserRouter not from component (like our case- from action creator).
// One of the solutions is to pass the he history object from the browserRouter to the component and then pass this history object from the component to an action creator. But this is not good solution because it means that every single time we want to do a programmatic navigation we have to write out action creators to be called with a history object and we would make sure that all of our components called the action creator with the history object as well.
// Our solution is going to be by creating history object by ourself and it easy to pass this history object anywhere because we are maintainig this object, and we are not allowing the browserRouter to create this history object itself.

import { createBrowserHistory } from "history";

export default createBrowserHistory();

// This is old version of importing that causes a warning in console:
// import createHistory from "history/createBrowserHistory";
// export default createHistory();
