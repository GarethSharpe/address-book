import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

class SnackBar extends Component {

  render() {
    const { classes, message, open } = this.props;
    return (
      <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={this.handleClose}
      onExited={this.handleExited}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
    />
    );
  }
}

export default withStyles(styles)(SnackBar);
