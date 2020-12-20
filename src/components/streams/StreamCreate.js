import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    // here we don't need to call event.preventDefault() as usual because the handleSubmit method is going automatically do it for us.
    // formValues is an argument with all the values that existe inside of our fields.
    this.props.createStream(formValues); // here we are calling action creator.
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
