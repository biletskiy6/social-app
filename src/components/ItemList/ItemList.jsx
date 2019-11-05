import React, { Component } from 'react'
import SocialAppContext from '../SocialAppContext/SocialAppContext';
import { connect } from 'react-redux';
import ItemDetails from '../ItemDetails';
import * as dataActions from '../../redux/actions/dataActions';

import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    progress: theme.progress
})

class ItemList extends Component {

    static contextType = SocialAppContext;

    componentDidMount() {
        const { getPosts } = this.context;
        getPosts()
            .then(items => {
                this.props.getPosts(items);
            })
            .catch(err => console.log(err));
    }

    showData = (items) => {
        return items.slice(0, 5).map(item => <ItemDetails key={item.postId} item={item} />)
    }

    render() {
        const { posts, classes } = this.props;
        let itemsMarkup = posts ? this.showData(posts) : <CircularProgress className={classes.progress} size={20} />
        return itemsMarkup;
    }
}

const mapStateToProps = ({ data: { posts, loading } }) => {
    return { posts, loading }
}

const mapDispatchToProps = { ...dataActions }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemList));
