import { combineReducers } from "redux";
// We essantialy importing a reducer but we are changing it's name in order to be more descriptive with the reducer name.
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});

// form: formReducer is a built in form reducer from the library of redux-form.
