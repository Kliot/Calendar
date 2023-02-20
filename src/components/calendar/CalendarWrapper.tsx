import React, { useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import Calendar from "./Calendar";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Country } from "../../types/types";

interface IProps {
  countries?: Country[];
}

const StyledCalendarWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 20px auto;
  font-size: 1rem;
`;

const CalendarWrapper: React.FC<IProps> = ({ countries }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [country, setCountry] = useState<Country>({
    countryCode: "AD",
    name: "Andorra",
  });

  const changeCountry = (event: SelectChangeEvent) => {
    setCountry({
      ...country,
      countryCode: event.target.value,
    });
  };

  const handleDownloadImage = async () => {
    const element: HTMLElement | null = document.getElementById(
        "print"
      ) as HTMLElement,
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-calendar.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="print">
      <StyledCalendarWrapper>
        <Select value={country.countryCode} onChange={changeCountry}>
          {countries &&
            countries.map((item) => (
              <MenuItem key={item.countryCode} value={item.countryCode}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
        <Calendar
          currentDate={currentDate}
          onChange={setCurrentDate}
          country={country.countryCode}
        ></Calendar>
        <Button onClick={handleDownloadImage}>Download as image</Button>
      </StyledCalendarWrapper>
    </div>
  );
};

export default CalendarWrapper;
