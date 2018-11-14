import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";
import Link from "../Link";
import Page from "../Page";
import Bar from "./Bar";

const UserInfo = ({ userName = "" }) => (
  <Page.VerticalCenter>
    <Bar.UserIcon />
    <Text size="small" style={{ marginRight: 19 }}>
      {userName}
    </Text>
  </Page.VerticalCenter>
);

UserInfo.propTypes = {
  userName: PropTypes.string,
};

UserInfo.defaultProps = {
  userName: "",
};

const TopBar = props => (
  <Bar {...props}>
    <Page.Container>
      <Box direction="row" align="center" justify="between">
        <Box direction="row" align="center" justify="start">
          <Link href="/Home" noNeedA>
            <Bar.Button>
              <Bar.KanbanIcon />
              <Text style={{ marginRight: 19 }}>所有看板</Text>
            </Bar.Button>
          </Link>
          <Bar.VerticalLine />
          <Bar.Button>
            <Bar.AddTaskBtn>
              <Bar.PlusIcon />
            </Bar.AddTaskBtn>
            <Text style={{ marginRight: 19, color: "rgba(48, 80, 141, 1)" }}>
              添加卡片
            </Text>
          </Bar.Button>
        </Box>
        <div>1</div>
        <Link href="/Login">
          <UserInfo userName="111" />
        </Link>
      </Box>
    </Page.Container>
  </Bar>
);

export { Bar };
export default TopBar;
