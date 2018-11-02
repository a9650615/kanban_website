import React from "react";
import { Box, Grid, Text } from "grommet";
import { Page } from "../Page";
import Bar from "./Bar";

const TopBar = props => (
  <Bar {...props}>
    <Page.Container>
      <Box direction="columns" align="center" justify="start">
        <Bar.KanbanIcon />
        <Text style={{ marginRight: 19 }}>所有看板</Text>
        <Bar.VerticalLine />
        <Bar.AddTaskBtn>
          <Bar.PlusIcon />
        </Bar.AddTaskBtn>
        <Text style={{ marginRight: 19, color: "rgba(48, 80, 141, 1)" }}>
          添加卡片
        </Text>
      </Box>
    </Page.Container>
  </Bar>
);

export { Bar };
export default TopBar;
