import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  // We need to fetch this stream with specific id in order to show on Modal component the title of the stream we want to delete, and also to make sure that after refreshing the page with modal, we still showing and handling appropriate stream id.
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // In fanctional component we just make a variable with JSX and then pass it to return.
  // In class based component we need to make a helper method.
  // If we want to pass buttons also as a props to the Modal component (because if we want to reuse the Modal component, maybe other components don't need this buttons), we need to make a new variable that will contain some JSX.
  // In the end, we want to change the button to Link tag in order to navigate the user to an appropriate link/ page.
  renderActions() {
    const { id } = this.props.match.params; // Here we are distructurin the id from this object.
    return (
      <Fragment>
        {/* In order to delete this stream correctly we need to pass the id to an action creator. We can do it only with arrow function. If we will pass- this.props.deleteStream that means we passing only the reference to the function. If we will add the parentheses with the id- this.props.deleteStream(id) this will call this function instantly!  */}
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );
  }

  // When this component first renders we may not have the stream details from the state. And before we will fetch the stream through componentDidMount we need to show the user just global message inside modal and after fetching the content of the stream we will update the model content with specific content of this stream we want to delete.
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete this stream with the title: "${this.props.stream.title}"?`;
  }

  render() {
    return (
      // We want to reuse the Modal stream, so we need to pass props from parent component and not hard code in the Modal comoponent.
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()} // When the component was a function component we did a variable with actions that included JSX and we passed it actions={actions}. Now it's class based component so we call a helper method with this actions.
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
