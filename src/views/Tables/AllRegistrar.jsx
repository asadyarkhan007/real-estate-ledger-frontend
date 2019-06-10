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

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class AllRegistrar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  prepareData(result) {
    const filterData = result.data.filter(val => {
      return val.managing_org && val.user_type === 2;
    });
    console.log(filterData);
    let data = filterData.map(val => {
      return {
        id: val.id,
        username: val.username,
        email: val.email,
        org: val.managingOrg.name,
        actions: (
          <div className="actions-right">
            <a href={`/admin/registrar/${val.id}`} className={"edit"}>
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
      .get(`${APIURL}/users`)
      .then(response => {
        console.log(response.data.data);
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
              <h4 className={classes.cardIconTitle}>Registrar List</h4>
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
                      Header: "User Name",
                      accessor: "username"
                    },
                    {
                      Header: "Email Address",
                      accessor: "email"
                    },
                    {
                      Header: "Organization",
                      accessor: "org"
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

export default withStyles(styles)(AllRegistrar);
