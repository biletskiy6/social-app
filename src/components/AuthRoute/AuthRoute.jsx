import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const AuthRoute = ({ component: Component, authenticated: { authenticated }, ...rest }) => {
    console.log(authenticated);
    return (<Route {...rest}
        render={(props) => authenticated === true ? <Redirect to="/" /> : <Component {...props} />}
    />)
}

const mapStateToProps = ({ user: authenticated }) => {
    return { authenticated }
}

export default connect(mapStateToProps)(AuthRoute);

