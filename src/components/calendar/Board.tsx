import React from "react";
import styled from "styled-components";

interface Props extends React.PropsWithChildren {
  id: string;
  className: string;
}

const StyledBoard = styled.div`
  height: 100%;
`;

const Board: React.FC<Props> = ({ id, children, className }) => {
  return (
    <StyledBoard>
      <div id={id} className={className}>
        {children}
      </div>
    </StyledBoard>
  );
};

export default Board;
