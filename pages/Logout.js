import React from "react";
import Router from "next/router";
import { withSSR } from "./_ssr";

import { Wrapper } from "../components/Page";

class Logout extends React.Component {
  componentDidMount = () => {
    this.clearData();
    Router.push("/");
  };

  clearData = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  };

  render() {
    return <Wrapper {...this.props} />;
  }
}

export default withSSR()(Logout);
