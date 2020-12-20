import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  // This function (ReactDOM.createPortal) is going to take 2 arguments: 1. JSX  2. A reference to a HTML element that we want to render this portal into.
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss} // This comment was before we diceded to pass onClick as a props. Now we decide to move this onClick from parent component to Modal as props, to make this component reusable. This onClick event hendler allows us to click outside the modal and move us to the page (url that we want). This event allows us better ui experience if the user don't want do anything and just exit this window. But the problem here that if the user clicks on model, for example near the delete button, he will still exit this modal and move to the path we defined. This called event propagation- that means if we ever trigger an event on some child elements and that child element does't handle that event. The event essentially is going to bubble up to some parent element until it gets caught with event handler. In this case if we click inside of any elements that inside our root div that event is going bubble up to the root dive (because we still don't have event handler inside our root div).
      className="ui dimmer modals visible active"
    >
      {/* In order to avoid this event propagation we need to add event handler to this div. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.getElementById("modal") // We added to index.html file that inside public folder, another div with id of "modal". So now any time we render our modal component on the screen, rather then showing as direct child of the parent component, it will be rendered into the div with the id of modal.
  );
};

export default Modal;
