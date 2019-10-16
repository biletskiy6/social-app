import React, { Component } from 'react'
//MUI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

import "./ItemDetails.scss";
import Image from "../../assets/images/farm.jpg";


class ItemDetails extends Component {
    render() {
        const { item: { title, body } } = this.props;
        return (
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={title}
                        height="140"
                        image={Image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" to={`/user/(userHandle)`} component={Link}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Created At: ...
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default ItemDetails;
