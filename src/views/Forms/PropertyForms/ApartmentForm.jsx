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
import { APIURL } from "../../../constants/AppConstants";
import withStyles from "@material-ui/core/styles/withStyles";
import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import {ROLES} from "../../../helpers/AuthHelper";
import DetailComponent from "./DetailComponent";

class ApartmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      building_id: props.propertyData ? props.propertyData.building_id : null,
      apartment: props.propertyData
        ? props.propertyData.apartment
        : {
            floor_no: null,
            no_of_rooms: null,
            name: null
          },
      property_type_id: props.propertyType || "",
      property_kind_id: props.propertyKind || "",
      buildings: []
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/building`)
      .then(response => {
        this.setState({ buildings: response.data.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFloorNo = event => {
    const { apartment } = this.state;
    apartment.floor_no = event.target.value;
    this.setState({
      apartment
    });
  };

  handleNoOfRooms = event => {
    const { apartment } = this.state;
    apartment.no_of_rooms = event.target.value;
    this.setState({
      apartment
    });
  };

  handleApartmentName = event => {
    const { apartment } = this.state;
    apartment.name = event.target.value;
    this.setState({
      apartment
    });
  };

  handleBuildingChange = event => {
    this.setState({
      building_id: event.target.value
    });
  };

  submitData = () => {
    const { apartment, building_id } = this.state;
    apartment.building_id = building_id;
    this.props.submit(apartment);
  };

  render() {
    const { classes } = this.props;
    const { apartment, building_id, buildings } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Apartment Information</h5>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Building Name
            </FormLabel>
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
                value={building_id}
                onChange={this.handleBuildingChange}
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
                  Choose Your Building
                </MenuItem>
                {buildings.length > 0 &&
                  buildings.map(el => (
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={el.id}
                    >
                      {`Name: ${el.name}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <DetailComponent building_id={building_id} />
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Apartment Name
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="building_name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: apartment.name,
                onChange: this.handleApartmentName,
                placeholder: "Name",
                type: "text"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Floor No</FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="floor_no"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: apartment.floor_no,
                onChange: this.handleFloorNo,
                placeholder: "Floor Number",
                type: "number"
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              No of Rooms
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="no_of_rooms"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: apartment.no_of_rooms,
                onChange: this.handleNoOfRooms,
                placeholder: "No of Apartments",
                type: "number"
              }}
            />
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
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(ApartmentForm);
