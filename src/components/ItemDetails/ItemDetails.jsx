import React, { Component } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime';
import DeletePost from '../DeletePost';
import SocialAppContext from '../SocialAppContext/SocialAppContext';
//MUI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';
import * as dataActions from '../../redux/actions/dataActions';
import { Link } from 'react-router-dom';
import "./ItemDetails.scss";
import dayjs from 'dayjs';


const styles = {
    card: {
        marginBottom: 20
    },
    cardActionArea: {
        display: 'flex'
    },
    cardContent: {
        width: 100 + '%',
    },
    cardMedia: {
        objectFit: 'cover',
        maxWidth: 170,
        minWidth: 170
    }
}

class ItemDetails extends Component {

    static contextType = SocialAppContext;


    isLikedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.item.postId))
            return true;
        return false;
    }

    likePost = () => {
        const { likePost } = this.context;
        const { postId } = this.props.item;
        likePost(postId).then((res) => {
            this.props.likePostAction(res);

        });
    }

    unlikePost = () => {
        const { unlikePost } = this.context;
        const { postId } = this.props.item;
        unlikePost(postId).then((res) => {
            this.props.unlikePostAction(res);
        });
    }

    render() {
        dayjs.extend(relativeTime);
        const { item: { key, text, userHandle, createdAt, userImage, likeCount, commentCount }, classes, user } = this.props;
        const currentUserHandle = user.credentials.handle;

        let deleteButton = userHandle === currentUserHandle ? <DeletePost postId={this.props.postId} /> : null;


        let likeButton = !user.authenticated ? <Tooltip title="Like" placement="top" component={Link} to="/login" >
            <IconButton className="button">
                <FavoriteBorder color="primary" />
            </IconButton>
        </Tooltip> : this.isLikedPost() ? (

            <Tooltip title="Undo like" placement="top">
                <IconButton onClick={this.unlikePost} className="button">
                    <FavoriteIcon color="primary" />
                </IconButton>
            </Tooltip>

        ) : (
                    <Tooltip title="Like post" placement="top">
                        <IconButton onClick={this.likePost} className="button">
                            <FavoriteBorder color="primary" />
                        </IconButton>
                    </Tooltip>
                )

        return (
            <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea} component="div">
                    <CardMedia
                        component="img"
                        alt="Profile image"
                        height="160"
                        image={userImage}
                        className={classes.cardMedia}
                        title="Profile image"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography color="primary" gutterBottom variant="h5" to={`/user/${userHandle}`} component={Link}>
                            {userHandle}
                        </Typography>
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {text}
                        </Typography>
                        <span className="align-counters align-counters--likes">
                            {likeButton}
                            {likeCount} Likes
                       </span>
                        <span className="align-counters align-counters--comments">
                            <Tooltip title="Comments" placement="top">
                                <IconButton className="button">
                                    <ChatIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                            {commentCount} Comments
                        </span>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

const mapStateToProps = ({ user: user }) => {
    return { user }
}

const mapDispatchToProps = { ...dataActions }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemDetails));
