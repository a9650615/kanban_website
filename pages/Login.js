import React from "react";
import Head from "next/head";
import { FormField, TextInput, Button } from "grommet";

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
      <H1>歡迎</H1>
      <p>請在此登入您的帳號以開始您的看板管理</p>
      <FormField label="帳號" htmlFor="account">
        <TextInput id="account" />
      </FormField>
      <FormField label="密碼" htmlFor="password">
        <TextInput id="password" />
      </FormField>
      <Button label="登入" />
    </Page.Body>
  </Wrapper>
);

export default withSSR()(HomeScreen);
