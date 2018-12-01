import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FormField, TextInput, Button, Anchor } from "grommet";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import { H1 } from "../components/Headers";

const Login = props => (
  <Wrapper {...props}>
    <Head>
      <title>登入</title>
    </Head>
    <TopBar />
    <Page.Body>
      <H1>歡迎，請先登入</H1>
      <p>請在此登入您的帳號以開始您的看板管理</p>
      <FormField label="帳號" htmlFor="account">
        <TextInput id="account" />
      </FormField>
      <FormField label="密碼" htmlFor="password">
        <TextInput id="password" />
      </FormField>
      <Button label="登入" />
      <Link href="/Register">
        <Anchor label="沒有帳號，先註冊" />
      </Link>
    </Page.Body>
  </Wrapper>
);

export default withSSR()(Login);
