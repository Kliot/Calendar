import styled from "styled-components";
import { Holiday, HolidayType } from "../../types/types";

interface IProps {
  holiday?: Holiday[];
}

const holidayTypeColorMap = {
  [HolidayType.Authorities]: "#166671",
  [HolidayType.Bank]: "#DC8007",
  [HolidayType.Observance]: "#EBF7FA",
  [HolidayType.Optional]: "#FF8B7C",
  [HolidayType.Public]: "#87BD40",
  [HolidayType.School]: "#E8C934",
};

const StyledHoliday = styled.div<{ level: HolidayType }>`
  color: ${(props) => holidayTypeColorMap[props.level]};
  border: 1px solid ${({ theme }): string => theme.coral};
`;

const HolidayWrapper: React.FC<IProps> = ({ holiday }) => {
  return (
    <>
      {holiday &&
        holiday.map((item) => (
          <div key={item.name}>
            <StyledHoliday level={HolidayType[item.types[0]]}>
              {item.name}
            </StyledHoliday>
          </div>
        ))}
    </>
  );
};

export default HolidayWrapper;
