import React, { useEffect, useMemo, useState } from "react";
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Date from "./Date";
import { ENDPOINT, Holiday, IEvents } from "../../types/types";
import HolidayWrapper from "./Holiday";
import TodoWrapper from "./TodoWrapper";
import { EventsContext } from "../../contexts/EventsContext";
import EventsWrapper from "./Events";
import downloadFile from "../../helpers/downloadFile";
import Search from "../search/Search";

const StyledCalendar = styled.div`
  .calendarTable {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    .calendarMonthName {
      grid-column: span 3 / span 3;
    }

    .calendarWeeks {
      padding: 15px 0;
      font-weight: 700;
    }
  }
`;

type Props = {
  currentDate: Date;
  onChange: (date: Date) => void;
  country: string;
};

const Calendar: React.FC<Props> = ({ currentDate, onChange, country }) => {
  const [events, setEvents] = useState<IEvents[]>([]);
  const [filtered, setFiltered] = useState<boolean>(false);
  const currentYear = format(currentDate, "yyyy");
  const currentMonth = currentDate.getMonth() + 1;

  const formatedCurrentMonth = useMemo(() => {
    return currentMonth < 10 ? "0" + currentMonth : currentMonth;
  }, [currentMonth]);

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${ENDPOINT}/PublicHolidays/${currentYear}/${country}`
      );
      const data = await response.json();
      setHolidays(data);
    }
    fetchData();
  }, [country, currentYear]);

  const onFilteredSuccess = (succes: boolean): void => {
    setFiltered(succes);
  };

  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => onChange(sub(currentDate, { months: 1 }));
  const nextMonth = () => onChange(add(currentDate, { months: 1 }));
  const prevYear = () => onChange(sub(currentDate, { years: 1 }));
  const nextYear = () => onChange(add(currentDate, { years: 1 }));

  const handleClickDate = (index: number) => {
    const date = setDate(currentDate, index);
    onChange(date);
  };

  const exportToJson = (e: any) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(events),
      fileName: "events.json",
      fileType: "text/json",
    });
  };

  return (
    <StyledCalendar>
      <EventsContext.Provider
        value={{
          events,
          setEvents,
        }}
      >
        <Search events={events} onFilteredSuccess={onFilteredSuccess} />
        <div className="calendarTable">
          <div onClick={prevYear}>{"<<"}</div>
          <div onClick={prevMonth}>{"<"}</div>
          <div className="calendarMonthName">
            {format(currentDate, "LLLL yyyy")}
          </div>
          <div onClick={nextMonth}>{">"}</div>
          <div onClick={nextYear}>{">>"}</div>

          {weeks.map((week, index) => (
            <div className="calendarWeeks" key={index}>
              {week}
            </div>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <Date key={index} />
          ))}

          {Array.from({ length: numDays }).map((_, index) => {
            let date = index + 1;
            const isCurrentDate = date === currentDate.getDate();
            const formatDate = `${currentYear}-${formatedCurrentMonth}-${
              date < 10 ? "0" + date : String(date)
            }`;
            const holiday =
              !!holidays && holidays.filter((item) => item.date === formatDate);

            const currentEvents =
              !!events && events.filter((item) => item.date === formatDate);

            return (
              <Date
                key={date}
                isActive={isCurrentDate}
                onClick={() => handleClickDate(date)}
                date={date}
              >
                <div className="calendarCell">
                  {date}

                  {holiday && holiday.length > 0 && (
                    <HolidayWrapper holiday={holiday} />
                  )}
                  {currentEvents && (
                    <EventsWrapper
                      currentEvents={currentEvents}
                      filtered={filtered}
                      formatDate={formatDate}
                    />
                  )}
                  <TodoWrapper date={formatDate}></TodoWrapper>
                </div>
              </Date>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => (
            <Date key={index} />
          ))}
        </div>
      </EventsContext.Provider>
      <Button type="button" onClick={exportToJson}>
        Export to JSON
      </Button>
    </StyledCalendar>
  );
};

export default Calendar;
