import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  flex: 0;
  display: block;
  min-width: 221px;
  min-height: 115px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 6px 0.1px;
  border-radius: 10px;
  padding: 19px 30px;
  margin-right: 40px;
`;

export { CardContainer, CardWrapper };
