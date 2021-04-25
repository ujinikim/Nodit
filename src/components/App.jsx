import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //Route to different pages
import axios from "axios";
import NaviBar from "./NaviBar";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    console.log(notes);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function expandNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem, index) => {
        if (index !== id) noteItem.isShow = false;
        else if (index === id) noteItem.isExpanded = true;
        return noteItem;
      });
    });
  }

  function unexpandNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem, index) => {
        noteItem.isShow = true;
        if (index === id) noteItem.isExpanded = false;
        return noteItem;
      });
    });
  }

  function componentDidMount() {
    axios.get("http://localhost:5000/notes/").then((response) => {
      setNotes({ notes: response.data }).catch((error) => {
        console.log(error);
      });
    });
  }

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/notes/");
    console.log(response);
    setNotes(response.data);
    console.log(notes);
  }

  function notesList() {
    return notes.map((noteItem, index) => {
      return (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          isShow={noteItem.isShow}
          isExpanded={noteItem.isExpanded}
          onDelete={deleteNote}
          onExpand={expandNote}
          onUnexpand={unexpandNote}
        />
      );
    })
  }

  return (
    <div>
      <NaviBar />
      <CreateArea onAdd={addNote} />
      <button onClick={fetchData}></button>
      {notesList()}
      <Router></Router>
    </div>
  );
}

export default App;
