import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// eslint-disable-next-line no-unused-vars
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import axios from "axios";
import { APIURL } from "../../constants/AppConstants.js";
import {
  checkUserLogin,
  USER_TYPE,
  loggedInUserType
} from "../../helpers/AuthHelper";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getHouseName(data) {
    let name = "";
    if (data.apartment) {
      name = `${data.apartment.name}, ${data.building.name}`;
    } else if (data.banglow) {
      name = `${data.banglow.name}`;
    } else if (data.building) {
      name = `${data.building.name}`;
    }
    return name;
  }

  getNoOfRooms(data) {
    let name = "";
    if (data.apartment) {
      name = `${data.apartment.no_of_rooms}`;
    } else if (data.banglow) {
      name = `${data.banglow.no_of_rooms}`;
    }
    return name;
  }

  getLink = id => {
    if (checkUserLogin()) {
      if (loggedInUserType() === USER_TYPE.ADMIN) {
        return `/admin/property-form/${id}`;
      } else if (loggedInUserType() === USER_TYPE.REGISTRAR) {
        return `/registrar/property/${id}`;
      } else if (loggedInUserType() === USER_TYPE.USER) {
        return `/user/property/${id}`;
      }
    } else {
      return `/visitor/property-form/${id}`;
    }
  };

  prepareData(result) {
    let data = result.data.map((prop, key) => {
      return {
        id: prop.id,
        propertyType: prop.propertyType.name,
        managingOrg: prop.managingOrg.name,
        plot: `${prop.plot.id}, ${prop.plot.address.street}, ${
          prop.plot.address.area
        }, ${prop.plot.address.city}`,
        house: prop.name,
        plotArea: prop.plot.area_in_sq_yards,
        propertyKind: prop.propertyKind.name,
        actions: (
          <div className="actions-right">
            <a href={this.getLink(prop.id)} className={"edit"}>
              More Details
            </a>
          </div>
        )
      };
    });
    this.setState({ data: data });
  }

  componentDidMount() {
    // this.prepareData(this.getData());
    axios
      .get(`${APIURL}/property`)
      .then(response => {
        console.log(response.data);
        // this.setState({ data: response.data });
        this.prepareData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Property List</h4>
            </CardHeader>
            <CardBody>
              {this.state.data.length > 0 && (
                <ReactTable
                  data={this.state.data}
                  filterable
                  columns={[
                    {
                      Header: "ID",
                      accessor: "id"
                    },
                    {
                      Header: "Property Type",
                      accessor: "propertyType"
                    },
                    {
                      Header: "Managing Org",
                      accessor: "managingOrg"
                    },
                    {
                      Header: "Address",
                      accessor: "plot"
                    },
                    {
                      Header: "Property No",
                      accessor: "house"
                    },
                    {
                      Header: "Property Area",
                      accessor: "plotArea"
                    },
                    {
                      Header: "Property Kind",
                      accessor: "propertyKind"
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Dashboard);
