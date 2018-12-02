import React from "react";
import Head from "next/head";
import Board from "react-trello";
import styled from "styled-components";

import { withSSR } from "./_ssr";

import Page, { Wrapper } from "../components/Page";
import { H1 } from "../components/Headers";
import TopBar from "../components/TopBar";

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
const LaneHeader = props => (
  <div style={{ margin: "25px 25px 0px 25px", fontSize: 20, fontWeight: 500 }}>
    {props.title}
  </div>
);
const StyledBoard = styled(Board)`
  .smooth-dnd-container.horizontal > .smooth-dnd-draggable-wrapper {
    background: #fff;
    min-height: 555px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px;
    border-radius: 10px;
    margin-right: 50px;
    min-width: 340px;
    position: relative;
  }
  .smooth-dnd-container.horizontal {
    max-width: 50em;
    margin-left: auto;
    margin-right: auto;
  }
  .smooth-dnd-container.horizontal > .smooth-dnd-draggable-wrapper > section {
    height: 100%;
  }
  .smooth-dnd-container.vertical {
    padding: 0px 0px 200px 0px;
    min-height: 200px;
    padding: 0px 20px 20px 20px;
  }
`;
const CardWrapper = styled("div")`
  background: #fff;
  padding: 20px;
  border: 0.1px solid #dddddd;
  border-top: 2px solid ${props => props.cardColor || "#dddddd"};
  width: 300px;
  min-height: 100px;
  margin-top: 20px;
  position: relative;
`;
const CustomCard = props => (
  <CardWrapper {...props}>
    <header
      style={{
        paddingBottom: 6,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // color: props.cardColor,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold" }}>{props.title}</div>
      <div
        style={{
          fontSize: 15,
          color: props.typeColor,
          borderRight: `3px solid ${props.typeColor}`,
          position: "absolute",
          right: "0",
          paddingRight: 10,
        }}
      >
        {props.status}
      </div>
    </header>
    <div style={{ fontSize: 14 }}>
      <div style={{ padding: "5px 0px" }}>
        <div>{props.body}</div>
      </div>
    </div>
  </CardWrapper>
);

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
