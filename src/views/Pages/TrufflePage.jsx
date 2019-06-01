import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import logo from "assets/img/logo-white.svg";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import errorPageStyles from "assets/jss/material-dashboard-pro-react/views/errorPageStyles.jsx";

class TrufflePage extends React.Component {
  componentDidMount() {
    $("#mehdi").on("click", function() {
      alert("djhgdjk");
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.contentCenter}>
        <GridContainer>
          <GridItem md={12}>
            <div className={classes.contentCenter}>
              <button id={"mehdi"}>Test Button</button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

TrufflePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(errorPageStyles)(TrufflePage);
