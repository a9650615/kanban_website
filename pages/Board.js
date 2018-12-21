import React from "react";
import Head from "next/head";
import "react-trello";
import "styled-components";
import { TextInput, FormField } from "grommet";
import PropTypes from "prop-types";

import { withSSR } from "./_ssr";

import Api from "../utils/api-client";
import Page, { Wrapper } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";
import { StyledBoard, LaneHeader, CustomCard } from "../components/TaskCard";
import CreateLayer from "../components/CreateLayer";

const status = [
  { text: "一般", color: "#81B2D6" },
  { text: "緊急", color: "#D6819B" },
];

class HomeScreen extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };

  static defaultProps = {
    id: "",
  };

  state = {
    isLogin: false,
    isCreating: false,
    board: [],
  };

  componentDidMount = () => {
    if (localStorage.getItem("userId")) {
      this.setState({ isLogin: true });
      this.getUserData();
    }
  };

  getUserData = async () => {
    const api = await Api.get(`/api/kanban/${this.props.id}`);
    const oldData = api.data.slice();
    const newData = oldData.map(val => ({
      ...val,
      id: val.id.toString(),
      cards: val.cards.map(card => ({
        ...card,
        id: card.id.toString(),
        status: status[card.type].text,
        typeColor: status[card.type].color,
        cardColor: "#9FD569",
      })),
    }));
    this.setState({
      board: newData,
    });
  };

  showCreate = () => {
    this.setState({ isCreating: true });
  };

  hiddenCreate = () => {
    this.setState({ isCreating: false });
  };

  render() {
    const { board } = this.state;
    return (
      <Wrapper {...this.props}>
        <Head>
          <title>專案看板</title>
        </Head>
        <TopBar
          isLogin={this.state.isLogin}
          page="Board"
          onCreate={this.showCreate}
        />
        <CreateLayer open={this.state.isCreating} close={this.hiddenCreate}>
          <>
            <FormField label="卡片名稱">
              <TextInput />
            </FormField>
          </>
        </CreateLayer>
        <div style={{ background: "#F1F2F3" }}>
          <Page.Container>
            <H1>所有看板</H1>
          </Page.Container>
          <StyledBoard
            data={{
              lanes: board,
            }}
            customCardLayout
            draggable
            customLaneHeader={<LaneHeader />}
            style={{
              background: "#F1F2F3",
              height: "calc(100vh - 130px)",
              overflowY: "auto",
            }}
            // className="boardContainer"
          >
            <CustomCard />
          </StyledBoard>
        </div>
      </Wrapper>
    );
  }
}

export default withSSR()(HomeScreen);
