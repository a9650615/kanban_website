import React, { Component } from "react";
import Select from "react-select";

import Page from "../Page";
import Content from "./Content";

class MemberPage extends Component {
  state = {
    value: null,
    options: [{ value: "chocolate", label: "Chocolate" }],
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, options } = this.state;
    return (
      <Page.FullContainer>
        <Content>
          <Select
            value={value}
            onChange={this.handleChange}
            options={options}
            placeholder="輸入使用者ID"
          />
        </Content>
      </Page.FullContainer>
    );
  }
}

export default MemberPage;
