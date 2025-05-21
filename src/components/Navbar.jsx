import { useRef } from "react";

import HomePage from "../pages/Homepage";

export default function Navbar() {
  const inputRef = useRef();

  const fetchApi = async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value.trim();
    if (inputValue) {
      fetchApi(inputValue);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex" onSubmit={handleSubmit} role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={inputRef}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container">
        <HomePage />
      </div>
    </>
  );
}
