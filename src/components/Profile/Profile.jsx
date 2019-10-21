import React, { Component } from 'react'
import SocialAppContext from '../SocialAppContext/SocialAppContext';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//MUI Stuff
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import * as UserActions from '../../redux/actions/userActions';
import ImageLoader from 'react-load-image';
import EditDetails from '../EditDetails';



const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00A152'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
}

class Profile extends Component {

    static contextType = SocialAppContext;

    componentDidMount() {
        console.log(123);
        const { getUserData } = this.context;
        const { getAuthenticatedUserData, loadingUser } = this.props;
        const token = localStorage.getItem("FBIdToken");
        if (token) {
            loadingUser();
            getUserData()
                .then(res => { getAuthenticatedUserData(res) })
                .catch(err => console.log(err))
        }
    }

    uploadImage = (data) => {
        const { uploadImage, getUserData } = this.context;
        const { loadingUser, getAuthenticatedUserData } = this.props;
        loadingUser();
        uploadImage(data)
            .then((res) => {
                getUserData()
                    .then(res => {
                        getAuthenticatedUserData(res);
                    })
                    .catch(err => console.log(err))
            })
    }

    handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.loadingUser();
        this.uploadImage(formData)

    }

    handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    }

    handleLogout = () => {
        this.props.setUnauthenticated();
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        {/* <img src={imageUrl} alt="Profile" className="profile-image" /> */}
                        {
                            imageUrl && (<ImageLoader
                                src={imageUrl}
                            >
                                <img className="profile-image" />
                                <div>Error!</div>
                                <CircularProgress />
                            </ImageLoader>)
                        }
                        <input type="file" hidden="hidden" id="imageInput" onChange={() => this.handleImageChange} />
                        <Tooltip title="Edit profile image" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink color="primary" variant="h5" component={Link} to={`/users/${handle}`}>@{handle}</MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr />
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                                <hr />
                            </>
                        )}
                        <CalendarToday color="primary" /> {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary"></KeyboardReturn>
                        </IconButton>
                    </Tooltip>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">No profile found, please login</Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                    </div>
                </Paper>
            )) : (<p>Loading..</p>)

        return profileMarkup;
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = { ...UserActions }

Promise.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
