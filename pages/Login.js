import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { FormField, TextInput, Button, Anchor } from "grommet";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import { H1 } from "../components/Headers";
import User from "../utils/user";
import Cookie from "../utils/cookie";

class Login extends React.Component {
  state = {
    acc: "",
    ps: "",
    name: "",
    error: null,
  };

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  sendData = () => {
    User.login(this.state)
      .then(({ data }) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          localStorage.setItem("userId", data.id);
          Cookie.writeCookie("userId", data.id);
          localStorage.setItem("userName", data.name);
          Cookie.writeCookie("userName", data.name);
          Router.push("/");
        }
        return data;
      })
      // eslint-disable-next-line lodash/prefer-noop
      .catch(() => {});
  };

  render() {
    return (
      <Wrapper {...this.props}>
        <Head>
          <title>登入</title>
        </Head>
        <TopBar />
        <Page.Body>
          <H1>歡迎，請先登入</H1>
          <p>請在此登入您的帳號以開始您的看板管理</p>
          <FormField label="帳號" htmlFor="acc">
            <TextInput id="acc" onChange={this.onChange} />
          </FormField>
          <FormField label="密碼" htmlFor="ps">
            <TextInput id="ps" onChange={this.onChange} />
          </FormField>
          <p style={{ color: "red" }}>{this.state.error}</p>
          <Button label="登入" onClick={this.sendData} />
          <Link href="/Register">
            <Anchor label="沒有帳號，先註冊" />
          </Link>
        </Page.Body>
      </Wrapper>
    );
  }
}

export default withSSR()(Login);
