import React from "react";
import Head from "next/head";
import Router from "next/router";
import { FormField, TextInput, Button } from "grommet";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import { H1 } from "../components/Headers";
import User from "../utils/user";

class Register extends React.Component {
  state = {
    acc: "",
    ps: "",
    name: "",
  };

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  sendData = () => {
    User.register(this.state)
      .then(({data}) => {
        localStorage.setItem("userId", data.id);
        Router.push("/");
        return data;
      })
      // eslint-disable-next-line lodash/prefer-noop
      .catch(() => {});
  };

  render() {
    return (
      <Wrapper {...this.props}>
        <Head>
          <title>註冊</title>
        </Head>
        <TopBar />
        <Page.Body>
          <H1>您好，請開始註冊</H1>
          <p>請在此註冊您的帳號以開始使用所有功能</p>
          <FormField label="帳號" htmlFor="acc">
            <TextInput
              id="acc"
              onChange={this.onChange}
              value={this.state.acc}
            />
          </FormField>
          <FormField label="密碼" htmlFor="ps">
            <TextInput id="ps" onChange={this.onChange} value={this.state.ps} />
          </FormField>
          <FormField label="名稱" htmlFor="name">
            <TextInput
              id="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </FormField>
          <Button label="註冊" onClick={this.sendData} />
        </Page.Body>
      </Wrapper>
    );
  }
}

export default withSSR()(Register);
