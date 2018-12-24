import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { FormField, TextInput, Button, Text, Box } from "grommet";
import { Add } from "grommet-icons";
import styled from "styled-components";
import { GithubPicker } from "react-color";

import Api from "../../utils/api-client";
import { CardWrapper } from "../Cards/Card";
import colors from "../../static/KanbanColors";

const CustomCard = styled(CardWrapper)`
  margin: auto;
`;

const cardData = {
  title: "",
  creator: 0,
  content: "",
  type: 0,
  color: 0,
};

const status = colors.status.map((data, index) => ({
  value: index,
  label: data.text,
}));

export default class NewCard extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
  };
  static defaultProps = {
    onAdd: () => {},
  };

  state = {
    color: colors.colors[0],
  };

  componentDidMount = () => {
    cardData.creator = localStorage.getItem("userId");
  };

  onTitleChange = e => {
    cardData.title = e.target.value;
  };

  onContentChange = e => {
    cardData.content = e.target.value;
  };

  onSubmit = async () => {
    const data = await Api.post("/api/cards", {
      kanbanId: this.props.laneId,
      name: cardData.title,
      content: cardData.content,
      type: cardData.type,
      color: cardData.color,
    });
    console.log(data.data);
    this.props.onAdd({
      ...data.data,
      ...cardData,
      cardColor: colors.colors[cardData.color],
      typeColor: colors.status[cardData.type].color,
      status: colors.status[cardData.type].text,
    });
  };

  onChangeColor = color => {
    const index = colors.colors.indexOf(color.hex);
    cardData.color = index;
    this.setState({
      color: colors.colors[cardData.color],
    });
  };

  onChangeType = type => {
    cardData.type = type.value;
  };

  render() {
    return (
      <CustomCard>
        <FormField label="標題">
          <TextInput placeholder="請輸入標題" onChange={this.onTitleChange} />
        </FormField>
        <FormField label="內容">
          <TextInput placeholder="請輸入內容" onChange={this.onContentChange} />
        </FormField>
        <Select
          placeholder="類型"
          defaultValue={0}
          onChange={this.onChangeType}
          options={status}
        />
        顏色:{" "}
        <div style={{ width: 40, height: 40, background: this.state.color }} />
        <GithubPicker
          colors={colors.colors}
          onChangeComplete={this.onChangeColor}
        />
        <Button hoverIndicator="light-1" onClick={this.onSubmit}>
          <Box pad="small" direction="row" align="center" gap="small">
            {/* <Add /> */}
            <Text>新增</Text>
          </Box>
        </Button>
        <Button hoverIndicator="light-1" onClick={this.props.onCancel}>
          <Box pad="small" direction="row" align="center" gap="small">
            <Text>取消</Text>
          </Box>
        </Button>
      </CustomCard>
    );
  }
}
