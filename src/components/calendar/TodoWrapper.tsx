import React from "react";
import styled from "styled-components";

import AddTodoModal from "../modal/AddTodoModal";

interface Props {
  date: string;
}

const StyledTodoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  padding: 5px 0;
`;

const TodoWrapper: React.FC<Props> = ({ date }) => {
  return (
    <StyledTodoWrapper>
      <AddTodoModal date={date} />
    </StyledTodoWrapper>
  );
};

export default TodoWrapper;
