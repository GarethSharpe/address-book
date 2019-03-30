/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "./footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.center}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.kitchenergospelhall.com/"
                className={classes.block}
                target="_blank"
              >
                Kitchener Gospel Hall
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.kitchenergospelhall.com/about-us"
                className={classes.block}
                target="_blank"
              >
                About us
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.center}>
          made with{" "}
          <Favorite className={classes.icon} /> by Gareth Sharpe
          {/* <a
            href="https://www.linkedin.com/in/garethsharpe/"
            className={aClasses}
            target="_blank"
          >
            Gareth Sharpe
          </a>{" "} */}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
