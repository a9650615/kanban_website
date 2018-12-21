import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { TextInput, FormField } from "grommet";

export default class HomeCreator extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    // eslint-disable-next-line lodash/prefer-noop
    onChange: () => {},
  };

  state = {
    name: "",
  };

  onChange = e => {
    this.setState({
      name: e.target.value,
    });
    this.props.onChange(e.target.value);
  };

  render() {
    const { name } = this.state;
    return (
      <FormField label="看板名稱">
        <TextInput value={name} onChange={this.onChange} />
      </FormField>
    );
  }
}
