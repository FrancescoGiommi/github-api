import { useState } from "react";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");

  const fetchApi = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      setData(data.items);
      console.log(data.items);
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
      {/* Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex" onSubmit={handleSubmit} role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            <select
              className="form-select ms-3"
              aria-label="Default select example"
            >
              <option defaultValue>Select a Repositories/User</option>
              <option value="Repositories">Repositories</option>
              <option value="User">User</option>
            </select>
          </form>
        </div>
      </nav>

      <div className="container mt-5 d-flex flex-wrap justify-content-around">
        <div className="card mb-3 row">
          {data.map((repo) => (
            <div className="card col-3" key={repo.id}>
              <img
                src={repo.owner.avatar_url}
                alt={`Avatar di ${repo.owner.login}`}
                className="img-fluid rounded-circle mb-2"
                style={{ width: "50px", height: "50px" }}
              />
              <h2 className="card-title">{repo.name}</h2>
              <p className="card-text">{repo.description}</p>
              <p className="card-text">
                <strong>Language: </strong>
                {repo.language}
              </p>
              <p className="card-text">
                <strong>
                  <i className="fa-solid fa-star"></i>{" "}
                </strong>
                {repo.stargazers_count}
              </p>
              <p className="card-text">Forks: {repo.forks_count}</p>
              <p>Visibilità: {repo.private ? "Privata" : "Pubblica"}</p>
              <a href={repo.html_url} className="btn btn-primary">
                Vai al repository
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
