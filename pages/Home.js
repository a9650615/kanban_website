import React from "react";
import Head from "next/head";
import { Button } from "grommet";

import { withSSR } from "./_ssr";

import Wrapper, { Page } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";

const HomeScreen = props => (
  <Wrapper {...props}>
    <Head>
      <title>所有專案</title>
    </Head>
    <TopBar />
    <Page.Body>
      <H1>Hi there!</H1>
      <p>Hey, checkout the comments section: 中文測試</p>
      <Button primary label="Submit" />
    </Page.Body>
  </Wrapper>
);

export default withSSR()(HomeScreen);
