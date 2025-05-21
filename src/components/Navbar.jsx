import { useState } from "react";

export default function Navbar() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");

  const fetchApi = async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(username);
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {data.map((repo) => (
        <div className="container mt-5" key={repo.id}>
          <ul>
            <li>{repo.name}</li>
          </ul>
        </div>
      ))}
    </>
  );
}
