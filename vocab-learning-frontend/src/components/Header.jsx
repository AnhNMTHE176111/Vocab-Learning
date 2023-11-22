import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/folder")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        return result.allFolder;
      })
      .then((result) => {
        setFolders(result);
      })
      .catch((err) => {});
  });

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark mb-3">
      <a className="navbar-brand" href="/">
        Vocab Learning
      </a>
      <ul className="navbar-nav mx-3">
        <li className="nav-item ">
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbardrop"
            data-toggle="dropdown">
            Your Folder
          </a>
          <div className="dropdown-menu">
            {folders.map((f) => (
              <a className="dropdown-item" href={`/folder/${f.name}`}>
                Folder: {f.name}
              </a>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
