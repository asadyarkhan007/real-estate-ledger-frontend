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
import { ROLES } from "../../../helpers/AuthHelper";
import DetailComponent from "./DetailComponent";

class BanglowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plot_id: props.propertyData ? props.propertyData.plot_id : null,
      banglow: props.propertyData
        ? props.propertyData.banglow
        : {
            no_of_floors: null,
            no_of_rooms: null,
            name: null
          },
      property_type_id: props.propertyType || "",
      property_kind_id: props.propertyKind || "",
      plots: []
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/plot`)
      .then(response => {
        this.setState({ plots: response.data.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleNumberOfFloors = event => {
    const { banglow } = this.state;
    banglow.no_of_floors = event.target.value;
    this.setState({
      banglow
    });
  };

  handleNoOfRooms = event => {
    const { banglow } = this.state;
    banglow.no_of_rooms = event.target.value;
    this.setState({
      banglow
    });
  };

  handleBanglowName = event => {
    const { banglow } = this.state;
    banglow.name = event.target.value;
    this.setState({
      banglow
    });
  };

  handlePlotChange = event => {
    this.setState({
      plot_id: event.target.value
    });
  };

  submitData = () => {
    const { banglow, plot_id } = this.state;
    banglow.plot_id = plot_id;
    this.props.submit(banglow);
  };

  render() {
    const { classes } = this.props;
    const { banglow, plot_id, plots } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Bungalow Information</h5>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Plot</FormLabel>
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
                value={plot_id}
                onChange={this.handlePlotChange}
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
                  Choose Plot
                </MenuItem>
                {plots.length > 0 &&
                  plots.map(el => (
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={el.id}
                    >
                      {`Street: ${el.address.street}, Area: ${
                        el.address.area
                      }, City: ${el.address.city}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <DetailComponent plot_id={plot_id} />
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Bungalow No
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="building_name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: banglow.name,
                onChange: this.handleBanglowName,
                placeholder: "Name",
                type: "text"
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              No of Floors
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              id="no_of_floors_building"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: banglow.no_of_floors,
                onChange: this.handleNumberOfFloors,
                placeholder: "No of Floors",
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
              id="no_of_apartments_building"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: banglow.no_of_rooms,
                onChange: this.handleNoOfRooms,
                placeholder: "No of Rooms",
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
export default withStyles(regularFormsStyle)(BanglowForm);
