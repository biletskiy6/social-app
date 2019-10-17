import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'


const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors;
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )


const login = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div>
      <div>
        <Field
          name="password"
          component={renderTextField}
          label="password"
          type="password"
        />
      </div>
      <Button type="submit" variant="contained" color="primary">Submit</Button>
      <Button type="submit" variant="contained" color="secondary">Reset</Button>
    </form>
  )
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate
})(login)