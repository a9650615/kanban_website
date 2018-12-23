import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TypeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypeButtonWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const TypeButtonLine = styled.div`
  border-bottom: #4683f8 4px solid;
  width: 100%;
`;

const TypeButtonText = styled.div`
  padding: 20px;
`;

const TypeButton = ({ text = "", selected = false, onClick, page }) => (
  <TypeButtonWrapper onClick={() => onClick(page)}>
    <TypeButtonContainer>
      <TypeButtonText>{text}</TypeButtonText>
      {selected && <TypeButtonLine />}
    </TypeButtonContainer>
  </TypeButtonWrapper>
);

TypeButton.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  page: PropTypes.number,
};

TypeButton.defaultProps = {
  selected: false,
  onClick: () => {},
  page: 0,
};

export default TypeButton;
