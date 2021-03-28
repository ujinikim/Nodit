import React, { useState } from "react";
import NaviBar from "./NaviBar";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function expandNote(id) {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        if(index !== id) noteItem.isShow = false;
        else if(index === id) noteItem.isExpanded = true;
        return noteItem;
      });
    });
  }

  function unexpandNote(id) {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        noteItem.isShow = true;
        if(index === id) noteItem.isExpanded = false;
        return noteItem;
      });
    });
  }

  return (
    <div>
      <NaviBar />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
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
      })}
    </div>
  );
}

export default App;
