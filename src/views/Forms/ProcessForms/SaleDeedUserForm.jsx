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
import SweetAlert from "react-bootstrap-sweetalert";

import Axios from "axios";
import { APIURL } from "../../../constants/AppConstants";
import withStyles from "@material-ui/core/styles/withStyles";
import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import {
  checkUserRole,
  ROLES,
  USER_TYPE,
  getCurrentUser
} from "../../../helpers/AuthHelper";

class SaleDeedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: null,
      stampPaperAmount: null,
      soldAmount: null,
      deedType: null,
      seller: null,
      alert: null,
      buyer: null,
      disabled: false,
      properties: [],
      users: []
    };
  }

  componentDidMount() {
    const user = getCurrentUser();
    window.App.getMutatedPropertiesForUserByNic(user.nic + "").then(val => {
      if (val) this.setState({ properties: val });
    });

    Axios.get(`${APIURL}/users`)
      .then(response => {
        this.setState({
          users: response.data.data.filter(val => {
            return val.user_type === USER_TYPE.USER;
          })
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handlePropertyChange = event => {
    this.setState({
      property_id: event.target.value
    });
  };

  handleStampPaperAmountChange = event => {
    this.setState({
      stampPaperAmount: event.target.value
    });
  };

  handleSoldAmountChange = event => {
    this.setState({
      soldAmount: event.target.value
    });
  };

  handleBuyerChange = event => {
    this.setState({
      buyer: event.target.value
    });
  };

  handleSellerChange = event => {
    this.setState({
      seller: event.target.value
    });
  };

  handleDeedTypeChange = event => {
    this.setState({
      deedType: event.target.value
    });
  };

  submitData = async () => {
    const { property_id } = this.state;
    const user = getCurrentUser();

    this.setState({
      disabled: true
    });

    let buyer = this.state.users.filter(val => {
      return val.id === this.state.buyer;
    })[0];

    let saleDeedTrans = await window.App.insertDeedDataIfNotExist(
      +property_id,
      +this.state.stampPaperAmount,
      +this.state.soldAmount,
      this.state.deedType,
      user.username,
      user.nic + "",
      user.blockchain_key,
      buyer.username,
      buyer.nic + "",
      buyer.blockchain_key,
      window.web3.eth.defaultAccount,
      window.App.stdGasAmount
    );
    console.log(saleDeedTrans);

    let saleDeedId = saleDeedTrans.logs[0].args.newID.toNumber();
    console.log(saleDeedId);

    // create sign deed without anyone signature
    let signDeed = await window.App.insertSignDeedDataIfNotExist(
      property_id,
      saleDeedId,
      +this.state.soldAmount,
      window.web3.eth.defaultAccount,
      window.App.stdGasAmount
    );
    console.log(signDeed);

    this.Alert("Created Successfully!", "success");
    this.setState({
      disabled: false
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

  render() {
    const { classes } = this.props;
    const {
      property_id,
      buyer,
      soldAmount,
      stampPaperAmount,
      properties,
      users
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Sale Deed Information</h5>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Deed Type</FormLabel>
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
                value={this.state.deedType}
                onChange={this.handleDeedTypeChange}
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
                  Deed Type
                </MenuItem>
                <MenuItem
                  value={"sale"}
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Sale
                </MenuItem>
                <MenuItem
                  value={"gift"}
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Gift
                </MenuItem>
              </Select>
            </FormControl>
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
                      value={el.property.id}
                    >
                      {`Property Id : ${el.property.id} => Street: ${
                        el.property.street
                      }, Area: ${el.property.areaSqYards} sq yards , City: ${
                        el.property.city
                      } Province: ${el.property.province}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        {/*<DetailComponent plot_id={plot_id} />*/}
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Stamp Paper Amount
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="building_name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: stampPaperAmount,
                onChange: this.handleStampPaperAmountChange,
                placeholder: "Stamp Paper Amount",
                type: "number"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Sold Amount
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: soldAmount,
                onChange: this.handleSoldAmountChange,
                placeholder: "Sold Amount",
                type: "number"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Buyer</FormLabel>
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
                value={buyer}
                onChange={this.handleBuyerChange}
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
                  Choose Buyer
                </MenuItem>
                {users.length > 0 &&
                  users.map(el => (
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={el.id}
                    >
                      {`Username : ${el.username}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-end">
          <GridItem xs={6} sm={3} md={3}>
            <Button
              color="rose"
              onClick={this.submitData}
              disabled={this.state.disabled}
            >
              Submit
            </Button>
          </GridItem>
        </GridContainer>
        {this.state.alert}
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(SaleDeedForm);
