import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faExpand } from "@fortawesome/free-solid-svg-icons";

function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleExpand() {
    props.onExpand(props.id);
  }

  function handleUnexpand() {
    props.onUnexpand(props.id);
  }

  if(!props.isShow)
    return null;

  return (
    <div className= {"note " + (props.isExpanded ? "bigger-note" : "")}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
      <button onClick={handleExpand}><FontAwesomeIcon icon={faExpand} /></button>
      <button onClick={handleUnexpand}><FontAwesomeIcon icon={faUndo} /></button>
    </div>
  );
}

export default Note;
