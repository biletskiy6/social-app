import React from 'react'
import { Field, reduxForm } from 'redux-form'
import AppLogo from '../assets/images/twitter.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SocialAppContext from '../components/SocialAppContext/SocialAppContext';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
//Redux Stuff
import * as  UIActions from '../redux/actions/uiActions';
import * as UserActions from '../redux/actions/userActions';
import { connect } from 'react-redux';



const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const matchPassword = (value, allValues) => value !== allValues.password ? 'This field must match with your password field' : undefined;
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
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
      fullWidth
      {...input}
      {...custom}
    />
  )


let SignupForm = props => {
  const { handleSubmit, pristine, reset, submitting, errors, invalid, loading, classes } = props
  return (
    <>
      <div className="user-container">
        <div className="logo">
          <img className="logo" src={AppLogo} />
        </div>
        <Typography align="center" variant="h3">Signup</Typography>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <Field name="email" component={renderTextField} label="Email" validate={[required, email]} />
          </div>
          <div className="form-field">
            <Field
              name="password"
              component={renderTextField}
              label="password"
              type="password"
              validate={[required, minLength(6)]}
            />
          </div>
          <div className="form-field">
            <Field
              name="confirmPassword"
              component={renderTextField}
              label="Confirm password"
              type="Password"
              validate={[required, matchPassword, minLength(6)]}
            />
          </div>
          <div className="form-field">
            <Field
              name="handle"
              component={renderTextField}
              label="Username"
              validate={required}
            />
          </div>
          {errors && <Typography align="center" color="error">{errors.email}</Typography>}
          <div className="form-controls">
            <Button type="submit" variant="contained" disabled={loading || invalid || pristine || submitting} color="primary">
              {loading ? <CircularProgress size={20} /> : 'Signup'}
            </Button>
            <Button type="button" variant="contained" disabled={pristine || submitting} color="secondary" onClick={reset}>Reset</Button>
          </div>
          <Typography variant="caption"><small>Already have an account? Login <Link to="/login">here</Link></small></Typography>
        </form>
      </div>
    </>
  )
}
SignupForm = reduxForm({
  // a unique name for the form
  form: 'signup'
})(SignupForm)

class SignupPage extends React.Component {

  static contextType = SocialAppContext;
  submit = values => {
    const { userSignup } = this.context;
    const { loadingUI, setErrors, stopLoadingUI, clearErrors, getAuthenticatedUserData } = this.props;
    loadingUI();
    // this.setState({ loading: true });
    userSignup(values)
      .then((res) => {
        stopLoadingUI();
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        // this.setState({ loading: false });
        clearErrors();
        this.props.history.push('/');
      })
      .catch((err) => {
        setErrors(err);
        stopLoadingUI();
      });
  }
  render() {
    const { loading, errors } = this.props;

    return <SignupForm loading={loading} errors={errors} onSubmit={this.submit} />
  }
}

const mapStateToProps = ({ UI: { loading, errors } }) => {
  return { loading, errors }
}
const mapDispatchToProps = { ...UIActions, ...UserActions }

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);