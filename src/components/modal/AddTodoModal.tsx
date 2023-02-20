import { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import labelsList from "../../mocks/labelsList";
import { IEventsContext } from "../../types/types";
import { EventsContext } from "../../contexts/EventsContext";

interface AddTodoModalProps {
  date: string;
}

const AddTodoModal = ({ date }: AddTodoModalProps) => {
  const { events, setEvents } = useContext<IEventsContext>(EventsContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [todo, setTodo] = useState({
    id: "",
    name: "",
    label: labelsList[0],
    date: date,
    isFiltered: false,
    position: 0,
  });

  const handleAddFolder = () => {
    if (!!todo.name) {
      const id: string = uuid();

      const currentDateEvents =
        !!events &&
        events.length !== 0 &&
        events.filter((item) => item.date === date);

      const lastPosition =
        !!currentDateEvents &&
        currentDateEvents.length !== 0 &&
        currentDateEvents.reduce((prev, current) =>
          +prev.position > +current.position ? prev : current
        ).position;

      setTodo({
        id: id,
        name: todo.name,
        label: todo.label,
        date: date,
        isFiltered: false,
        position: !!lastPosition ? lastPosition + 1 : 1,
      });
      setEvents([
        ...events,
        {
          id: id,
          name: todo.name,
          label: todo.label,
          date: date,
          isFiltered: false,
          position: !!lastPosition ? lastPosition + 1 : 1,
        },
      ]);
    }
    setTodo({
      id: "",
      name: "",
      label: labelsList[0],
      date: date,
      isFiltered: false,
      position: 0,
    });

    handleClose();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent
  ) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon className="calendarAddIcon" fontSize="small" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="event"
            name="name"
            label="Event"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <Select
            value={todo.label}
            onChange={handleChange}
            label="Label"
            name="label"
          >
            {labelsList &&
              labelsList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddFolder}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTodoModal;
