import React, { Component } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
//MUI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import dayJs from 'dayjs';
import { Link } from 'react-router-dom';

import "./ItemDetails.scss";
import Image from "../../assets/images/farm.jpg";
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
    render() {
        dayjs.locale('ru');
        dayjs.extend(relativeTime);

        const { item: { key, text, userHandle, createdAt, userImage }, classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
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
                        <Typography variant="body2" color="textSecondary" component="p">
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions> */}
            </Card>
        )
    }
}

export default withStyles(styles)(ItemDetails);
