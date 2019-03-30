import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
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

class MemberDelete extends Component {
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
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getMenuItems = (members) => {
    const menuItems = members.map((member) => <MenuItem value={member}>{member.member}</MenuItem>)
    return menuItems;
  }
  getTextFields = (classes) => {
    const textFields = [ ];
    if (!this.state.family.member) return textFields;
    return (
      <p> Delete {this.state.family.member} from the directory? </p>
    )
  }
  handleDelete = async () => {
    const result = await FirebaseAPI.deleteFamily(this.state.family.key);
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
             aria-label="Delete" 
             className={classes.margin}
             onClick={this.handleClickOpen}>
          <DeleteIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Delete Family</DialogTitle>
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
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MemberDelete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberDelete);
