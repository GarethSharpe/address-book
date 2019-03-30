

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FirebaseAPI from "../../api/firebase";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/Build';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class AdminCreate extends Component {
  state = {
    open: false,
    invalidCreate: false,
    errorMessage: "",
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSave = async () => {
    const email = document.getElementById("email").value;
    await FirebaseAPI.setAdmin(email);
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <div >
          <Fab color="primary"
              size="small" 
              aria-label="Add" 
              className={classes.margin}
              onClick={this.handleClickOpen}>
            <BuildIcon />
          </Fab>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Administrator</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Administrator Email"
                fullWidth
                required
                className={classes.textField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
  }
}

AdminCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCreate);