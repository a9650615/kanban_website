import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormField, TextInput, Button, Text, Box } from "grommet";
import { Add } from "grommet-icons";
import styled from "styled-components";

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

export default class NewCard extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
  };
  static defaultProps = {
    onAdd: () => {},
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
    await Api.post("/api/cards", {
      kanbanId: this.props.laneId,
      name: cardData.title,
      content: cardData.content,
      type: cardData.type,
      color: cardData.color,
    });
    this.props.onAdd({
      ...cardData,
      cardColor: colors.colors[cardData.color],
      typeColor: colors.status[cardData.type].color,
      status: colors.status[cardData.type].text,
    });
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
        <Button hoverIndicator="light-1" onClick={this.onSubmit}>
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>新增</Text>
          </Box>
        </Button>
      </CustomCard>
    );
  }
}
