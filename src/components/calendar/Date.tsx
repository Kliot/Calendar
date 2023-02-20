import styled from "styled-components";

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  date?: any;
}

const StyledDate = styled.div`
  position: relative;
  height: 100px;
  padding-bottom: 40px;
  border: 1px solid;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

const Date: React.FC<Props> = ({ onClick, isActive = false, children }) => {
  return (
    <div onClick={!isActive ? onClick : undefined}>
      <StyledDate>{children}</StyledDate>
    </div>
  );
};

export default Date;
