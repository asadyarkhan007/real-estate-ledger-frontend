import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Home from "@material-ui/icons/Home";
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import Snackbars from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import SweetAlert from "react-bootstrap-sweetalert";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import {
  APIURL,
  PROPERTY_KIND,
  PROPERTY_TYPE
} from "../../constants/AppConstants";
import Axios from "axios";
import PlotForm from "./PropertyForms/PlotForm";
import BuildingForm from "./PropertyForms/BuildingForm";
import ApartmentForm from "./PropertyForms/ApartmentForm";
import BanglowForm from "./PropertyForms/BanglowForm";
import { checkUserRole, getCurrentUser } from "../../helpers/AuthHelper";

class PropertyForms extends React.Component {
  constructor(props) {
    super(props);
    this.user = getCurrentUser();
    this.state = {
      propertyType: null,
      propertyKind: null,
      propertyData: null,
      isUpdate: false,
      error: null,
      alert: null,
      role: checkUserRole(),
      data: [],
      property: {},
      section: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id)
      Axios.get(`${APIURL}/property/${id}`)
        .then(response => {
          this.setState({
            propertyData: response.data.data,
            isUpdate: true,
            id: id,
            propertyType: response.data.data.property_type_id,
            propertyKind: response.data.data.property_kind_id
          });
        })
        .catch(error => {
          this.setState({ error: error });
        });
  }

  handlePropertyKindChange = event => {
    this.setState({ propertyKind: parseInt(event.target.value) });
  };

