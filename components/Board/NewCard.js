import React, { Component } from "react";
import { FormField, TextInput, Button, Text, Box } from "grommet";
import { Add } from "grommet-icons";
import styled from "styled-components";

import { CardWrapper } from "../Cards/Card";

const CustomCard = styled(CardWrapper)`
  margin: auto;
`;

export default class NewCard extends Component {
  onTitleChange = () => {};

  render() {
    return (
      <CustomCard>
        <FormField label="標題">
          <TextInput placeholder="請輸入標題" />
        </FormField>
        <FormField label="內容">
          <TextInput placeholder="請輸入內容" />
        </FormField>
        <Button hoverIndicator="light-1">
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>新增</Text>
          </Box>
        </Button>
      </CustomCard>
    );
  }
}
