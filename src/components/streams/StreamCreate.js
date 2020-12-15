import React from "react";
// reduxForm is function that is going to have exact the same functionality as a connect function from react-redux library.
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  // Function that checks if the user touched the form and there is an error message (inside a meta argument that we distructured).
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // renderInput (get props from the "Field" component) insted of naming this argument as a 'formProps' and then return <input {...formProps.input} />, we can use distructure syntax to make this even shorter.
  // We get some methods that are built inside props that we are passing to this function from "Field" component.
  // renderInput is a helper method.
  // The "meta" property (that is an object) that distructured from "formValues" contains the error property with the "error" message and some more properties like "touched" that is boolean that return true or false if the input field was touched.
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    // This is going to take the formProps the input property (object) take all key value pairs and add them as properties to the input element.
    // Essentially take that entire input object, take all the properties out there and add them as a props to the input element.
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );

    // This is long syntax: <input onChange={formProps.input.onChange} value={formProps.input.value} />
    // This is shorter syntax: <input {...formProps.input} /> --Here we got the input object with all the properties that inside there and them as props to the input element.
    // And there is the shortest syntax: <input {...input} /> --But we need to distructure the input object from the formProps, and then just pass {...input} as props to the input element. --Like the code above--
  };

  onSubmit = (formValues) => {
    // here we don't need to call event.preventDefault() as usual because the handleSubmit method is going automatically do it for us.
    // formValues is an argument with all the values that existe inside of our fields.
    this.props.createStream(formValues); // here we are calling action creator
  };

  render() {
    return (
      <form
        className="ui form error"
        // 1. "onSubmit" - this is a prop that has a function that passed into the form and we call it any time the form submitted.
        // 2. "this.props.handleSubmit" - this is a (callback) method that is provided to our component by redux-form.
        // 3. "this.onSubmit" - this is a callback function (that we defined inside of our component) to the handleSubmit method.
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/* Field is some type of input: text input, checkbox, radio button, dropdown.
        The required props are: 
        1. name prop - the name of the proporty it's going to manage.
        2. component - either a react component or a function for the field to call.
        This component or a function needs to return some element that is going actually be shown on the screen*/}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        {/* After a submit button (event/ action) we want to navigate to another component. But we can't use "Link" tag because this tag is used inside a component to navigate to another component (browserRouter passes a prop to the component with the history object). In our case it's not component but an action creator! */}
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// The function checks if a user fills all required fields.
// Return an object. For each invalid field, put a key-value pair on the object with the NAME of the field and the error message.
// If we return an object from that velidate function, the redux form is going automatically rerender our component.
// If a field has a same name as a property that exist inside the object then redux-form is going to take that message and pass it to "renderInput" function for the each field that gets created.
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// If after validate function the error object has a property name that is identical to the name of the 'Field'
// (for example title) and it contains a string, that error message will be passed down to the renderInput function (with 'component' property name).

// reduxForm like connect function wraps the component with the one object that have some configuration.
// We need to write form and string with the purpose of this form.
// validate is function that cheks for valid input. We need to wire up this function with redux form. Therefore redux-form will know about errors. This is short syntax of validate: validate;
// We want also wrap with connect function in addition to reduxForm wrapping. Therefore we need to make some code changes like below.
const formWrapped = reduxForm({ form: "streamCreate", validate })(StreamCreate);

export default connect(null, { createStream })(formWrapped);
