import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";
import Link from "../Link";
import Page from "../Page";
import Bar from "./Bar";
import TypeButton from "./TypeButton";

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

class TopBar extends React.Component {
  static propTypes = {
    isLogin: PropTypes.bool,
    page: PropTypes.string,
    onCreate: PropTypes.func,
    onChangeType: PropTypes.func,
  };

  static defaultProps = {
    isLogin: false,
    page: "",
    onCreate: null,
    onChangeType: () => {},
  };

  state = {
    selectedPage: 0,
  };

  changeSelectPage = page => {
    this.setState({
      selectedPage: page,
    });
    this.props.onChangeType(page);
  };

  render() {
    const { isLogin, page } = this.props;
    const { selectedPage } = this.state;
    return (
      <Bar {...this.props}>
        <Page.Container>
          <Box direction="row" align="center" justify="between">
            <Box direction="row" align="center" justify="start">
              {isLogin && (
                <>
                  <Link href="/Home" noNeedA>
                    <Bar.Button>
                      <Bar.KanbanIcon />
                      <Text style={{ marginRight: 19 }}>所有看板</Text>
                    </Bar.Button>
                  </Link>
                  <Bar.VerticalLine />
                  <Bar.Button onClick={this.props.onCreate}>
                    <Bar.AddTaskBtn>
                      <Bar.PlusIcon />
                    </Bar.AddTaskBtn>
                    <Text
                      style={{ marginRight: 19, color: "rgba(48, 80, 141, 1)" }}
                    >
                      {page === "Home" && "添加看板"}
                      {page === "Board" && "添加卡片"}
                    </Text>
                  </Bar.Button>
                </>
              )}
            </Box>
            <div>
              <TypeButton
                text="看板"
                page={0}
                selected={selectedPage === 0}
                onClick={this.changeSelectPage}
              />
              <TypeButton
                text="成員"
                page={1}
                selected={selectedPage === 1}
                onClick={this.changeSelectPage}
              />
              <TypeButton
                text="設定"
                page={2}
                selected={selectedPage === 2}
                onClick={this.changeSelectPage}
              />
            </div>
            {isLogin && <UserInfo userName="111" />}
            {!isLogin && (
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
  }
}

export { Bar };
export default TopBar;
