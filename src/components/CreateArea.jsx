import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faPlus, faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function CreateArea(props) {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true);
    event.preventDefault();
  };

  const [note, setNote] = useState({
    title: "",
    content: "",
    isExpanded: false,
    isShow: true,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleClear(event) {
    setNote({
      title: "",
      content: "",
      isExpanded: false,
      isShow: true,
    });
    event.preventDefault();
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      isExpanded: false,
      isShow: true,
    });
    console.log(note);
    event.preventDefault();

    axios.post('http://localhost:5000/notes/add', note)
    .then(res => console.log(res.data));
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title..."
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Note..."
          rows="5"
        />

        <button onClick={submitNote}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button onClick={handleShow}>
          <FontAwesomeIcon icon={faBroom} />
        </button>
        <h1>
          <FontAwesomeIcon icon={faCoffee} />
        </h1>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            Are you sure you want to clear your current note?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{ backgroundColor: "#f5ba13" }}
              onClick={(event) => {
                handleClose(event);
                handleClear(event);
              }}
            >
              Clear
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}

export default CreateArea;
