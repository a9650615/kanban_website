import React from "react";
import Head from "next/head";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import { H1 } from "../components/Headers";

const HomeScreen = props => (
  <Wrapper {...props}>
    <Head>
      <title>所有專案</title>
    </Head>
    <TopBar />
    <Page.Body>
      <H1>Hi there!</H1>
      <p>Hey, checkout the comments section: 中文測試</p>
    </Page.Body>
  </Wrapper>
);

export default withSSR()(HomeScreen);
