import React, { useState , useEffect} from "react";
import "./Modal.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Modal() {

  const [modal, setModal] = useState(false);
  const [listName, setListName] = useState("")
  const [autor, setAutor] = useState("")
  const [playlistsUser,setPlaylistsUser] = useState({});
  

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const playlistsUser = {listName}
    axios.post(`http://localhost:5000/playlistsUser`, playlistsUser)
        .then((response) =>{
            navigate.push('/');
        });
    toggleModal();
}


  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Criar playlist
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>De um nome para sua playlist</h2>

            <input type="text" onChange={(e) => setListName(e.target.value)} id="listName" placeholder="Digite o nome da sua playlist" ></input>

            <button type ="submit" className="save-modal" onClick={handleSubmit}>
              Salvar
            </button>
            <button className="close-modal" onClick={toggleModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    
    </>
  );
}