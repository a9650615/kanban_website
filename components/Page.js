import React from "react";
import { Grommet } from "grommet";
import grommet from "grommet/themes";
import styled from "styled-components";

const Page = styled("div")`
  width: 100%;
  height: 100%;
  line-height: 1.5;
  padding: 4em 1em;
  font-family: ${props => props.theme.fonts.main};
`;

const Wrapper = props => (
  <Grommet theme={grommet}>
    <Page {...props} />
  </Grommet>
);

Page.Body = styled("div")`
  margin: 0 auto;
  max-width: 50em;
`;

export default Wrapper;
export { Page };
