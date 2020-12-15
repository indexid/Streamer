import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
  // All the "props" we pass down to StreamEdit comes from 'react-router-dom' because StreamEdit component inside of our App.js file is rendered by Route component. That gives props to the StreamEdit.
  // But after we add mapStateToProps we get more props- we get also a stream property. This is because of the "connect" function.

  // We need here componentDidMount to fetch the specific stream because if the user enter directly to the url with the id of his stream that he want to edit without fetching the stream he won't see his stream.
  // But if we try to edit through the "StreamList" we will succeed to pass to the current url with this id, and that because we fetched all the stream list from componentDidMount that is declared inside "StreamList" component.
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    // If we do a console.log to our props we will see to console logs. The first one is from render and it's undefined. The second one is after componentDidMount so we fetch the stream, get results and then the component rerenders and we see the second console with the stream info.
    // We need to add if statement because in the first time the component renders it doesn't have any stream data (it's undefined), so we show "Loading...". But the second time the component fetch data from componentDidMount and the component rerenders and we have sream data.
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return <div>{this.props.stream.title}</div>;
  }
}

// We want to access a stream list from redux state object.
// The second argument is "ownProps" this is a reference to our props that are inside of our component. We need to access this props in order to get the "id" of a stream (props.match.params.id).
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
