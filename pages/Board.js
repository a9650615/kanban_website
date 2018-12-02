import React from "react";
import Head from "next/head";
import "react-trello";
import "styled-components";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";
import { StyledBoard, LaneHeader, CustomCard } from "../components/TaskCard";

const data = {
  lanes: [
    {
      id: "lane1",
      title: "預期項目",
      cards: [
        {
          id: "Card1",
          title: "準備添加項目",
          status: "一般",
          body: "準備點什麼",
          cardColor: "#BD3B36",
          typeColor: "#81B2D6",
        },
      ],
    },
    {
      id: "lane2",
      title: "進行中",
      cards: [
        {
          id: "Card2",
          title: "準備添加項目",
          status: "緊急",
          body: "準備點什麼",
          cardColor: "#9FD569",
          typeColor: "#D6819B",
        },
      ],
    },
    {
      id: "lane3",
      title: "進行中",
      cards: [
        {
          id: "Card3",
          title: "準備添加項目",
          status: "緊急",
          body: "準備點什麼",
          cardColor: "#9FD569",
          typeColor: "#D6819B",
        },
      ],
    },
    {
      id: "lane4",
      title: "進行中",
      cards: [
        {
          id: "Card4",
          title: "準備添加項目",
          status: "緊急",
          body: "準備點什麼",
          cardColor: "#9FD569",
          typeColor: "#D6819B",
        },
      ],
    },
  ],
};

class HomeScreen extends React.Component {
  state = {
    isLogin: false,
  };

  componentDidMount = () => {
    if (localStorage.getItem("userId")) {
      this.setState({ isLogin: true });
    }
  };

  render() {
    return (
      <Wrapper {...this.props}>
        <Head>
          <title>專案看板</title>
        </Head>
        <TopBar isLogin={this.state.isLogin} page="Board" />
        <div style={{ background: "#F1F2F3" }}>
          <Page.Container>
            <H1>所有看板</H1>
          </Page.Container>
          <StyledBoard
            data={data}
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
