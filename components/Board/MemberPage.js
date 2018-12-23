import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import Api from "../../utils/api-client";
import Page from "../Page";
import Content from "./Content";
import UserList from "../Board/UserList";

class MemberPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    value: null,
    users: [],
    userList: [],
  };

  componentDidMount = () => {
    this.getUserListInBoard();
    this.getUserList();
  };

  getUserListInBoard = async () => {
    const { data } = await Api.get(`/api/board/user/${this.props.id}`);
    this.setState({
      users: data,
    });
  };

  getUserList = async () => {
    const { data } = await Api.get("/api/user/");
    const user = data.map(userInfo => ({
      label: `${userInfo.acc} ( ${userInfo.name} )`,
      value: userInfo.ID,
    }));
    this.setState({
      userList: user,
    });
  };

  addUser = async userId => {
    await Api.post(`/api/board/user/${this.props.id}`, {
      userId,
    });
    this.getUserListInBoard();
  };

  handleChange = value => {
    if (value.value) this.addUser(value.value);
    // this.setState({ value });
  };

  handleRemove = async userId => {
    await Api.delete(`/api/board/user/${this.props.id}/${userId}`);
    this.getUserListInBoard();
  };

  render() {
    const { value, userList, users } = this.state;
    return (
      <Page.FullContainer>
        <Content>
          <Select
            value={value}
            onChange={this.handleChange}
            options={userList}
            placeholder="輸入使用者ID"
          />
          <div>
            {users.map(data => (
              <UserList
                key={data.ID}
                userId={data.user.ID}
                userName={`${data.user.name} ( ${data.user.acc} )`}
                onRemove={this.handleRemove}
              />
            ))}
          </div>
        </Content>
      </Page.FullContainer>
    );
  }
}

export default MemberPage;
