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
import { checkUserRole } from "../../helpers/AuthHelper";

class PropertyForms extends React.Component {
  constructor(props) {
    super(props);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      propertyType: null,
      propertyKind: null,
      propertyData: null,
      isUpdate: false,
      error: null,
      alert: null,
      role: checkUserRole()
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

  render() {
    const { classes } = this.props;
    const { isUpdate, role } = this.state;
    return (
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
                              this.state.propertyType == PROPERTY_TYPE.BUILDING
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
                              this.state.propertyType == PROPERTY_TYPE.APARTMENT
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
    );
  }
}
export default withStyles(regularFormsStyle)(PropertyForms);
