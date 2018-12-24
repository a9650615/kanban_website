import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Page from "../Page";
import { H1 } from "../Headers";
import NewCard from "./NewCard";
import { StyledBoard, LaneHeader, CustomCard } from "../TaskCard";

const AddCard = styled.a`
  color: #333;
  cursor: pointer;
  margin: 10px 20px;
`;

const BoardPage = ({
  board = [],
  onDataChange = () => {},
  laneChange = () => {},
  onCardClick = () => {},
}) => (
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
      laneDraggable
      onCardAdd={this.addCard}
      customLaneHeader={<LaneHeader />}
      newCardTemplate={<NewCard />}
      addCardLink={<AddCard>添加卡片</AddCard>}
      handleDragEnd={onDataChange}
      handleLaneDragEnd={laneChange}
      onCardClick={onCardClick}
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
  onDataChange: PropTypes.func,
};

BoardPage.defaultProps = {
  board: [],
  onDataChange: () => {},
};

export default BoardPage;
