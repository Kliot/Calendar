import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { IEventsContext, IEvents } from "../../types/types";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { EventsContext } from "../../contexts/EventsContext";

interface IProps {
  events?: IEvents[];
  onFilteredSuccess: (success: boolean) => void;
}

const StyledSearch = styled.div`
  padding: 0 10px 40px;

  .searchInputs {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const Search: React.FC<IProps> = ({ onFilteredSuccess }) => {
  const { events, setEvents } = useContext<IEventsContext>(EventsContext);
  const [showAdditionalSearch, setAdditionalSearch] = useState(false);
  const [wordEntered, setWordEntered] = useState("");

  const handleClick = () => {
    setAdditionalSearch((prev) => !prev);
    clearInput();
  };

  const [filteredData, setFilteredData] = useState<IEvents[]>([]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;

    setWordEntered(searchWord);

    const newFilterByName = () =>
      events.map((item) => {
        return item.name.toLowerCase().includes(searchWord.toLowerCase())
          ? { ...item, isFiltered: true }
          : { ...item, isFiltered: false };
      });

    const newFilterByLabel = () =>
      events.map((item) => {
        return item.label.toLowerCase().includes(searchWord.toLowerCase())
          ? { ...item, isFiltered: true }
          : { ...item, isFiltered: false };
      });

    const newFilter = !showAdditionalSearch
      ? newFilterByName()
      : newFilterByLabel();

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    const oldEvents = events.map((item) => {
      return { ...item, isFiltered: false };
    });
    setEvents([...oldEvents]);
    setFilteredData([]);
    setWordEntered("");
    onFilteredSuccess(false);
  };

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData, events]);

  const submitHandler = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    setEvents([...filteredData]);
    onFilteredSuccess(true);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitHandler(e);
    }
  };
  return (
    <StyledSearch>
      <div className="searchInputs">
        <TextField
          value={wordEntered}
          autoFocus
          margin="dense"
          id="event"
          name="search"
          label="Search"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleFilter}
          onKeyDown={onKeyDownHandler}
        />
        <div className="searchIcon">
          <CloseIcon id="clearBtn" onClick={clearInput} />
        </div>
        <div className="searchBtn">
          <SearchIcon id="searchBtn" onClick={submitHandler} />
        </div>
      </div>
      <input
        type="checkbox"
        checked={showAdditionalSearch}
        onChange={handleClick}
      />
      <label>Additional Search (by labels)</label>
    </StyledSearch>
  );
};
export default Search;
