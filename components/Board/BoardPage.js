import React from "react";
import PropTypes from "prop-types";

import Page from "../Page";
import { H1 } from "../Headers";
import NewCard from "./NewCard";
import { StyledBoard, LaneHeader, CustomCard } from "../TaskCard";

const BoardPage = ({ board = [] }) => (
  <>
    <Page.Container>
      <H1>所有看板</H1>
    </Page.Container>
    <StyledBoard
      data={{
        lanes: board,
      }}
      customCardLayout
      draggable
      editable
      onCardAdd={this.addCard}
      customLaneHeader={<LaneHeader />}
      newCardTemplate={<NewCard />}
      style={{
        background: "#F1F2F3",
        height: "calc(100vh - 130px)",
        overflowY: "auto",
      }}
      // className="boardContainer"
    >
      <CustomCard />
    </StyledBoard>
  </>
);

BoardPage.propTypes = {
  board: PropTypes.array,
};

BoardPage.defaultProps = {
  board: [],
};

export default BoardPage;
