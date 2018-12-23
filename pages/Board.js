import React from "react";
import Head from "next/head";
import "react-trello";
import "styled-components";
import { TextInput, FormField } from "grommet";
import PropTypes from "prop-types";

import { withSSR } from "./_ssr";

import Api from "../utils/api-client";
import { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import CreateLayer from "../components/CreateLayer";
import BoardPage from "../components/Board/BoardPage";
import MemberPage from "../components/Board/MemberPage";

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
    type: 0,
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

  addCard = data => {
    console.log(data);
  };

  showCreate = () => {
    this.setState({ isCreating: true });
  };

  hiddenCreate = () => {
    this.setState({ isCreating: false });
  };

  changeType = type => {
    this.setState({
      type,
    });
  };

  render() {
    const { board, type } = this.state;
    return (
      <Wrapper {...this.props} style={{ background: "#F1F2F3" }}>
        <Head>
          <title>專案看板</title>
        </Head>
        <TopBar
          isLogin={this.state.isLogin}
          page="Board"
          onCreate={this.showCreate}
          onChangeType={this.changeType}
        />
        <CreateLayer open={this.state.isCreating} close={this.hiddenCreate}>
          <>
            <FormField label="卡片名稱">
              <TextInput />
            </FormField>
          </>
        </CreateLayer>
        <div style={{ background: "#F1F2F3" }}>
          {type === 0 && <BoardPage board={board} />}
          {type === 1 && <MemberPage />}
        </div>
      </Wrapper>
    );
  }
}

export default withSSR()(HomeScreen);
