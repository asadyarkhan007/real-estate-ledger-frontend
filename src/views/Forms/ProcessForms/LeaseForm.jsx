import React from "react";

import FormLabel from "@material-ui/core/FormLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

import Axios from "axios";
import { APIURL } from "../../../constants/AppConstants";
import withStyles from "@material-ui/core/styles/withStyles";
import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  checkUserRole,
  ROLES,
  getCurrentUser
} from "../../../helpers/AuthHelper";
import Datetime from "react-datetime";
import moment from "moment";

class LeaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: null,
      leaseStartDate: null,
      leaseEndDate: null,
      leasedBy: null,
      leasedTo: null,
      properties: [],
      mutation: null,
      tax_amount: null,
      leasing_charges: null,
      users: [],
      mutations: [],
      mutationData: [],
      alert: null
    };
  }

  prepareData = data => {
    let properties = [];

    data.map(val => {
      properties[val.id] = val.property;
    });

    this.setState({
      properties: properties,
      mutationData: data
    });
  };

  componentDidMount() {
    let registrar = getCurrentUser();
    window.App.getLeasableProperties(registrar.managingOrg.name.toLowerCase()).then(data => {
      console.log(data);
      this.prepareData(data);
    });
  }

  handlePropertyChange = event => {
    this.setState({
      property_id: event.target.value
    });
  };

  handleMutationChange = event => {
    this.setState({
      mutation: event.target.value
    });
  };

  handleLeasingCharges = event => {
    this.setState({
      leasing_charges: event.target.value
    });
  };

  handleTaxAmount = event => {
    this.setState({
      tax_amount: event.target.value
    });
  };

  handleLeaseStartDateChange = date => {
    this.setState({
      leaseStartDate: date,
      leaseEndDate: new moment(date).add(99, "years")
    });
  };

  handleLeaseEndDateChange = date => {
    this.setState({
      leaseEndDate: date
    });
  };

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

  submitData = async () => {
    const {
      mutationData,
      property_id,
      leaseStartDate,
      leaseEndDate,
      tax_amount,
      leasing_charges
    } = this.state;

    let mutationObj = mutationData.filter(val => {
      return val.property.id === property_id;
    })[0];

    const user = getCurrentUser();

    let result = await window.App.insertLeasedPropertyData(
      mutationObj.id,
      property_id,
      leaseStartDate.valueOf(),
      leaseEndDate.valueOf(),
      user.blockchain_key,
      user.nic + "",
      mutationObj.newOwnerPkey,
      mutationObj.newOwnerNic,
      leasing_charges,
      tax_amount,
      window.web3.eth.defaultAccount,
      window.App.stdGasAmount
    );
    if (result) {
      console.log(result);
      this.Alert("Submitted Successfully!", "success");
    }
  };

  render() {
    const { classes } = this.props;
    const {
      property_id,
      properties,
      leaseStartDate,
      leaseEndDate
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Lease Information</h5>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Property</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8} md={8} lg={8}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={property_id}
                onChange={this.handlePropertyChange}
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
                  Choose Property
                </MenuItem>
                {properties.length > 0 &&
                  properties.map(el => (
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={el.id}
                    >
                      {`Property No : ${el.propertyNo} => Property Type: ${
                        el.propertyType
                      } Street: ${el.street}, Area: ${el.areaSqYards}, City: ${
                        el.city
                      }`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Leasing Charges
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="no_of_floors_building"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.leasing_charges,
                onChange: this.handleLeasingCharges,
                placeholder: "Leasing Charges",
                type: "number"
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Tax Amount Per Year
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="tax_amount_per_year"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.tax_amount,
                onChange: this.handleTaxAmount,
                placeholder: "Tax Amount Per Year",
                type: "number"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <LibraryBooks />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lease Start Date</h4>
              </CardHeader>
              <CardBody>
                <InputLabel className={classes.label}>
                  Lease Start Date
                </InputLabel>
                <br />
                <FormControl fullWidth>
                  <Datetime
                    value={leaseStartDate}
                    onChange={this.handleLeaseStartDateChange}
                    timeFormat={false}
                    inputProps={{
                      placeholder: "Date Picker Here"
                    }}
                  />
                </FormControl>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <LibraryBooks />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lease End Date</h4>
              </CardHeader>
              <CardBody>
                <InputLabel className={classes.label}>
                  Lease End Date
                </InputLabel>
                <br />
                <FormControl fullWidth>
                  <Datetime
                    value={leaseEndDate}
                    onChange={this.handleLeaseEndDateChange}
                    timeFormat={false}
                    inputProps={{
                      placeholder: "Date Picker Here"
                    }}
                  />
                </FormControl>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        {checkUserRole() === ROLES.MANAGER && (
          <GridContainer justify="flex-end">
            <GridItem xs={6} sm={3} md={3}>
              <Button color="rose" onClick={this.submitData}>
                Submit
              </Button>
            </GridItem>
          </GridContainer>
        )}
        {this.state.alert}
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(LeaseForm);
