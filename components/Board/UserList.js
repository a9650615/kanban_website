import React from "react";
import styled from "styled-components";

const UserSection = styled.div`
  margin: 10px;
  color: #8d8d8d;
  position: relative;
`;

const CloseButton = styled.div`
  background-color: #ba4444;
  right: 0px;
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 100%;
  color: #fff;
  text-align: center;
  padding: 5px;
  top: 0;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

const UserList = ({ userName, userId, onRemove = () => {} }) => (
  <UserSection>
    <div>{userName}</div>
    {userId.toString() !== localStorage.getItem("userId") && (
      <CloseButton onClick={() => onRemove(userId)}>X</CloseButton>
    )}
  </UserSection>
);

export default UserList;
