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

import Axios from "axios";
import {
  APIURL,
  AREA_LIST,
  CITY_LIST,
  PROVINCE_LIST
} from "../../../constants/AppConstants";
import withStyles from "@material-ui/core/styles/withStyles";
import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { ROLES } from "../../../helpers/AuthHelper";

class PlotForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectorList: [],
      address: props.propertyData
        ? props.propertyData.plot.address
        : {
            city: null,
            street: null,
            country: "Pakistan",
            area: null,
            province: null
          },
      sector: props.propertyData ? props.propertyData.plot.sector_id : null,
      area_in_sq_yards: props.propertyData
        ? parseInt(props.propertyData.plot.area_in_sq_yards)
        : null,
      plot_no: props.propertyData ? props.propertyData.name : null,
      property_type_id: props.propertyType,
      property_kind_id: props.propertyKind,
      plot_id: props.propertyData ? props.propertyData.plot_id : null
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/sector`)
      .then(response => {
        this.setState({ sectorList: response.data.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleCity = event => {
    const { address } = this.state;
    address.city = event.target.value;
    this.setState({
      address
    });
  };

  handleProvince = event => {
    const { address } = this.state;
    address.province = event.target.value;
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

  handleArea = event => {
    const { address } = this.state;
    address.area = event.target.value;
    this.setState({
      address
    });
  };

  handleAreaInSqYards = event => {
    this.setState({
      area_in_sq_yards: event.target.value
    });
  };

  handlePlotNo = event => {
    this.setState({
      plot_no: event.target.value
    });
  };

  handleSector = event => {
    this.setState({
      sector: event.target.value
    });
  };

  submitData = () => {
    this.props.submit(this.state);
  };

  render() {
    const { classes } = this.props;
    const { address, sectorList } = this.state;
    return (
      <form>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Address Information</h5>
          </GridItem>
          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>Street</FormLabel>
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
            <FormLabel className={classes.labelHorizontal}>City</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <FormControl fullWidth className={classes.selectFormControl}>
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
            <FormLabel className={classes.labelHorizontal}>Province</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={address.province}
                onChange={this.handleProvince}
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
                  Choose Province
                </MenuItem>
                {PROVINCE_LIST.map(el => (
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
            <FormLabel className={classes.labelHorizontal}>Area</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <FormControl fullWidth className={classes.selectFormControl}>
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
          <GridItem xs={12} md={12} sm={12}>
            <h5>Plot Information</h5>
          </GridItem>
          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>
              Plot Area in Sq yards
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <CustomInput
              id="plot_area"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.area_in_sq_yards,
                onChange: this.handleAreaInSqYards,
                placeholder: "sq yards",
                type: "number"
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={5} md={5}>
            <CustomInput
              id="plot_no"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.plot_no,
                onChange: this.handlePlotNo,
                placeholder: "Plot No"
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3} lg={3}>
            <FormLabel className={classes.labelHorizontal}>Sector</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.sector}
                onChange={this.handleSector}
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
                  Choose Sector
                </MenuItem>
                {sectorList.map(el => (
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={el.id}
                  >
                    {el.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        {this.props.role === ROLES.MANAGER && (
          <GridContainer justify="flex-end">
            <GridItem xs={6} sm={3} md={3}>
              <Button color="rose" onClick={this.submitData}>
                {this.props.isUpdate ? "Update Property" : "Add Property"}
              </Button>
            </GridItem>
          </GridContainer>
        )}
      </form>
    );
  }
}
export default withStyles(regularFormsStyle)(PlotForm);