  handlePropertyTypeChange = event => {
    this.setState({ propertyType: event.target.value });
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

  Validated = payload => {
    if (payload.property_type_id == PROPERTY_TYPE.PLOT) {
      return payload.address && payload.address.street && payload.sector_id;
    }
    if (payload.property_type_id == PROPERTY_TYPE.APARTMENT) {
      return (
        payload.apartment &&
        payload.apartment["no_of_rooms"] &&
        payload.apartment["floor_no"]
      );
    }
    if (payload.property_type_id == PROPERTY_TYPE.BANGLOW) {
      return (
        payload.banglow &&
        payload.banglow["plot_id"] != null &&
        payload.banglow["no_of_rooms"] != null
      );
    }
    if (payload.property_type_id == PROPERTY_TYPE.BUILDING) {
      return (
        payload.building &&
        payload.building["plot_id"] != null &&
        payload.building["no_of_floors"] != null
      );
    } else {
      return false;
    }
  };

  preparePayLoad = data => {
    const { propertyType, propertyKind } = this.state;

    const payLoad = {
      property_type_id: propertyType,
      property_kind_id: propertyKind,
      managing_org_id: this.user.managing_org
    };
    if (propertyType == PROPERTY_TYPE.PLOT) {
      payLoad.address = data.address;
      payLoad.area_in_sq_yards = data.area_in_sq_yards;
      payLoad.sector_id = data.sector;
      payLoad.plot_no = data.plot_no;
    }
    if (propertyType == PROPERTY_TYPE.BUILDING) {
      payLoad.building = data;
    }
    if (propertyType == PROPERTY_TYPE.APARTMENT) {
      payLoad.apartment = data;
    }
    if (propertyType == PROPERTY_TYPE.BANGLOW) {
      payLoad.banglow = data;
    }

    return payLoad;
  };

  submitPropertyOnBlockChain = property => {
    let propertyInfo = null;
    Axios.get(`${APIURL}/property/${property.id}`)
      .then(response => {
        propertyInfo = response.data.data;
        window.App.insertPropertyData(
          0,
          propertyInfo.id,
          propertyInfo.plot.area_in_sq_yards,
          "",
          Object.keys(PROPERTY_TYPE).find(
            key => PROPERTY_TYPE[key] === propertyInfo.property_type_id
          ),
          Object.keys(PROPERTY_KIND).find(
            key => PROPERTY_KIND[key] === propertyInfo.property_kind_id
          ),
          this.user.managing_org,
          propertyInfo.plot.address.street,
          propertyInfo.plot.address.city,
          propertyInfo.plot.address.country,
          window.web3.eth.accounts[0],
          10000000
        ).then(result => {
          console.log(result);
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  submitData = data => {
    const { isUpdate } = this.state;

    let payLoad = this.preparePayLoad(data);

    if (this.Validated(payLoad)) {
      if (isUpdate) {
        const { id } = this.props.match.params;
        const url = `${APIURL}/property/update-property/${id}`;

        Axios.put(url, payLoad)
          .then(response => {
            if (response.data.data) {
              this.Alert("Updated Successfully!", this.props.classes.success);
            }
          })
          .catch(error => {
            this.Alert(error, this.props.classes.warning);
          });
      } else {
        const url = `${APIURL}/property/add-property`;
        Axios.post(url, payLoad)
          .then(response => {
            if (response.data.data) {
              this.Alert("Successfully Done!", this.props.classes.success);
              this.submitPropertyOnBlockChain(response.data.data);
            }
          })
          .catch(error => {
            this.Alert(error, this.props.classes.danger);
          });
      }
    } else {
      this.Alert("All fields are required", this.props.classes.danger);
    }
  };

  loadData = async () => {
    const { id } = this.props.match.params;
    const { classes } = this.props;

    let property = await window.App.getPropertyByOffChainPropertyId(+id);
    console.log(property);
    if (property) {
      let data = await window.App.getMutationAndSaleAndSignDeedByPropertyId(
        property.id
      );
      console.log(data);
      this.setState(
        {
          property: property,
          data: data,
          propertyExist: true
        },
        () => {
          this.setState({
            section: this.renderOwnerShip()
          });
        }
      );
    } else {
      this.setState({
        propertyExist: false,
        section: (
          <GridContainer>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Home />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Property Detail</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem md={2} sm={2} />
                  <GridItem md={10} sm={10}>
                    <h3>
                      {`Property Owned by ${
                        this.state.propertyData.managingOrg.full_name
                      } (${this.state.propertyData.managingOrg.name}) `}
                    </h3>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridContainer>
        )
      });
    }
  };

  showOwnerShip = () => {
    const { id } = this.props.match.params;
    if (id) {
      this.loadData();
    }
  };

  renderOwnerShip = () => {
    const { classes } = this.props;
    const { data, property } = this.state;

    return (
      <div>
        {property && (
          <div>
            <GridContainer>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <Home />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>Property Detail</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Country
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.country}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      City
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.city}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Street
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.street}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Type
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.propertyType}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Kind
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.kind}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Managing Org
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.managingOrg}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Area in Sq Yards
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.areaSqYards}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </div>
        )}
        {data.length > 0 &&
          data.map((val, key) => (
            <div>
              <GridContainer>
                <Card>
                  <CardHeader color="primary" icon>
                    <CardIcon color="primary">
                      <Assignment />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                      Mutation {data.length + 1 - (key + 1)}
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        New Owner Name
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.buyerFullName}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        New Owner Nic
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.buyerNic}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Old Owner Name
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.sellerFullName}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Old Owner Nic
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.sellerNic}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Mutated By Name
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.mutation.mutatedByFullName}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Mutated By NIC
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.mutation.mutatedByNic}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Sold Amount
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.soldAmount}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Mutated On
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.mutation.mutatedOn}
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridContainer>
            </div>
          ))}
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { isUpdate, role } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Property</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>
                      <FormLabel
                        className={
                          classes.labelHorizontal +
                          " " +
                          classes.labelHorizontalRadioCheckbox
                        }
                      >
                        Property Kind
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} md={8} sm={10}>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyKind ===
                                PROPERTY_KIND.AGRICULTURE
                              }
                              onChange={this.handlePropertyKindChange}
                              value={PROPERTY_KIND.AGRICULTURE}
                              name="radio button demo"
                              aria-label="Agricultural"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Agricultural"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyKind ===
                                PROPERTY_KIND.COMMERCIAL
                              }
                              onChange={this.handlePropertyKindChange}
                              value={PROPERTY_KIND.COMMERCIAL}
                              name="radio button demo"
                              aria-label="Commercial"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Commercial"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyKind ===
                                PROPERTY_KIND.RESIDENTIAL
                              }
                              onChange={this.handlePropertyKindChange}
                              value={PROPERTY_KIND.RESIDENTIAL}
                              name="radio button demo"
                              aria-label="Residential"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Residential"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>
                      <FormLabel
                        className={
                          classes.labelHorizontal +
                          " " +
                          classes.labelHorizontalRadioCheckbox
                        }
                      >
                        Property Type
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} md={8} sm={10}>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyType ==
                                PROPERTY_TYPE.BUILDING
                              }
                              onChange={this.handlePropertyTypeChange}
                              value={PROPERTY_TYPE.BUILDING}
                              name="propertyType"
                              aria-label="Building"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Building"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyType ==
                                PROPERTY_TYPE.APARTMENT
                              }
                              onChange={this.handlePropertyTypeChange}
                              value={PROPERTY_TYPE.APARTMENT}
                              name="propertyType"
                              aria-label="Apartment"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Apartment"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyType == PROPERTY_TYPE.PLOT
                              }
                              onChange={this.handlePropertyTypeChange}
                              value={PROPERTY_TYPE.PLOT}
                              name="propertyType"
                              aria-label="Plot"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Plot"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.propertyType == PROPERTY_TYPE.BANGLOW
                              }
                              onChange={this.handlePropertyTypeChange}
                              value={PROPERTY_TYPE.BANGLOW}
                              name="propertyType"
                              aria-label="Bungalow"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Bungalow"
                          disabled={this.state.isUpdate}
                        />
                      </div>
                    </GridItem>
                  </GridContainer>

                  {this.state.propertyType == PROPERTY_TYPE.PLOT && (
                    <PlotForm
                      propertyKind={this.state.propertyKind}
                      submit={this.submitData}
                      propertyData={this.state.propertyData}
                      isUpdate={isUpdate}
                      role={role}
                    />
                  )}

                  {this.state.propertyType == PROPERTY_TYPE.BUILDING && (
                    <BuildingForm
                      propertyKind={this.state.propertyKind}
                      propertyType={this.state.propertyType}
                      submit={this.submitData}
                      propertyData={this.state.propertyData}
                      isUpdate={isUpdate}
                      role={role}
                    />
                  )}

                  {this.state.propertyType == PROPERTY_TYPE.APARTMENT && (
                    <ApartmentForm
                      propertyKind={this.state.propertyKind}
                      propertyType={this.state.propertyType}
                      submit={this.submitData}
                      propertyData={this.state.propertyData}
                      isUpdate={isUpdate}
                      role={role}
                    />
                  )}

                  {this.state.propertyType == PROPERTY_TYPE.BANGLOW && (
                    <BanglowForm
                      propertyKind={this.state.propertyKind}
                      propertyType={this.state.propertyType}
                      submit={this.submitData}
                      propertyData={this.state.propertyData}
                      isUpdate={isUpdate}
                      role={role}
                    />
                  )}
                </form>
              </CardBody>
            </Card>
            {this.state.alert}
          </GridItem>
        </GridContainer>
        {this.state.id && (
          <GridContainer justify="flex-end">
            <GridItem xs={6} sm={3} md={3}>
              <Button color="rose" onClick={this.showOwnerShip}>
                {"Show Ownership"}
              </Button>
            </GridItem>
          </GridContainer>
        )}
        {this.state.section}
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(PropertyForms);
