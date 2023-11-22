import { useEffect, useState } from "react";
import React from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [folders, setFolders] = useState([]);
  const [vocabs, setVocabs] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/folder")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        return result.allFolder;
      })
      .then((result) => {
        console.log(result);
        setFolders(result);
      })
      .catch((err) => {});

      fetch("http://localhost:4000/api/vocabulary")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setVocabs(result.vocab);
      })
  }, [isChange]);

  async function handleAddNewFolder() {
    if (name.length > 0) {
      let folderDup = folders.filter(
        (folder) => folder.name.toLowerCase() == name.toLowerCase()
      );
      if (folderDup.length > 0) {
        alert("Duplicate folder");
      } else {
        const newFolder = {
          name: name,
        };
        const response = await fetch("http://localhost:4000/api/folder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFolder),
        });
        setName("");
        setIsChange(!isChange);
      }
    } else {
      alert("Name Folder is required");
    }
  }

  async function handleDeleteFolder(event, id) {
    event.stopPropagation();
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      await fetch(`http://localhost:4000/api/folder/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsChange(!isChange);
    }
  }

  return (
    <div
      className="col-12 d-flex justify-content-center"
      style={{ minHeight: "80vh" }}>
      {/* <div className="col-12">
            <img src="./images/banner.png" style={{objectFit: 'cover', width: '100%', height: '20%'}} alt="" />
        </div> */}
      <div className="col-8">
        <h1 className="text-center">Choose the Folder</h1>

        <div className="d-flex p-2">
          <div className="col-5">
            <label htmlFor="nameFolder">New Name Folder: </label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                id="nameFolder"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <div className="col-5">
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleAddNewFolder()}>
                  Add Folder
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 d-flex flex-wrap">
          {folders.map((folder, index) => {
            let number = vocabs.filter(v => v.folder.toLowerCase() == folder.name.toLowerCase()).length;
            return (
              <div
                key={index}
                className="col-3 px-4 py-5 bg-primary m-5 rounded-lg position-relative"
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => navigate(`/folder/${folder.name}`)}>
                <div className="my-2 col-12 d-flex justify-content-end position-absolute fixed-top">
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => handleDeleteFolder(e, folder._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <h2>Folder: {folder.name}</h2>
                <p>{number} vocabs</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
