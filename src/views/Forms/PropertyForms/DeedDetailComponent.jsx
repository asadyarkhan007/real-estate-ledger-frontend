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
import { getCurrentUser } from "../../../helpers/AuthHelper";

class DeedDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {},
      deed: {},
      data: null,
      alert: null,
      soldAmount: null
    };
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

  loadData = () => {
    const { id } = this.props.match.params;
    // setTimeout(() => {
    //   window.App.getSignDeedWithDeedAndPropertyBySignDeedId(id).then(val => {
    //     this.setState({
    //       data: val,
    //       property: val.property,
    //       deed: val.deed,
    //       soldAmount: val.soldAmount
    //     });
    //   });
    // }, 2000);
    window.App.getSignDeedWithDeedAndPropertyBySignDeedId(id).then(val => {
      this.setState({
        data: val,
        property: val.property,
        deed: val.deed,
        soldAmount: val.soldAmount
      });
    });
  };

  sellerSign = async () => {
    const { data, soldAmount } = this.state;

    let result = await window.App.signDeedForSellerIfNotSign(
      data.id,
      soldAmount,
      window.web3.eth.defaultAccount,
      window.App.stdGasAmount
    );
    if (result) {
      this.Alert("Successfully Signed!", "success");
    }
  };

  buyerSign = async () => {
    const { data, soldAmount } = this.state;

    let result = await window.App.signDeedForBuyerIfNotSign(
      data.id,
      soldAmount,
      window.web3.eth.defaultAccount,
      window.App.stdGasAmount
    );

    if (result) {
      this.Alert("Successfully Signed!", "success");
    }
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { classes } = this.props;
    const { property, deed } = this.state;
    const user = getCurrentUser();

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Deed Type"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {deed.deedType}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Seller Full Name"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {deed.sellerFullName}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Seller NIC"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {deed.sellerNic}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Buyer Full Name"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {deed.buyerFullName}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Buyer Nic"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {deed.buyerNic}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"sold Amount"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {this.state.soldAmount}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Area Sq yards"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.areaSqYards}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Property Kind"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.kind}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Property Type"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.propertyType}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Property No"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.propertyNo}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Managing Org"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.managingOrg}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"City"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.city}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Country"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.country}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Province"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.province}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} md={4} sm={4}>
            {"Street"}
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            {property.street}
          </GridItem>
        </GridContainer>
        {deed.buyerNic === user.nic + "" && (
          <GridContainer justify="flex-end">
            <GridItem xs={6} sm={3} md={3}>
              <Button color="rose" onClick={this.buyerSign}>
                Buyer Sign
              </Button>
            </GridItem>
          </GridContainer>
        )}
        {deed.sellerNic === user.nic + "" && (
          <GridContainer justify="flex-end">
            <GridItem xs={6} sm={3} md={3}>
              <Button color="rose" onClick={this.sellerSign}>
                Seller Sign
              </Button>
            </GridItem>
          </GridContainer>
        )}
        {this.state.alert}
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(DeedDetailComponent);
