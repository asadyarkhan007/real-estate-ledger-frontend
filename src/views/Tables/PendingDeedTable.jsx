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

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class PendingDeedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  prepareData(result) {
    console.log(result);
    let data = result.map(val => {
      return {
        buyerFullName: val.buyerFullName,
        buyerNic: val.buyerNic,
        sellerFullName: val.sellerFullName,
        sellerNic: val.sellerNic,
        soldAmount: val.soldAmount,
        stampPaperAmount: val.stampPaperAmount,
        pendingAs: val.pendingAs,
        actions: (
          <div className="actions-right">
            <NavLink to={`deed/${val.signDeed.id}`}>Detail</NavLink>
          </div>
        )
      };
    });
    this.setState({ data: data });
  }

  loadData() {
    const user = getCurrentUser();
    // setTimeout(() => {
    //   window.App.getPendingSignatureListByNic(user.nic + "").then(result => {
    //     this.prepareData(result);
    //   });
    // }, 2000);
    window.App.getPendingSignatureListByNic(user.nic + "").then(result => {
      this.prepareData(result);
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
              <h4 className={classes.cardIconTitle}>Pending Deed</h4>
            </CardHeader>
            <CardBody>
              {this.state.data.length > 0 && (
                <ReactTable
                  data={this.state.data}
                  filterable
                  columns={[
                    {
                      Header: "Buyer Full Name",
                      accessor: "buyerFullName"
                    },
                    {
                      Header: "Buyer NIc",
                      accessor: "buyerNic"
                    },
                    {
                      Header: "Seller Full Name",
                      accessor: "sellerFullName"
                    },
                    {
                      Header: "Sold Amount",
                      accessor: "soldAmount"
                    },
                    {
                      Header: "Stamp paper",
                      accessor: "stampPaperAmount"
                    },
                    {
                      Header: "Pending As",
                      accessor: "pendingAs"
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

export default withStyles(styles)(PendingDeedTable);
