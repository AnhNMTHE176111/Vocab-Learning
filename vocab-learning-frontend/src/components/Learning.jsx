import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Learning = () => {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [currnetMinute, setCurrnetMinute] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(second);
  const [wordPerSecond, setWordPerSecond] = useState(0);
  const [countSecond, setCountSecond] = useState(1);

  const [hidden, setHidden] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabs, setVocabs] = useState([]);
  const [indexCard, setIndexCard] = useState(0);

  const [isActive, setIsActive] = useState(false);

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
  }, []);

  function resetTimer() {
    setHidden(false);
    setIsActive(false);
  }

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

  const handleStart = () => {
    setHidden(true);
    setCountSecond(1);
    setWordPerSecond((minute * 60 + second) / (vocabs.length * 2));
    setCurrentSecond(second);
    setCurrnetMinute(minute);
    setIsActive(true);
  };

  useEffect(() => {
    let intervalID;
    console.log(parseInt((wordPerSecond * 7) / 10));
    console.log('countSeconds: ' + countSecond);
    console.log('wordPerSecond: ' + wordPerSecond);

    if (isActive) {
      intervalID = setInterval(() => {
        if (countSecond == parseInt((wordPerSecond * 7) / 10)) {
          handleFlip();
        }
        if (countSecond == parseInt(wordPerSecond)) {
          handleNext();
          setCountSecond(1);
        }
        if (currentSecond == 0) {
          if (currnetMinute == 0) {
            resetTimer();
          } else {
            setCurrnetMinute((prev) => prev - 1);
            setCurrentSecond(59);
          }
        } else {
          setCurrentSecond((prev) => prev - 1);
        }
        setCountSecond((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalID);
  }, [isActive, currentSecond, currnetMinute, wordPerSecond, countSecond]);

  return (
    <div
      className="col-12 d-flex justify-content-center"
      style={{ minHeight: "80vh" }}>
      <div className="col-10 d-flex flex-column">
        <h1 className="text-center">Learning Vocabulary</h1>
        <div className="col-12">
          <h3 className="col-2 ml-5">Setting Time: </h3>
          <div className="col-4 d-flex ml-5">
            <div className="col-4">
              <label htmlFor="">Minute: </label>
              <input
                type="number"
                className="form-control"
                value={minute}
                onChange={(e) => setMinute(parseInt(e.target.value))}
                max={60}
                min={0}
              />
            </div>
            <div className="col-4">
              <label htmlFor="">Second: </label>
              <input
                type="number"
                className="form-control"
                value={second}
                onChange={(e) => setSecond(parseInt(e.target.value))}
                max={60}
                min={0}
              />
            </div>
            <div className="col-4 mt-4 p-2 d-flex">
              <button
                className="btn btn-warning mx-2"
                onClick={() => handleStart()}>
                Start
              </button>
              <button className="btn btn-danger" onClick={() => resetTimer()}>
                Stop
              </button>
            </div>
          </div>

          <div className="col-12 d-flex mt-5">
            <div className="col-8">
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
              {!hidden && (
                <div className="col-12 d-flex justify-content-center my-2">
                  <button
                    className="btn btn-success mx-3"
                    onClick={() => handlePrevious()}>
                    {"<"}
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleNext()}>
                    {">"}
                  </button>
                </div>
              )}
            </div>

            <div className="col-4">
              <h3>Countdown:</h3>
              <div
                className="col-5 rounded-circle p-5"
                style={{ border: "1px solid black" }}>
                <h3 className="text-center">
                  {currnetMinute} : {currentSecond}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
