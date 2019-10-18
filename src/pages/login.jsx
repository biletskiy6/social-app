import React from 'react'
import { Field, reduxForm } from 'redux-form'
import AppLogo from '../assets/images/twitter.svg';

import { Link } from 'react-router-dom';
import SocialAppContext from '../components/SocialAppContext/SocialAppContext';
import axios from 'axios';
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


let LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, invalid, loading, errors, classes } = props;
  return (
    <>
      <div className="user-container">
        <div className="logo">
          <img className="logo" src={AppLogo} />
        </div>
        <Typography align="center" variant="h3">Login</Typography>
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
              validate={required}
            />
          </div>
          {errors && <Typography align="center" color="error">{errors.general}</Typography>}
          <div className="form-controls">
            <Button type="submit" variant="contained" disabled={loading || invalid || pristine || submitting} color="primary">
              {loading ? <CircularProgress size={20} /> : 'Login'}
            </Button>
            <Button type="button" variant="contained" disabled={pristine || submitting} color="secondary" onClick={reset}>Reset</Button>
          </div>
          <Typography variant="caption"><small>Don't have an account? Sign up <Link to="/signup">here</Link></small></Typography>
        </form>
      </div>
    </>
  )
}
LoginForm = reduxForm({
  form: 'login'
})(LoginForm)

class LoginPage extends React.Component {

  static contextType = SocialAppContext;
  submit = values => {
    const { userLogin, getUserData } = this.context;
    const { loadingUI, setErrors, stopLoadingUI, clearErrors, getAuthenticatedUserData } = this.props;
    loadingUI();
    userLogin(values)
      .then((res) => {
        stopLoadingUI();

        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;

        getUserData().then(res => {
          getAuthenticatedUserData(res);
        })
        clearErrors();
        this.props.history.push('/');
      })
      .catch((err) => {
        setErrors(err);
        stopLoadingUI();
      });
  }
  render() {
    console.log(this.props)
    const { loading, errors } = this.props;
    return <LoginForm loading={loading} errors={errors} onSubmit={this.submit} />
  }
}
const mapStateToProps = ({ UI: { loading, errors } }) => {
  return { loading, errors }
}
const mapDispatchToProps = { ...UIActions, ...UserActions }
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);