import React from "react";
import Head from "next/head";
import "react-trello";
import "styled-components";
import { TextInput, FormField } from "grommet";
import PropTypes from "prop-types";

import { withSSR } from "./_ssr";

import { H1 } from "../components/Headers";
import Api from "../utils/api-client";
import { Wrapper } from "../components/Page";
import TopBar from "../components/TopBar";
import CreateLayer from "../components/CreateLayer";
import BoardPage from "../components/Board/BoardPage";
import MemberPage from "../components/Board/MemberPage";
import SettingPage from "../components/Board/SettingPage";

import colors from "../static/KanbanColors";

let boardName = null;

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
    openDetail: false,
    detail: {},
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
      id: val.ID.toString(),
      cards: val.cards.filter(data => data.status === 0).map(card => ({
        ...card,
        id: card.ID.toString(),
        status: colors.status[card.type].text,
        typeColor: colors.status[card.type].color,
        cardColor: colors.colors[card.color],
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

  changeType = type => {
    this.setState({
      type,
    });
  };

  handleAddBoard = async () => {
    await Api.post("/api/kanban/", {
      name: boardName,
      boardId: this.props.id,
    });
    this.hiddenCreate();
    this.getUserData();
  };

  handleBoardChange = async (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails,
  ) => {
    await Api.put(`/api/cards/${cardId}/kanban`, {
      to: targetLaneId,
    });
  };

  handleAllDataChange = async (oldPosition, newPosition) => {
    // console.log(laneId, newPosition);

    const lane = this.state.board.slice();
    const nowLane = Object.assign({}, lane[oldPosition]);
    lane.splice(oldPosition, 1);
    lane.splice(newPosition, 0, nowLane);
    // const oldIndex = lane.findIndex(arr => arr.id == laneId);
    this.setState({
      board: lane,
    });
    const updateList = lane.map((data, index) => ({
      id: data.ID,
      sort: index,
    }));
    const data = {
      updateData: {
        id: nowLane.id,
      },
      updateList,
    };
    await Api.put("/api/kanban/sort", data);

    // new
  };

  handleCardClick = async (cardId, metadata, laneId) => {
    // console.log(cardId, metadata, laneId);
    const card = await Api.get(`/api/cards/${cardId}`);
    this.setState({
      openDetail: true,
      detail: card.data,
    });
  };

  hiddenDetail = () => {
    this.setState({
      openDetail: false,
    });
  };

  handleDeleteCard = async cardId => {
    await Api.delete(`/api/cards/${cardId}/${this.props.id}`);
    this.getUserData();
    this.hiddenDetail();
  };

  handleFinishCard = async cardId => {
    await Api.put(`/api/cards/${cardId}/finish`, {
      boardId: this.props.id,
    });
    this.getUserData();
    this.hiddenDetail();
  };

  render() {
    const { board, type, detail } = this.state;
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
        <CreateLayer
          title={detail.title}
          open={this.state.openDetail}
          close={this.hiddenDetail}
          editId={detail.ID}
          delete={this.handleDeleteCard}
          finish={this.handleFinishCard}
        >
          <>
            <div
              style={{
                height: 4,
                marginBottom: 20,
                background:
                  detail.type > -1 ? colors.status[detail.type].color : "",
              }}
            />
            <div>{detail.content}</div>
          </>
        </CreateLayer>
        <CreateLayer
          open={this.state.isCreating}
          submit={this.handleAddBoard}
          close={this.hiddenCreate}
        >
          <>
            <FormField label="版面名稱">
              <TextInput
                onChange={e => {
                  boardName = e.target.value;
                }}
              />
            </FormField>
          </>
        </CreateLayer>
        <div style={{ background: "#F1F2F3" }}>
          {type === 0 && (
            <BoardPage
              id={this.props.id}
              board={board}
              laneChange={this.handleAllDataChange}
              onDataChange={this.handleBoardChange}
              onCardClick={this.handleCardClick}
            />
          )}
          {type === 1 && <MemberPage id={this.props.id} />}
          {type === 2 && <SettingPage id={this.props.id} />}
        </div>
      </Wrapper>
    );
  }
}

export default withSSR()(HomeScreen);
