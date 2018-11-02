import styled from "styled-components";
import KanbansSvg from "../../static/Kanbans";
import PlusSvg from "../../static/PlusSolid";

const Bar = styled.div`
  position: relative;
  width: 100%;
  top: 0px;
  left: 0px;
  padding: 25px 0;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px 0.1px;
`;

Bar.KanbanIcon = styled(KanbansSvg)`
  width: 24px;
  height: auto;
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

Bar.VerticalLine = styled.div`
  width: 0px;
  height: 10px;
  border: none;
  border-left: 1px solid #ccc;
`;

Bar.AddTaskBtn = styled.button`
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
  &:hover{
    box-shadow: rgba(70, 131, 248, 0.5) 0px 2px 7px 0.1px;
  }
`;

export default Bar;
