import styled from "styled-components";
import KanbansSvg from "../../static/Kanbans";
import PlusSvg from "../../static/PlusSolid";
import UserSvg from "../../static/UserRegular";

const Bar = styled.div`
  position: relative;
  width: 100%;
  top: 0px;
  left: 0px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px 0.1px;
`;

Bar.KanbanIcon = styled(KanbansSvg)`
  width: 24px;
  height: 24px;
  margin-left: 10px;
  margin-right: 10px;
  & > path {
    fill: rgba(70, 131, 248, 1);
  }
`;

Bar.PlusIcon = styled(PlusSvg)`
  max-width: 13.8px;
  height: 15.7px;
  & > path {
    fill: rgba(255, 255, 255, 1);
  }
`;

Bar.UserIcon = styled(UserSvg)`
  max-width: 16px;
  height: 16px;
  margin-right: 16px;
  & > path {
    fill: rgba(70, 131, 248, 1);
  }
`;

Bar.VerticalLine = styled.div`
  width: 0px;
  height: 10px;
  border: none;
  border-left: 1px solid #ccc;
`;

Bar.AddTaskBtn = styled.div`
  background: rgba(70, 131, 248, 1);
  border: none;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  margin-right: 13px;
  box-shadow: rgba(70, 131, 248, 0.34) 0px 2px 4px 0.1px;
  margin-left: 19px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.3s ease-in-out;
`;

Bar.Button = styled.a`
  cursor: pointer;
  background: none;
  border: none;
  display: block;
  display: flex;
  flex-flow: column row;
  padding: 25px 0;
  &:hover {
    background-color: rgba(221, 221, 221, 0.4);
  }
  &:hover ${Bar.AddTaskBtn} {
    box-shadow: rgba(70, 131, 248, 0.6) 0px 2px 10px 0.1px;
  }
`;

export default Bar;
