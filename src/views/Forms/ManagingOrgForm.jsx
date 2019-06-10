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

import { APIURL, CITY_LIST, AREA_LIST } from "../../constants/AppConstants";
import Axios from "axios";
import { getCurrentUser } from "../../helpers/AuthHelper";

class ManagingOrgForms extends React.Component {
  constructor(props) {
    super(props);
    this.user = getCurrentUser();
    this.state = {
      isUpdate: false,
      error: null,
      alert: null,
      address: {
        street: null,
        city: null,
        area: null,
        country: "Pakistan",
        province: null
      },
      name: null,
      full_name: null,
      active: true,
      id: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id)
      Axios.get(`${APIURL}/managing-org/${id}`)
        .then(response => {
          this.setState({
            address: response.data.data.address,
            isUpdate: true,
            name: response.data.data.name,
            full_name: response.data.data.full_name,
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

  handleCity = event => {
    const { address } = this.state;
    address.city = event.target.value;
    this.setState({
      address
    });
  };

  handleStreetChange = event => {
    const { address } = this.state;
    address.street = event.target.value;
    this.setState({
      address
    });
  };

  handleProvinceChange = event => {
    const { address } = this.state;
    address.province = event.target.value;
    this.setState({
      address
    });
  };

  handleArea = event => {
    const { address } = this.state;
    address.area = event.target.value;
    this.setState({
      address
    });
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleFullNameChange = event => {
    this.setState({
      full_name: event.target.value
    });
  };

  submitData = data => {
    const { address, name, full_name, isUpdate, id } = this.state;

    if (isUpdate) {
      Axios.put(`${APIURL}/managing-org/${id}`, {
        address: address,
        name: name,
        full_name: full_name
      })
        .then(response => {
          console.log(response);
          this.props.history.push("/admin/dashboard");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Axios.post(`${APIURL}/managing-org`, {
        address: address,
        name: name,
        full_name: full_name
      })
        .then(response => {
          console.log(response);
          this.props.history.push("/admin/dashboard");
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
                <h4 className={classes.cardTitle}>Managing Organization</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} md={12} sm={12}>
                    <h5>Address Information</h5>
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Street
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="street"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address.street,
                        onChange: this.handleStreetChange,
                        placeholder: "street"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      City
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9} lg={9}>
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
                        value={address.city}
                        onChange={this.handleCity}
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
                          Choose City
                        </MenuItem>
                        {CITY_LIST.map(el => (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={el}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Area
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9} lg={9}>
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
                        value={address.area}
                        onChange={this.handleArea}
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
                          Choose Area
                        </MenuItem>
                        {AREA_LIST.map(el => (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={el}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Province
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="province"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: address.province,
                        onChange: this.handleProvinceChange,
                        placeholder: "province"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Organization Short Name
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.name,
                        onChange: this.handleNameChange,
                        placeholder: "name"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Organization Full Name
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9} md={9}>
                    <CustomInput
                      id="full-name"
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
export default withStyles(regularFormsStyle)(ManagingOrgForms);
