import { useState, useContext } from "react";
import styled from "styled-components";
import { EventsContext } from "../../contexts/EventsContext";
import { EventsType, IEvents, IEventsContext } from "../../types/types";

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
  background-color: ${(props) => eventsypeColorMap[props.level]};
  visibility: ${(props) => (props.isFiltered ? "visible" : "hidden")};
`;

const EventsWrapper: React.FC<Props> = ({
  currentEvents,
  filtered,
  formatDate,
}) => {
  const { events, setEvents } = useContext<IEventsContext>(EventsContext);
  //console.log(events);
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
    console.log(card);
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
    // if (!!currentCard) {
    //   events.map((item) => {
    //     if (item.id === card.id) {
    //       setEvents([
    //         ...events,
    //         {
    //           ...item,
    //           position: Number(currentCard.position),
    //         },
    //       ]);
    //       return {
    //         ...item,
    //         position: currentCard.position,
    //       };
    //     }
    //     if (item.id === currentCard.id) {
    //       setEvents([...events, { ...item, position: card.position }]);
    //       return {
    //         ...item,
    //         position: card.position,
    //       };
    //     }
    //     return item;
    //   });
    // }
    // return card;
    const changesCardList = !!currentCard
      ? events.map((item) => {
          if (item.id === card.id) {
            // list.isUpdateChangeablePosition &&
            //   dispatch(
            //     updateNotice({
            //       ...item,
            //       position: Number(currentCard.position),
            //     })
            //   );
            return {
              ...item,
              position: currentCard.position,
            };
          }
          if (item.id === currentCard.id) {
            // list.isUpdateChangeablePosition &&
            //   dispatch(updateNotice({ ...item, position: card.position }));
            return {
              ...item,
              position: card.position,
            };
          }
          return item;
        })
      : card;

    console.log(currentCard);

    //setNoteList(changesCardList);
    setEvents([...changesCardList]);
    e.target.style.background = "white";
  };
  return (
    <>
      {currentEvents &&
        currentEvents.map((item) => (
          <div
            key={item.name}
            onDragStart={(e) => dragStartHandler(e, item)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e, item)}
            draggable={true}
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
    </>
  );
};

export default EventsWrapper;
