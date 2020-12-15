import _ from "lodash";
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    // In all first three cases we are getting back a single record from our API, we take this record and add it into our state object.
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload); // We don't need to specify the id after "action.payload" because our action creator return an action with "id" (return action.payload.id in action creator).
    case FETCH_STREAMS:
      // We take an array of streams from our API and merge them all into out state object in one go.
      // "mapKeys" is going to take an array and convert it to a big object where the "id" key that taken from an single object of an array is going to be a key property of an "action.payload" object. Then we add "..." at the begining of "mapKeys" to add this big object to the new state object that we made with "...state".
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
