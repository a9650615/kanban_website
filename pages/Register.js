import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FormField, TextInput, Button, Anchor } from "grommet";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import { H1 } from "../components/Headers";

const Register = props => (
  <Wrapper {...props}>
    <Head>
      <title>註冊</title>
    </Head>
    <TopBar />
    <Page.Body>
      <H1>您好，請開始註冊</H1>
      <p>請在此註冊您的帳號以開始使用所有功能</p>
      <FormField label="帳號" htmlFor="account">
        <TextInput id="account" />
      </FormField>
      <FormField label="密碼" htmlFor="password">
        <TextInput id="password" />
      </FormField>
      <FormField label="名稱" htmlFor="name">
        <TextInput id="name" />
      </FormField>
      <Button label="註冊" />
    </Page.Body>
  </Wrapper>
);

export default withSSR()(Register);
