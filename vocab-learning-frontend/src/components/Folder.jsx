import { useEffect, useState } from "react";
import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./FlashCard.css";

const Folder = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabs, setVocabs] = useState([]);
  const [indexCard, setIndexCard] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [newWord, setNewWord] = useState("");
  const [newWordType, setNewWordType] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newExample, setNewExample] = useState("");

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/api/vocabulary")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        let data = result.vocab.filter((v) => v.folder == param.id);
        setVocabs(data);
      })
      .catch((err) => {});
  }, [isChange]);

  const handleCreate = async () => {
    if (newWord.length > 0 && newMeaning.length > 0) {
      let checkDup = vocabs.filter(
        (v) => v.word.toLowerCase() == newWord.toLowerCase()
      );
      if (checkDup.length > 0) {
        alert("Duplicate word: " + newWord);
      } else {
        const newVocab = {
          word: newWord,
          wordType: newWordType.toLowerCase(),
          meaning: newMeaning,
          example: newExample,
          folder: param.id,
        };
        const response = await fetch("http://localhost:4000/api/vocabulary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVocab),
        });
        console.log(response);
        setNewWord("");
        setNewWordType("");
        setNewMeaning("");
        setNewExample("");
        setIsChange(!isChange);
      }
    } else {
      alert("Word and Meaning are required");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      await fetch(`http://localhost:4000/api/vocabulary/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsChange(!isChange);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (indexCard == 0) {
      setIndexCard(vocabs.length - 1);
    } else {
      setIndexCard(indexCard - 1);
    }
  };
  const handleNext = () => {
    setIsFlipped(false);
    if (indexCard == vocabs.length - 1) {
      setIndexCard(0);
    } else {
      setIndexCard(indexCard + 1);
    }
  };

  function handleChangeVocab(index, field, value) {
    const data = [...vocabs];
    vocabs[index] = {
      ...data[index],
      [field]: value,
    };
    setIsUpdate(true);
  }

  async function handleUpdateVocab(index, id) {
    if (isUpdate) {
      const updatedVocab = vocabs[index];
      await fetch(`http://localhost:4000/api/vocabulary/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVocab),
      });

      setIsChange(!isChange);
      setIsUpdate(false);
    }
  }

  return (
    <div
      className="col-12 d-flex justify-content-center"
      style={{ minHeight: "80vh" }}>
      <div className="col-8">
        <h1 className="text-center">Folder: {param.id}</h1>
        <div className="col-12 d-flex justify-content-between">
          <h1 className="col-4 ml-5 mb-4">Flash Card</h1>
          <div className="col-2 mt-2">
            <button className="btn btn-warning" onClick={() => navigate(`/folder/${param.id}/learning`)}>Start Learning</button>
          </div>
        </div>
        <div className="flashCard col-12 d-flex justify-content-center">
          <div
            className={`col-10 flashcard ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}>
            {vocabs[indexCard] ? (
              <>
                <div className="front">
                  <h2>{vocabs[indexCard].word}</h2>
                </div>
                <div className="back d-flex flex-column">
                  <h2>
                    {vocabs[indexCard].meaning}{" "}
                    {`(${vocabs[indexCard].wordType})`}
                  </h2>
                  {vocabs[indexCard].example && (
                    <h4>Ex: {vocabs[indexCard].example} </h4>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center my-2">
          <button
            className="btn btn-success mx-3"
            onClick={() => handlePrevious()}>
            {"<"}
          </button>
          <button className="btn btn-success" onClick={() => handleNext()}>
            {">"}
          </button>
        </div>
        <div className="col-12 d-flex flex-column">
          <h1 className="col-2 ml-5 mb-4">Vocabulary</h1>
          <div className="col-12 d-flex justify-content-center">
            <div className="col-10">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Word Type</th>
                    <th>Meaning</th>
                    <th>Example</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vocabs.map((v, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control-plaintext"
                            onChange={(e) =>
                              handleChangeVocab(index, "word", e.target.value)
                            }
                            placeholder={v.word}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control-plaintext"
                            onChange={(e) =>
                              handleChangeVocab(
                                index,
                                "wordType",
                                e.target.value
                              )
                            }
                            placeholder={v.wordType}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control-plaintext"
                            onChange={(e) =>
                              handleChangeVocab(
                                index,
                                "meaning",
                                e.target.value
                              )
                            }
                            placeholder={v.meaning}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control-plaintext"
                            onChange={(e) =>
                              handleChangeVocab(
                                index,
                                "example",
                                e.target.value
                              )
                            }
                            placeholder={v.example}
                          />
                        </td>
                        <td className="d-flex">
                          <button
                            className="btn btn-primary mx-1"
                            onClick={() => handleUpdateVocab(index, v._id)}>
                            Update
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(v._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="form-control-plaintext"
                        onChange={(e) => setNewWord(e.target.value)}
                        value={newWord}
                        placeholder="new word..."
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control-plaintext"
                        onChange={(e) => setNewWordType(e.target.value)}
                        value={newWordType}
                        placeholder="word type..."
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control-plaintext"
                        onChange={(e) => setNewMeaning(e.target.value)}
                        value={newMeaning}
                        placeholder="meaning..."
                        required
                      />
                    </td>
                    <td className="col-4">
                      <input
                        type="text"
                        className="form-control-plaintext"
                        onChange={(e) => setNewExample(e.target.value)}
                        value={newExample}
                        placeholder="new example..."
                        required
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleCreate()}>
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
