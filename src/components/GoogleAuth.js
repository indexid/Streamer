import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    // All that inside componentDidMount is just to initialize the library.
    // In the function "load":
    // The first argument is a library that we want to load up in window scope.
    // The second argument is a callback function that will be load after the process of loading up will successfully complete into gapi.
    window.gapi.load("client:auth2", () => {
      // The function "client.init" executes an async operation request over Google's API server in order to initialize our client.
      // Inside the init we pass an object with clientId and scope which means what access we can get of user's profile.
      window.gapi.client
        .init({
          clientId:
            "220590046773-j1jk0i9qghs90e2rb57t1i5om7p02i1n.apps.googleusercontent.com",
          scope: "email",
        })
        // then needed because we get back a promise that has to be executed.
        .then(() => {
          // When we call init, this function returns a promise. After this library has been successfuly initialized, this arrow function is going to be invoked.
          // Getting a reference to that auth object and saving the reference to it on component class. It allows us to use all the methods that inside this GoogleAuth object.
          this.auth = window.gapi.auth2.getAuthInstance();
          // We call this.onAuthChange function to check at the initialization if the user is singed in or not.
          this.onAuthChange(this.auth.isSignedIn.get());
          // We call this google's method in order to "listen" when the status of login is going to change. For example when the user will click the authentication button.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // This is a callback function to "isSignedIn.listen" method. The argument "isSignedIn" is a boolean that we will get from "isSignedIn.listen"
  // And also it is going to run at initialization from componentDidMount.
  // The purpose is to change the signed status in our store. We get from google the status and passing the action to the reducers.
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // We want to pass this action signIn to the reducers with the ID of the user that is signed in. We need this in order to handle the streams depending on the user.
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // This onClick functions handles the click event when the user changes his authentication (Changing the status in Google).
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  // Helper method to help print out the appropriate text.
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

// In mapStateToProps we return an object with a property isSignedIn - that is going to have "state" then "auth" (a property name in combineReducer that have the reducer itself) and then "isSignedIn" (the property that inside inside of our state).
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
