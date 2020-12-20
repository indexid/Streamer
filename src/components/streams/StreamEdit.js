import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  // All the "props" we pass down to StreamEdit comes from 'react-router-dom' because StreamEdit component inside of our App.js file is rendered by Route component. That gives props to the StreamEdit.
  // But after we add mapStateToProps we get more props- we get also a stream property. This is because of the "connect" function.

  // We need here componentDidMount to fetch the specific stream because if the user enter directly to the url with the id of his stream that he want to edit without fetching the stream he won't see his stream.
  // But if we try to edit through the "StreamList" we will succeed to pass to the current url with this id, and that because we fetched all the stream list from componentDidMount that is declared inside "StreamList" component.
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // This function is going to be our callback for StreamForm.
  // Here we need to call our function creator "editStream" and pass this action creator an "id" as a first argument and "formValues" as a second argument.
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // If we do a console.log to our props we will see to console logs. The first one is from render and it's undefined. The second one is after componentDidMount so we fetch the stream, get results and then the component rerenders and we see the second console with the stream info.
    // We need to add if statement because in the first time the component renders it doesn't have any stream data (it's undefined), so we show "Loading...". But the second time the component fetch data from componentDidMount and the component rerenders and we have sream data.
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* We don't pass props directly to StreamForm component directly, we essantialy pass the props to redux-form. Redux form then passes those props into our component StreamForm.
        There are some very special props that we can pass down into redux-form wrapped StreamForm.
        One of special prop is "initialValues". This prop provides some initial values to show inside of text inputs inside of StreamForm component. */}
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")} // The title and description of our stream object will be used as initial values for the form. But the stream object containes also an "id" and "userId" and we don't want to pass them as initial values that have to be changed. We only want to pass the values that can be changed: 'title' and 'description'. We use lodash here to pick only the properties we need and it is creating a new object!
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// We want to access a stream list from redux state object.
// The second argument is "ownProps" this is a reference to our props that are inside of our component. We need to access this props in order to get the "id" of a stream (props.match.params.id).
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
