import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Profile from "../components/Profile/Profile";
import ItemList from '../components/ItemList';


class home extends Component {
  render() {
    return (
      <div className="home">
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <ItemList />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default home;
