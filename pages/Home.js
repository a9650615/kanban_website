import React from "react";
import Head from "next/head";
import { TextInput, FormField } from "grommet";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";
import Cards from "../components/Cards";
import CreateLayer from "../components/CreateLayer";

class HomeScreen extends React.Component {
  state = {
    isLogin: false,
    isCreating: false,
  };

  componentDidMount = () => {
    if (localStorage.getItem("userId")) {
      this.setState({ isLogin: true });
    }
  };

  showCreate = () => {
    this.setState({ isCreating: true });
  };

  hiddenCreate = () => {
    this.setState({ isCreating: false });
  };

  render() {
    return (
      <Wrapper {...this.props}>
        <Head>
          <title>所有專案</title>
        </Head>
        <TopBar
          isLogin={this.state.isLogin}
          page="Home"
          onCreate={this.showCreate}
        />
        <CreateLayer open={this.state.isCreating} close={this.hiddenCreate}>
          <>
            <FormField label="看板名稱">
              <TextInput />
            </FormField>
          </>
        </CreateLayer>
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
  }
}

export default withSSR()(HomeScreen);
