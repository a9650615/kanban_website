import React, { Component } from "react";
import styled from "styled-components";
import { TextInput } from "grommet";

import Api from "../../utils/api-client";
import Page from "../Page";
import Content from "./Content";
import { H1 } from "../Headers";

const DeleteButton = styled.button`
  background-color: #EB6464;
  color: #fff;
  box-shadow: 0px 3px 6px .1px rgba(0, 0, 0, 0.16);
  padding: 15px 40px;
  border: none;
  outline: none;
  margin-top: 10px;
`;

class SettingPage extends Component {
  render() {
    return (
      <Page.FullContainer>
        <Content style={{ width: "40%", display: "inline-block" }}>
          <H1>專案名稱</H1>
          <TextInput />
          連結到此看板
          <TextInput />
          <DeleteButton>
            刪除專案
          </DeleteButton>
        </Content>
        <Content style={{ width: "40%", marginLeft: "5%", display: "inline-block" }}>
          <H1>所有活動</H1>
          123
        </Content>
      </Page.FullContainer>
    );
  }
}

export default SettingPage;
