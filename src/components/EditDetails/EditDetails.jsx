import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocialAppContext from '../SocialAppContext/SocialAppContext';
//MUI Stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as UserActions from '../../redux/actions/userActions';
//
import { Field, reduxForm } from 'redux-form';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');
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
    );

let EditDetailsForm = props => {
    const { handleSubmit, pristine, reset, submitting, invalid, loading, onClose } = props;
    return (
        <>
            <div className="user-container edit-details-form">
                <form className="user-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <Field name="bio" multiline rows={3} component={renderTextField} label="Bio" />
                    </div>
                    <div className="form-field">
                        <Field name="website" component={renderTextField} label="Website" />
                    </div>
                    <div className="form-field">
                        <Field name="location" component={renderTextField} label="Location" />
                    </div>

                    {/* {errors && <Typography align="center" color="error">{errors.general}</Typography>} */}
                    <div className="form-controls">
                        <Button type="submit" variant="contained" disabled={loading || invalid || pristine || submitting} color="primary">
                            {loading ? <CircularProgress size={20} /> : 'Submit'}
                        </Button>
                        <Button type="button" variant="contained" color="secondary" onClick={onClose}>Close</Button>
                    </div>

                </form>
            </div>
        </>
    )
}
EditDetailsForm = reduxForm({
    form: 'editDetailsFrom'
})(EditDetailsForm)

const styles = {
    editButton: {
        float: 'right'
    }
}

class EditDetails extends Component {

    state = {
        dialogOpen: false,
        snackbarOpen: true,
        loading: false,
    }

    static contextType = SocialAppContext;

    handleSnackbarOpen = () => {
        this.setState({ snackbarOpen: true })
    }

    handleOpen = () => {
        this.setState({ dialogOpen: true })
    }

    handleClose = () => {
        this.setState({ dialogOpen: false })
    }

    onSubmit = (values) => {
        const { updateUserData } = this.context;
        this.setState({ loading: true })
        updateUserData(values).then((res) => {
            this.setState({ loading: false });
            this.handleClose();

            this.props.loadingUser();
            this.context.getUserData().then((res) => {
                this.props.getAuthenticatedUserData(res);
            })

        }).catch((err) => console.log(err));
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Tooltip title="Edit details" placement="top" className={classes.editButton}>
                    <IconButton onClick={this.handleOpen} className={classes.button}><EditIcon color="primary"></EditIcon></IconButton>
                </Tooltip>
                <Dialog open={this.state.dialogOpen} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <EditDetailsForm loading={this.state.loading} onSubmit={this.onSubmit} onClose={this.handleClose} />
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = ({ user: { credentials } }) => {
    return { credentials }
}

const mapDefaultProps = ({ user: { credentials } }) => {
    const { bio, website, location } = credentials;
    return {
        initialValues: {
            bio,
            website,
            location
        }
    }
}

EditDetailsForm = connect(
    mapDefaultProps
)(EditDetailsForm)
const mapDispatchToProps = { ...UserActions }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDetails)); 
