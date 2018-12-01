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
          {props.isLogin && (
            <>
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
                <Text
                  style={{ marginRight: 19, color: "rgba(48, 80, 141, 1)" }}
                >
                  添加卡片
                </Text>
              </Bar.Button>
            </>
          )}
        </Box>
        <div>1</div>
        {props.isLogin && <UserInfo userName="111" />}
        {!props.isLogin && (
          <Link href="/Login" noNeedA>
            <Bar.Button>
              <Text>請先登入</Text>
            </Bar.Button>
          </Link>
        )}
      </Box>
    </Page.Container>
  </Bar>
);

TopBar.propTypes = {
  isLogin: PropTypes.bool,
};

TopBar.defaultProps = {
  isLogin: false,
};

export { Bar };
export default TopBar;
