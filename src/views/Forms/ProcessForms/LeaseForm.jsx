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
import { checkUserRole, ROLES } from "../../../helpers/AuthHelper";
import Datetime from "react-datetime";
import moment from "moment";

class LeaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: null,
      leaseStartdate: null,
      leaseEnddate: null,
      leasedBy: null,
      leasedTo: null,
      properties: [],
      mutation: null,
      users: [],
      mutations: []
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

  handleMutationChange = event => {
    this.setState({
      mutation: event.target.value
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

  submitData = () => {
    const { building, plot_id } = this.state;
    building.plot_id = plot_id;
    this.props.submit(building);
  };

  render() {
    const { classes } = this.props;
    const {
      property_id,
      properties,
      mutations,
      mutation,
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

        <GridContainer>
          <GridItem xs={12} sm={3}>
            <FormLabel className={classes.labelHorizontal}>Mutations</FormLabel>
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
                value={mutation}
                onChange={this.handleMutationChange}
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
                  Lease Start Date
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
      </div>
    );
  }
}
export default withStyles(regularFormsStyle)(LeaseForm);
