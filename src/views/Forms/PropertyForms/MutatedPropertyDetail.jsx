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
import Home from "@material-ui/icons/Home";
import Assignment from "@material-ui/icons/Assignment";

import Axios from "axios";
import { APIURL } from "../../../constants/AppConstants";
import withStyles from "@material-ui/core/styles/withStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class MutatedPropertyDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {},
      deed: {},
      data: [],
      soldAmount: null
    };
  }

  loadData = () => {
    const { id } = this.props.match.params;

    window.App.getPropertyDetail(+id).then(val => {
      console.log(val);
      this.setState({
        property: val
      });
    });

    window.App.getMutationAndSaleAndSignDeedByPropertyId(+id).then(res => {
      this.setState({
        data: res
      });
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { classes } = this.props;
    const { data, property } = this.state;
    return (
      <div>
        {property && (
          <div>
            <GridContainer>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <Home />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>Property Detail</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Country
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.country}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      City
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.city}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Street
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.street}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Type
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.propertyType}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} md={4} sm={4}>
                      {"Property No"}
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      {property.propertyNo}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Kind
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.kind}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Managing Org
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.managingOrg}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={4} sm={4}>
                      Area in Sq Yards
                    </GridItem>
                    <GridItem md={4} sm={4}>
                      {property.areaSqYards}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </div>
        )}
        {data.length > 0 &&
          data.map((val, key) => (
            <div>
              <GridContainer>
                <Card>
                  <CardHeader color="primary" icon>
                    <CardIcon color="primary">
                      <Assignment />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                      Transfer History {data.length + 1 - (key + 1)}
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        New Owner Name
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.buyerFullName}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        New Owner Nic
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.buyerNic}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Old Owner Name
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.sellerFullName}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Old Owner Nic
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.sellerNic}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Mutated By Name
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.mutation.mutatedByFullName}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Mutated By NIC
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.mutation.mutatedByNic}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Sold Amount
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.deed.soldAmount}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem md={4} sm={4}>
                        Mutated On
                      </GridItem>
                      <GridItem md={4} sm={4}>
                        {val.mutation.mutatedOn}
                      </GridItem>
                    </GridContainer>

                    {val.leasedPropertyList.length > 0 &&
                      val.leasedPropertyList.map((value, key) => (
                        <div>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              <h4>
                                Lease Detail{" - "}
                                {val.leasedPropertyList.length + 1 - (key + 1)}
                              </h4>
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {""}
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              Lease Start Date
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {new Date(
                                value.leaseStartDate
                              ).toLocaleDateString("en-US")}
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              Lease End Date
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {new Date(value.leaseEndDate).toLocaleDateString(
                                "en-US"
                              )}
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              Leasing Amount
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {value.leasedAmount}
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              Tax Per Year
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {value.taxAmountPerYear}
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              Lease to Name
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {val.mutation.newOwnerFullName}
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem md={4} sm={4}>
                              Lease to Nic
                            </GridItem>
                            <GridItem md={4} sm={4}>
                              {value.leasedToNic}
                            </GridItem>
                          </GridContainer>
                        </div>
                      ))}
                  </CardBody>
                </Card>
              </GridContainer>
            </div>
          ))}
      </div>
    );
  }
}
export default withStyles(styles)(MutatedPropertyDetailComponent);
