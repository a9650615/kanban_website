import React from "react";
import { Grommet } from "grommet";
import grommet from "grommet/themes";
import styled from "styled-components";

const Page = styled("div")`
  width: 100%;
  height: 100%;
  min-height: calc(100vh);
  line-height: 1.5;
  font-family: ${props => props.theme.fonts.main};
  min-width: 500px;
  background: ${props => props.background || "inhert"};
`;

const Wrapper = props => (
  <Grommet theme={grommet}>
    <Page {...props} />
  </Grommet>
);

Page.Body = styled("div")`
  margin: 0 auto;
  padding: 1em 1em;
  max-width: 50em;
  background: ${props => props.background || "inhert"};
`;

Page.Container = styled.div`
  max-width: 50em;
  margin-left: auto;
  margin-right: auto;
`;

Page.FullContainer = styled(Page.Container)`
  min-height: calc(90vh - 100px);
  padding: 30px;
`;

Page.VerticalCenter = styled.div`
  display: flex;
  align-items: center;
`;

export default Page;
export { Wrapper };
