import React from "react";
import styled from "styled-components";
import Board from "react-trello";

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

export { LaneHeader, StyledBoard, CustomCard };
