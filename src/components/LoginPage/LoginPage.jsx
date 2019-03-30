import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Footer from "../Footer/Footer.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import Button from "../CustomButtons/Button.jsx";
import Card from "../Card/Card.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardFooter from "../Card/CardFooter.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";

import FirebaseAPI from "../../api/firebase";

import loginPageStyle from "./loginPageStyle.jsx";
import image from "../../assets/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      isRegistrationOpen: false,
    };
  }
  componentDidMount = async () => {
    const registrationOpen = await FirebaseAPI.isRegistrationOpen();
    this.setState({ isRegistrationOpen: registrationOpen });
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  getRegisterButton = (register) => {
    if (this.state.isRegistrationOpen) {
      return (
      <Button simple color="warning" size="lg" onClick={register}>
        Register
      </Button>)
    }
  }
  render() {
    const { classes, login, register } = this.props;
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={24} sm={24} md={8}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h1>Login</h1>
                    </CardHeader>
                    <p className={classes.divider}>Kitchener Gospel Hall Directory</p>
                    <CardBody>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        name="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        name="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Lock className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" onClick={login}>
                        Login
                      </Button>
                      {this.getRegisterButton(register)}
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);