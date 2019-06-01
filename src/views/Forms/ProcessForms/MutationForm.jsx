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
import { checkUserRole, ROLES } from "../../../helpers/AuthHelper";

class MutationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: null,
      mutatedBy: null,
      seller: null,
      buyer: null,
      properties: [],
      users: []
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/property`)
      .then(response => {
        this.setState({ properties: response.data.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    Axios.get(`${APIURL}/users`)
      .then(response => {
        this.setState({ users: response.data.data });
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

  handleMutatedByChange = event => {
    this.setState({
      mutatedBy: event.target.value
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

  submitData = () => {
    const { building, plot_id } = this.state;
    building.plot_id = plot_id;
    this.props.submit(building);
  };

  render() {
    const { classes } = this.props;
    const {
      property_id,
      buyer,
      seller,
      mutatedBy,
      properties,
      users
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} md={12} sm={12}>
            <h5>Mutation Form</h5>
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
                      {`Property Id : ${el.id} => Street: ${
                        el.plot.address.street
                      }, Area: ${el.plot.address.area}, City: ${
                        el.plot.address.city
                      }`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        {/*<DetailComponent plot_id={plot_id} />*/}
        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Seller</FormLabel>
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
                value={seller}
                onChange={this.handleSellerChange}
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
                  Choose Seller
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

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>
              Mutated By
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <CustomInput
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: mutatedBy,
                onChange: this.handleMutatedByChange,
                placeholder: "Mutated By",
                type: "text"
              }}
            />
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
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(MutationForm);
