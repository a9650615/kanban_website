import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: column wrap;
`;

const CardWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  display: block;
  width: 221px;
  min-height: 115px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 6px 0.1px;
  border-radius: 10px;
  padding: 19px 30px;
`;

export { CardContainer, CardWrapper };
