import { useState, useContext } from "react";
import styled from "styled-components";
import { EventsContext } from "../../contexts/EventsContext";
import { EventsType, IEvents, IEventsContext } from "../../types/types";
import Board from "./Board";

interface Props {
  currentEvents: IEvents[];
  filtered: boolean;
  formatDate: string;
}

const eventsypeColorMap = {
  [EventsType.Work]: "#166671",
  [EventsType.Daily]: "#DC8007",
  [EventsType.Birthday]: "#EBF7FA",
};

const StyledEvents = styled.div<{ level: EventsType; isFiltered: boolean }>`
  margin: 2px 0;
  background-color: ${(props) => eventsypeColorMap[props.level]} !important;
  visibility: ${(props) => (props.isFiltered ? "visible" : "hidden")};
`;

const EventsWrapper: React.FC<Props> = ({
  currentEvents,
  filtered,
  formatDate,
}) => {
  const { events, setEvents } = useContext<IEventsContext>(EventsContext);
  const [currentCard, setCurrentCard] = useState<IEvents>({
    id: "",
    name: "",
    label: "",
    date: "",
    isFiltered: false,
    position: 0,
  });

  const dragStartHandler = (e: any, card: any) => {
    setCurrentCard(card);
  };

  const dragLeaveHandler = (e: any) => {};

  const dragEndHandler = (e: any) => {
    e.target.style.background = "white";
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    e.target.style.background = "lightgray";
  };

  const dragDropHandler = (e: any, card: any) => {
    e.preventDefault();
    const changesCardList = !!currentCard
      ? events.map((item) => {
          if (item.id === card.id) {
            return {
              ...item,
              position: currentCard.position,
              date: currentCard.date,
            };
          }
          if (item.id === currentCard.id) {
            return {
              ...item,
              position: card.position,
              date: card.date,
            };
          }
          return item;
        })
      : card;

    console.log(changesCardList);
    setEvents([...changesCardList]);
    e.target.style.background = "white";
  };

  const sortCard = (a: IEvents, b: IEvents) => {
    return a.position > b.position ? -1 : 1;
  };

  return (
    <Board id={formatDate} className="board">
      {currentEvents &&
        [...currentEvents].sort(sortCard).map((item, index) => (
          <div
            id={`card-${formatDate}-${index}`}
            key={item.id}
            onDragStart={(e) => dragStartHandler(e, item)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e, item)}
            draggable={true}
            className="card"
          >
            {
              <StyledEvents
                level={item.label as EventsType}
                isFiltered={
                  filtered ? !!item.isFiltered && item.isFiltered : true
                }
              >
                {item.name}
              </StyledEvents>
            }
          </div>
        ))}
    </Board>
  );
};

export default EventsWrapper;
