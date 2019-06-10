import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbars from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import SweetAlert from "react-bootstrap-sweetalert";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import { APIURL } from "../../constants/AppConstants";
import Axios from "axios";
import { getCurrentUser } from "../../helpers/AuthHelper";

class CreateRegistrarForm extends React.Component {
  constructor(props) {
    super(props);
    this.user = getCurrentUser();
    this.state = {
      isUpdate: false,
      error: null,
      alert: null,
      orgData: [],
      username: null,
      full_name: null,
      email: null,
      password: null,
      blockchain_key: null,
      phone_number: null,
      nic: null,
      managing_org: null
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/managing-org`)
      .then(response => {
        this.setState({
          orgData: response.data.data
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });

    const { id } = this.props.match.params;
    if (id)
      Axios.get(`${APIURL}/users/${id}`)
        .then(response => {
          this.setState({
            username: response.data.data.username,
            email: response.data.data.email,
            managing_org: response.data.data.managing_org,
            isUpdate: true,
            full_name: response.data.data.full_name,
            blockchain_key: response.data.data.blockchain_key,
            phone_number: response.data.data.phone_number,
            nic: response.data.data.nic,
            id: response.data.data.id
          });
        })
        .catch(error => {
          this.setState({ error: error });
        });
  }

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  Alert = (error, buttonClass) => {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title={error}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={this.props.classes.button + " " + buttonClass}
        />
      )
    });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleNicChange = e => {
    this.setState({ nic: e.target.value });
  };

  handleFullNameChange = e => {
    this.setState({ full_name: e.target.value });
  };

  handleBlockChainKeyChange = e => {
    this.setState({ blockchain_key: e.target.value });
  };

  handlePhoneNumberChange = e => {
    this.setState({ phone_number: e.target.value });
  };

  handleOrgChange = event => {
    this.setState({
      managing_org: event.target.value
    });
  };

  submitData = () => {
    const {
      username,
      nic,
      email,
      id,
      password,
      full_name,
      managing_org,
      phone_number,
      isUpdate,
      blockchain_key
    } = this.state;

    if (isUpdate) {
      Axios.put(`${APIURL}/users/${id}`, {
        username: username,
        password: password,
        nic: nic,
        full_name: full_name,
        managing_org: managing_org,
        email: email,
        user_type: 2,
        phone_number: phone_number,
        blockchain_key: blockchain_key
      })
        .then(response => {
          console.log(response);
          this.props.history.push("/admin/all-registrar");
          // browserHistory.push("/admin/dashboard");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Axios.post(`${APIURL}/users`, {
        username: username,
        password: password,
        nic: nic,
        full_name: full_name,
        managing_org: managing_org,
        email: email,
        user_type: 2,
        phone_number: phone_number,
        blockchain_key: blockchain_key
      })
        .then(response => {
          console.log(response);
          this.props.history.push("/admin/all-registrar");
          // browserHistory.push("/admin/dashboard");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { address } = this.state;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Add Registrar</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Username
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.username,
                        onChange: this.handleUsernameChange,
                        placeholder: "User Name"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      NIC
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-nic"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.nic,
                        onChange: this.handleNicChange,
                        placeholder: "Nic"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Full Name
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-nic"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.full_name,
                        onChange: this.handleFullNameChange,
                        placeholder: "Full Name"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-nic"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handlePasswordChange,
                        placeholder: "Password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Phone Number
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-nic"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.phone_number,
                        onChange: this.handlePhoneNumberChange,
                        placeholder: "Phone Number"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Email
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.email,
                        onChange: this.handleEmailChange,
                        placeholder: "Email"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Block Chain Key
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-nic"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.blockchain_key,
                        onChange: this.handleBlockChainKeyChange,
                        placeholder: "Block Chain Key"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Organization
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={8} lg={8}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.managing_org}
                        onChange={this.handleOrgChange}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Organization
                        </MenuItem>
                        {this.state.orgData.length > 0 &&
                          this.state.orgData.map(el => (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value={el.id}
                            >
                              {el.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer justify="flex-end">
                  <GridItem xs={6} sm={3} md={3}>
                    <Button color="rose" onClick={this.submitData}>
                      {this.state.isUpdate ? "Update" : "Add"}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
          {this.state.alert}
        </GridItem>
      </GridContainer>
    );
  }
}
export default withStyles(regularFormsStyle)(CreateRegistrarForm);
