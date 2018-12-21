import React from "react";
import { Box, Layer, Button, Heading } from "grommet";
import { Close } from "grommet-icons";
import PropTypes from "prop-types";

class CreateLayer extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    children: PropTypes.element,
  };

  static defaultProps = {
    open: false,
    // eslint-disable-next-line lodash/prefer-noop
    close: () => {},
    // eslint-disable-next-line lodash/prefer-noop
    submit: () => {},
    children: <></>,
  };

  onClose = () => {
    this.props.close();
  };

  onSubmit = () => {
    this.props.submit();
  };

  render() {
    return (
      <Box fill align="center" justify="center">
        {this.props.open && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={this.onClose}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={2} margin="none">
                  添加
                </Heading>
                <Button icon={<Close />} onClick={this.onClose} />
              </Box>
              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                {this.props.children}
              </Box>
              <Box flex={false} as="footer" align="start">
                <Button
                  type="submit"
                  label="Submit"
                  onClick={this.onSubmit}
                  primary
                />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

export default CreateLayer;
