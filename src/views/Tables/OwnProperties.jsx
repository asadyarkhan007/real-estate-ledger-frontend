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
import { NavLink } from "react-router-dom";

import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import axios from "axios";
import { APIURL } from "../../constants/AppConstants.js";
import { getCurrentUser } from "../../helpers/AuthHelper.jsx";
import { ContractModuleFactory } from "web3-eth-contract";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class OwnPropertiesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  prepareData(result) {
    let data = result.map(val => {
      return {
        city: val.property.city,
        street: val.property.street,
        propertyType: val.property.propertyType,
        propertyArea: val.property.areaSqYards,
        propertyKind: val.property.kind,
        managingOrg: val.property.managingOrg,
        propertyNo: val.property.propertyNo,
        actions: (
          <div className="actions-right">
            <NavLink to={`/user/mutated-property-detail/${val.property.id}`}>
              Detail
            </NavLink>
          </div>
        )
      };
    });
    this.setState({ data: data });
  }

  loadData() {
    const user = getCurrentUser();
    window.App.getMutatedPropertiesForUserByNic(user.nic + "").then(val => {
      console.log(val);
      this.prepareData(val);
    });
  }

  componentDidMount() {
    this.loadData();
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
              <h4 className={classes.cardIconTitle}>Own Properties</h4>
            </CardHeader>
            <CardBody>
              {this.state.data.length > 0 && (
                <ReactTable
                  data={this.state.data}
                  filterable
                  columns={[
                    {
                      Header: "Property Type",
                      accessor: "propertyType"
                    },
                    {
                      Header: "Property Number",
                      accessor: "propertyNo"
                    },
                    {
                      Header: "Property Kind",
                      accessor: "propertyKind"
                    },
                    {
                      Header: "Property Area",
                      accessor: "propertyArea"
                    },
                    {
                      Header: "City",
                      accessor: "city"
                    },
                    {
                      Header: "Street",
                      accessor: "street"
                    },                
                    {
                      Header: "Managing Org",
                      accessor: "managingOrg"
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

export default withStyles(styles)(OwnPropertiesTable);
