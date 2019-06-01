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

class DetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plot_area: null,
      sector: null,
      address: {
        street: null,
        area: null,
        city: null,
        country: null
      },
      building: {
        name: null,
        no_of_floors: null
      }
    };
  }

  componentDidMount() {
    if (this.props.plot_id) {
      Axios.get(`${APIURL}/plot/${this.props.plot_id}`)
        .then(response => {
          this.setState({ plot_area: response.data.data.area_in_sq_yards });
          this.setState({ address: response.data.data.address });
          this.setState({ sector: response.data.data.sector_id });
        })
        .catch(function(error) {
          this.setState({
            error
          });
        });
    }
    if (this.props.building_id) {
      Axios.get(`${APIURL}/building/${this.props.building_id}`)
        .then(response => {
          this.setState({ building: response.data.data });
          this.setState({ address: response.data.data.plot.address });
          this.setState({ plot_area: response.data.data.area_in_sq_yards });
          this.setState({ sector: response.data.data.plot.sector_id });
        })
        .catch(function(error) {
          this.setState({
            error
          });
        });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.plot_id) {
      Axios.get(`${APIURL}/plot/${nextProps.plot_id}`)
        .then(response => {
          this.setState({ plot_area: response.data.data.area_in_sq_yards });
          this.setState({ address: response.data.data.address });
          this.setState({ sector: response.data.data.sector_id });
        })
        .catch(function(error) {
          this.setState({
            error
          });
        });
    }
    if (nextProps.building_id) {
      Axios.get(`${APIURL}/building/${nextProps.building_id}`)
        .then(response => {
          this.setState({ building: response.data.data });
          this.setState({ address: response.data.data.plot.address });
          this.setState({ plot_area: response.data.data.area_in_sq_yards });
          this.setState({ sector: response.data.data.plot.sector_id });
        })
        .catch(function(error) {
          this.setState({
            error
          });
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { address, plot_area, sector, building } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Address Information</h5>
          </GridItem>
          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>
              {"Plot Area:"} {plot_area}
            </FormLabel>
          </GridItem>

          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>
              {"Sector Id:"} {sector}
            </FormLabel>
          </GridItem>

          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>
              {"Street:"} {address.street}
            </FormLabel>
          </GridItem>

          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>
              {"Area:"} {address.area}
            </FormLabel>
          </GridItem>

          <GridItem xs={12} sm={3} md={3}>
            <FormLabel className={classes.labelHorizontal}>
              {"City:"} {address.city}
            </FormLabel>
          </GridItem>

          {building.name && (
            <>
              <GridItem xs={12} sm={3} md={3}>
                <FormLabel className={classes.labelHorizontal}>
                  {"Building Name:"} {building.name}
                </FormLabel>
              </GridItem>

              <GridItem xs={12} sm={3} md={3}>
                <FormLabel className={classes.labelHorizontal}>
                  {"No of Floors:"} {building.no_of_floors}
                </FormLabel>
              </GridItem>
            </>
          )}
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(DetailComponent);
