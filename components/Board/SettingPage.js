import React, { Component } from "react";
import styled from "styled-components";
import { TextInput } from "grommet";
import Router from "next/router";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";

import Api from "../../utils/api-client";
import Page from "../Page";
import Content from "./Content";
import { H1 } from "../Headers";

const DeleteButton = styled.button`
  background-color: #eb6464;
  color: #fff;
  box-shadow: 0px 3px 6px 0.1px rgba(0, 0, 0, 0.16);
  padding: 15px 40px;
  border: none;
  outline: none;
  margin-top: 10px;
  &:hover {
    background: red;
  }
`;

const EditButton = styled.button`
  background-color: #6da2e8;
  color: #fff;
  box-shadow: 0px 3px 6px 0.1px rgba(0, 0, 0, 0.16);
  padding: 15px 40px;
  border: none;
  outline: none;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  cursor: pointer;
  &:hover {
    background: #adbedb;
  }
`;

let hostName = "";

class SettingPage extends Component {
  state = {
    url: "",
    boardName: "",
    history: [],
    graph: [],
  };

  componentDidMount = () => {
    hostName = window.location.href.split("/");
    hostName = `${hostName[0]}//${hostName[2]}`;
    this.setState({
      url: hostName,
    });
    this.getBoardInfo();
    this.getHistory();
    this.getGraph();
  };

  getHistory = async () => {
    const { data } = await Api.get(`/api/history/board/${this.props.id}`);
    this.setState({
      history: data,
    });
  };

  getBoardInfo = async () => {
    const { data } = await Api.get(`/api/board/id/${this.props.id}`);
    this.setState({
      boardName: data.name,
    });
  };

  changeBoardName = e => {
    this.setState({
      boardName: e.target.value,
    });
  };

  updateBoard = async () => {
    await Api.put(`/api/board/${this.props.id}`, {
      name: this.state.boardName,
    });
    alert("修改完成");
  };

  getGraph = async () => {
    const data = await Api.get(`/api/history/graph/${this.props.id}`);
    const graph = data.data.all.map(list => {
      const date = new Date(list.updated_at);
      const finishIndex = data.data.finish.findIndex(
        search => search.updated_at === list.updated_at,
      );
      // console.log(finishIndex)
      return {
        name: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
        全部: list.count,
        已完成: finishIndex !== -1 ? data.data.finish[finishIndex].count : 0,
      };
    });
    this.setState({
      graph,
    });
    // console.log(graph);
  };

  handleDeleteBoard = async () => {
    await Api.delete(`/api/board/${this.props.id}`);
    Router.push("/Home");
  };

  render() {
    const { url, boardName, history, graph } = this.state;
    return (
      <Page.FullContainer>
        <Content style={{ width: "40%", display: "inline-block" }}>
          <H1>專案名稱</H1>
          <TextInput value={boardName} onChange={this.changeBoardName} />
          <EditButton onClick={this.updateBoard}>修改名稱</EditButton>
          連結到此看板
          <TextInput value={`${url}/Board/${this.props.id}`} readOnly />
          <DeleteButton onClick={this.handleDeleteBoard}>刪除專案</DeleteButton>
        </Content>
        <Content
          style={{ width: "40%", marginLeft: "5%", display: "inline-block" }}
        >
          <H1>所有活動</H1>
          {history.map(list => (
            <div>
              {list.type !== 2 && (
                <>
                  "{list.card.title}" 卡片由 {list.from_text} 改為{" "}
                  {list.to_text}
                </>
              )}
              {list.type === 2 && (
                <>
                  "{list.card.title}" 卡片已 {list.from_text}{" "}
                </>
              )}
            </div>
          ))}
        </Content>
        <Content style={{ marginTop: 20 }}>
          <H1>報表</H1>
          <div style={{ width: "100%" }}>
            <AreaChart
              width={730}
              height={250}
              data={graph}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="全部"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="已完成"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </div>
        </Content>
      </Page.FullContainer>
    );
  }
}

export default SettingPage;
