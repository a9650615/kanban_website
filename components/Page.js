import React from "react";
import { Grommet } from "grommet";
import grommet from "grommet/themes";
import styled from "styled-components";

const Page = styled("div")`
  width: 100%;
  height: 100%;
  line-height: 1.5;
  font-family: ${props => props.theme.fonts.main};
  min-width: 500px;
`;

const Wrapper = props => (
  <Grommet theme={grommet}>
    <Page {...props} />
  </Grommet>
);

Page.Body = styled("div")`
  margin: 0 auto;
  padding: 4em 1em;
  max-width: 50em;
`;

Page.Container = styled.div`
  max-width: 50em;
  margin-left: auto;
  margin-right: auto;
`;

export default Wrapper;
export { Page };
