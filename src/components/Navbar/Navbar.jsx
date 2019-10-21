import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

//css
import "./Navbar.scss";

//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar position="static">
        <Toolbar className="nav-toolbar">
          {authenticated ? (
            <>
              <Tooltip title="Create a post">
                <IconButton>
                  <AddIcon></AddIcon>
                </IconButton>
              </Tooltip>

              <Link to="/">
                <Tooltip title="Home">
                  <IconButton>
                    <HomeIcon></HomeIcon>
                  </IconButton>
                </Tooltip>
              </Link>

              <Tooltip title="Notifications">
                <IconButton>
                  <NotificationsIcon></NotificationsIcon>
                </IconButton>
              </Tooltip>
            </>

          ) : (
              <>
                <Button color="inherit" component={Link} to="/">
                  Home
            </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
            </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
            </Button>
              </>
            )
          }
        </Toolbar>
      </AppBar >
    );
  }
}

const mapStateToProps = ({ user: { authenticated } }) => {
  return { authenticated }
}

export default connect(mapStateToProps)(Navbar);
