import React from "react";
import Head from "next/head";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";
import Cards from "../components/Cards";

const HomeScreen = props => (
  <Wrapper {...props}>
    <Head>
      <title>所有專案</title>
    </Head>
    <TopBar />
    <Page.Body>
      <H1>我的看板</H1>
      <Cards
        projects={[
          {
            title: "www",
          },
          {
            title: "ttt",
          },
        ]}
      />
      <H1>與我共享</H1>
    </Page.Body>
  </Wrapper>
);

export default withSSR()(HomeScreen);
