import React from "react";
import { Heading, Text } from "grommet";
import Router from "next/router";

import { withSSR } from "./_ssr";
import TopBar from "../components/TopBar";
import Page, { Wrapper } from "../components/Page";

// eslint-disable-next-line react/prefer-stateless-function
class IndexPage extends React.Component {
  componentDidMount() {
    if (window.localStorage.getItem("userId")) {
      Router.replace("/Home");
    }
  }

  render() {
    return (
      <Wrapper {...this.props} background="rgb(214, 229, 255)">
        <TopBar />
        <div style={{ background: "#fff" }}>
          <Page.Body>
            <Heading level={2} size="large">
              方便高效的管理你的專案看板
            </Heading>
            <Text>利用視覺化的方式管理你的看板</Text>
          </Page.Body>
        </div>
      </Wrapper>
    );
  }
}

export default withSSR()(IndexPage);
