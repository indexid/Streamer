import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// This is going to be called with a list of all those different values that we entered into our form.
// Anytime we make an async action creator we making use of redux thunk. Therefore, we need to dispatch an action.
// When we return a function in redux-thunk, in addition to a first argument "dispatch" we can also add a second argument- "getState". "getState" function allows us to reach into the redux store and pull out some piece of state.
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth; // "getState" is going to return the entire state object and the we accees the "auth" piece of state.
  const response = await streams.post("/streams", { ...formValues, userId }); // Here we want to combine the formValues and the userId together in a single object.

  dispatch({ type: CREATE_STREAM, payload: response.data }); //we get a lot of data from a request so we need access only the data that inside the response.
  history.push("/"); // push("") is how we navigate user.
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
