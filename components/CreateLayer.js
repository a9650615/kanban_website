/* eslint-disable lodash/prefer-noop */
import React from "react";
import { Box, Layer, Button, Heading } from "grommet";
import { Close } from "grommet-icons";
import PropTypes from "prop-types";

class CreateLayer extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func,
    finish: PropTypes.func,
    delete: PropTypes.func,
    children: PropTypes.element,
  };

  static defaultProps = {
    open: false,
    close: () => {},
    submit: () => {},
    finish: () => {},
    delete: () => {},
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
                  {this.props.title || "添加"}
                </Heading>
                <Button icon={<Close />} onClick={this.onClose} />
              </Box>
              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                {this.props.children}
              </Box>
              <Box flex={false} as="footer" align="start">
                <Box direction="row">
                  {this.props.editId && (
                    <>
                      <Button
                        primary
                        type="button"
                        label="完成"
                        color="blue-1"
                        onClick={() => this.props.finish(this.props.editId)}
                      />
                      <Button
                        primary
                        type="button"
                        label="刪除"
                        style={{ background: "red" }}
                        onClick={() => this.props.delete(this.props.editId)}
                      />
                    </>
                  )}
                  {!this.props.editId && (
                    <Button
                      type="submit"
                      label="送出"
                      onClick={this.onSubmit}
                      primary
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

export default CreateLayer;
