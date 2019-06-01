import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";

import avatar from "assets/img/faces/marc.jpg";
import Axios from "axios";
import { APIURL } from "../../constants/AppConstants";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      nic: null,
      email: null,
      password: null,
      blockchain_key: null,
      phone_number: null
    };
    this.user_id = JSON.parse(localStorage.getItem("user")).id;
  }

  componentDidMount() {
    // this.prepareData(this.getData());
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    Axios.get(`${APIURL}/users/${user_id}`)
      .then(response => {
        this.setState({
          username: response.data.data.username,
          phone_number: response.data.data.phone_number,
          nic: response.data.data.nic,
          password: response.data.data.password,
          blockchain_key: response.data.data.blockchain_key,
          email: response.data.data.email
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleNicChange = e => {
    this.setState({ nic: e.target.value });
  };

  handleBlockChainKeyChange = e => {
    this.setState({ blockchain_key: e.target.value });
  };

  handlePhoneNumberChange = e => {
    this.setState({ phone_number: e.target.value });
  };

  submitData = () => {
    const {
      username,
      password,
      nic,
      email,
      phone_number,
      blockchain_key
    } = this.state;

    Axios.put(`${APIURL}/users/${this.user_id}`, {
      username: username,
      password: password,
      nic: nic,
      email: email,
      phone_number: phone_number,
      blockchain_key: blockchain_key
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Profile - <small>Complete your profile</small>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.username,
                        onChange: this.handleUsernameChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.email,
                        onChange: this.handleEmailChange
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="NIC"
                      id="nic"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.nic,
                        onChange: this.handleNicChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.phone_number,
                        onChange: this.handlePhoneNumberChange
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Public Key"
                      id="public-key"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.blockchain_key,
                        onChange: this.handleBlockChainKeyChange
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button
                  color="rose"
                  className={classes.updateProfileButton}
                  onClick={this.submitData}
                >
                  Update Profile
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(userProfileStyles)(UserProfile);
