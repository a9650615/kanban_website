import React from "react";
import Head from "next/head";
import Api from "../utils/api-client";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";
import Cards from "../components/Cards";
import CreateLayer from "../components/CreateLayer";
import Creator from "../components/Home/Creator";

let boardName = "";

class HomeScreen extends React.Component {
  state = {
    isLogin: false,
    isCreating: false,
    boards: [],
    sharedBoard: [],
  };

  componentDidMount = () => {
    if (localStorage.getItem("userId")) {
      this.setState({ isLogin: true });
      this.getMyBoardList();
    }
  };

  getMyBoardList = async () => {
    const userId = localStorage.getItem("userId");
    const { data } = await Api.get(`/api/user/${userId}/board`);
    const myBoard = [];
    const sharedBoard = [];
    data.forEach(({ board }) => {
      if ((board.owner || "").toString() === userId) {
        myBoard.push(board);
      } else {
        sharedBoard.push(board);
      }
    });
    // console.log(myBoard, sharedBoard);
    // const userBoard = data.filter(boards => boards.board.owner !== userId);
    this.setState({
      boards: myBoard,
      sharedBoard,
    });
  };

  updateBoardList = async data => {
    boardName = data;
  };

  createBoard = async () => {
    const { data } = await Api.post(`/api/board/`, {
      name: boardName,
    });
    const newArr = this.state.boards.slice();
    newArr.push(data);
    this.setState({
      boards: newArr,
    });
    this.hiddenCreate();
  };

  showCreate = () => {
    boardName = "";
    this.setState({ isCreating: true });
  };

  hiddenCreate = () => {
    this.setState({ isCreating: false });
  };

  render() {
    const { boards, sharedBoard } = this.state;
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
        <CreateLayer
          open={this.state.isCreating}
          close={this.hiddenCreate}
          submit={this.createBoard}
        >
          <Creator onChange={this.updateBoardList} />
        </CreateLayer>
        <Page.Body>
          <H1>我的看板</H1>
          <Cards projects={boards} />
          <H1>與我共享</H1>
          <Cards projects={sharedBoard} />
        </Page.Body>
      </Wrapper>
    );
  }
}

export default withSSR()(HomeScreen);
