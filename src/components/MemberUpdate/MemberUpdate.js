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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class MemberUpdate extends Component {
  state = {
    open: false,
    invalidUpdate: false,
    errorMessage: "",
    family: { },
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ 
      open: false,
      family: { },
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getMenuItems = (members) => {
    const menuItems = members.map((member) => <MenuItem value={member}>{member.member}</MenuItem>)
    return menuItems;
  }
  getTextFields = (classes) => {;
    const textFields = [ ];
    if (!this.state.family.member) return textFields;
    return (
      <div>
      <TextField autoFocus defaultValue={this.state.family.member} margin="dense" id="member" 
      label="Name(s)" fullWidth required className={classes.textField} placeholder="Last, First & First" />
      <TextField defaultValue={this.state.family.family} margin="dense" id="family" label="Additional Family Members" 
      placeholder="First, Second" fullWidth className={classes.textField} />
      <TextField defaultValue={this.state.family.address} margin="dense" id="address" label="Address" placeholder="123 Fake Street"
        fullWidth className={classes.textField} />
      <TextField defaultValue={this.state.family.additional} margin="dense" id="additional" label="Additional Address Information"
        placeholder="City, Province Postal" fullWidth className={classes.textField} />
      <TextField defaultValue={this.state.family.email1} margin="dense" id="email1" label="First Email Address" fullWidth
        className={classes.textField} />
      <TextField defaultValue={this.state.family.email2} margin="dense" id="email2" label="Second Email Address"
        fullWidth className={classes.textField} />
      <TextField defaultValue={this.state.family.phone} margin="normal" id="phone" label="Home Phone Number" placeholder="xxx-xxx-xxxx"
        fullWidth className={classes.textField} />
      <TextField defaultValue={this.state.family.cell1} margin="normal" id="cell1" label="First Mobile Number" placeholder="xxx-xxx-xxxx"
        fullWidth className={classes.textField} />
      <TextField defaultValue={this.state.family.cell2} margin="normal" id="cell2" label="Second Mobile Number" placeholder="xxx-xxx-xxxx"
        fullWidth className={classes.textField} />
      </div>
    )
  }
  handleUpdate = async () => {
    const key = this.state.family.key;
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
    const { classes, disabled, members } = this.props;
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
          <DialogTitle id="form-dialog-title">Update Family</DialogTitle>
          <DialogContent>
            <FormControl required fullWidth className={classes.formControl}>
              <InputLabel htmlFor="family-required">Family</InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange}
                name="family"
                inputProps={{
                  id: 'family-required',
                }}
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.getMenuItems(members)}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            {this.getTextFields(classes)}
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

MemberUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberUpdate);
