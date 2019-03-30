import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import FirebaseAPI from "../../api/firebase";
import SnackBar from "../SnackBar/SnackBar";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class MemberSelfServe extends Component {
  state = {
    open: false,
    invalidUpdate: false,
    errorMessage: "",
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleUpdate = async () => {
    const key = this.props.member.key;
    const additional = document.getElementById("additional").value;
    const address = document.getElementById("address").value;
    const cell1 = document.getElementById("cell1").value;
    const cell2 = document.getElementById("cell2").value;
    const email1 = document.getElementById("email1").value;
    const email2 = document.getElementById("email2").value;
    const family = document.getElementById("family").value;
    const member = document.getElementById("member").value;
    const phone = document.getElementById("phone").value;
    const info = { 
      additional, address, cell1, cell2,
      email1, email2, family, member, phone 
    };
    const result = await FirebaseAPI.updateFamily(key, info);
    if (result.message) {
      this.setState({ 
        invalidUpdate: true,
        errorMessage: result.message,
      })
    }
    this.setState({ open: false });
  };
  render() {
    const { classes, disabled, member } = this.props;
    return (
      <div>
        <SnackBar message={this.state.errorMessage} open={this.state.invalidUpdate} />
        <Fab color="primary" 
             disabled={disabled}
             size="small" 
             aria-label="Edit" 
             className={classes.margin}
             onClick={this.handleClickOpen}>
          <EditIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Your Information</DialogTitle>
          <DialogContent>
            <TextField autoFocus defaultValue={member.member} margin="dense" id="member" 
            label="Name(s)" fullWidth required className={classes.textField} placeholder="Last, First & First" />
            <TextField defaultValue={member.family} margin="dense" id="family" label="Additional Family Members" 
            placeholder="First, Second" fullWidth className={classes.textField} />
            <TextField defaultValue={member.address} margin="dense" id="address" label="Address" placeholder="123 Fake Street"
              fullWidth className={classes.textField} />
            <TextField defaultValue={member.additional} margin="dense" id="additional" label="Additional Address Information"
              placeholder="City, Province Postal" fullWidth className={classes.textField} />
            <TextField defaultValue={member.email1} margin="dense" id="email1" label="First Email Address" fullWidth
              className={classes.textField} />
            <TextField defaultValue={member.email2} margin="dense" id="email2" label="Second Email Address"
              fullWidth className={classes.textField} />
            <TextField defaultValue={member.phone} margin="normal" id="phone" label="Home Phone Number" placeholder="xxx-xxx-xxxx"
              fullWidth className={classes.textField} />
            <TextField defaultValue={member.cell1} margin="normal" id="cell1" label="First Mobile Number" placeholder="xxx-xxx-xxxx"
              fullWidth className={classes.textField} />
            <TextField defaultValue={member.cell2} margin="normal" id="cell2" label="Second Mobile Number" placeholder="xxx-xxx-xxxx"
              fullWidth className={classes.textField} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MemberSelfServe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberSelfServe);
