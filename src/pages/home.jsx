import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import SocialAppContext from '../components/SocialAppContext/SocialAppContext';
import ItemDetails from "../components/ItemDetails";


class home extends Component {

  state = {
    items: null
  }

  static contextType = SocialAppContext;

  componentDidMount() {
    const { getPosts } = this.context;
    getPosts()
      .then(items => this.setState({ items }))
      .catch(err => console.log(err));
  }

  showData = (items) => {
    return items.slice(0, 5).map(item => <ItemDetails item={item} />)
  }

  render() {
    const { items } = this.state;
    let itemsMarkup = items ? this.showData(items) : "Loading...";
    return (
      <div className="home">
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            {itemsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <h2>Profile</h2>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default home;
