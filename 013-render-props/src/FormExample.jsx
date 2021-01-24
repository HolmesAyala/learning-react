import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const INITIAL_FORM_VALUES = {
  name: '',
  email: ''
}

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required()
});


function Formulary() {
  const [error, setError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('send');
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 1000);
      });

      throw new Error('Error in server');
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  }

  const renderFields = ({ isSubmitting }) => {
    const nameTextFieldComponent = (
      <Field name='name'>
        {({ field, meta }) => (
          <div className='form-group'>
            <label htmlFor="TF_Name">Name</label>

            <input id='TF_Name' type="text" {...field} />

            {meta.touched && meta.error && <p>{meta.error}</p>}
          </div>
        )}
      </Field>
    );

    const emailTextFieldComponent = (
      <Field name='email'>
        {({ field, meta }) => (
          <div className='form-group'>
            <label htmlFor="TF_Email">Email</label>

            <input id='TF_Email' type="text" {...field} />

            {meta.touched && meta.error && <p>{meta.error}</p>}
          </div>
        )}
      </Field>
    );

    const submitButton = (
      <button type='submit' disabled={isSubmitting}>Send</button>
    );

    return (
      <Form>
        {nameTextFieldComponent}

        {emailTextFieldComponent}

        {submitButton}
      </Form>
    );
  }

  const errorMessageComponent = (
    <p><strong>Error:</strong> {error && error.message}</p>
  );

  const formikComponent = (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
      render={renderFields}
    />
  );

  return (
    <div>
      <h3>Basic information</h3>

      {error && errorMessageComponent}

      {formikComponent}
    </div>
  );
}

const AjaxForm = (props) => {
  const [error, setError] = useState(null);

  const sendRequest = async (values, { setSubmitting }) => {
    const { url, method, onSuccess } = props;

    try {
      const formData = new FormData();
      
      for (let field of Object.keys(values)) {
        formData.append(field, values[field]);
      }

      const response = await fetch(url, {
        method,
        body: formData
      });

      const responseBody = await response.json();

      onSuccess(responseBody);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }

  }

  return props.render({ error, sendRequest });
}

AjaxForm.propTypes = {
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  render: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
}

AjaxForm.defaultProps = {
  method: 'POST'
}

const RenderPropsExample = () => {

  const renderFields = ({ isSubmitting }) => {
    const nameTextFieldComponent = (
      <Field name='name'>
        {({ field, meta }) => (
          <div className='form-group'>
            <label htmlFor="TF_Name">Name</label>

            <input id='TF_Name' type="text" {...field} />

            {meta.touched && meta.error && <p>{meta.error}</p>}
          </div>
        )}
      </Field>
    );

    const emailTextFieldComponent = (
      <Field name='email'>
        {({ field, meta }) => (
          <div className='form-group'>
            <label htmlFor="TF_Email">Email</label>

            <input id='TF_Email' type="text" {...field} />

            {meta.touched && meta.error && <p>{meta.error}</p>}
          </div>
        )}
      </Field>
    );

    const submitButton = (
      <button type='submit' disabled={isSubmitting}>Send</button>
    );

    return (
      <Form>
        {nameTextFieldComponent}

        {emailTextFieldComponent}

        {submitButton}
      </Form>
    );
  }

  const renderForm = ({ error, sendRequest }) => {
    const errorComponent = <p><strong>Error:</strong> {error && error.message}</p>;

    return (
      <div>
        <h3>Basic information (Render props)</h3>

        {error && errorComponent}

        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={sendRequest}
          render={renderFields}
        />
      </div>
    );
  }

  return (
    <AjaxForm
      url='example'
      onSuccess={() => console.log('success')}
      render={renderForm}
    />
  );
}

const FormExample = () => {
  return (
    <div>
      <h1>Render props with forms</h1>

      <Formulary />

      <RenderPropsExample />
    </div>
  );
}

export default FormExample;
