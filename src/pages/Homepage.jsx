import { useState, useEffect } from "react";

export default function Homepage() {
  // State che contiene i dati
  const [data, setData] = useState([]);

  // State per la ricerca
  const [query, setQuery] = useState("");

  // State per il tipo di ricerca
  const [searchType, setSearchType] = useState("Repositories");

  // State per tracciare l'ultimo tipo di ricerca fatto
  const [lastSearchType, setLastSearchType] = useState("");

  // Fetch per repository
  const fetchRepositories = async () => {
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

  // Fetch per utente
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${query}/repos`
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
    }
  };

  // Eseguo la fetch in base al tipo di ricerca

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastSearchType(searchType); // <-- salva il tipo della ricerca effettiva

    if (searchType === "User" && query) {
      fetchUser(query);
    } else if (searchType === "Repositories" && query) {
      fetchRepositories(query);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">GitHub API</a>
          <form className="d-flex" onSubmit={handleSubmit} role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* Bottone per la ricerca */}
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            {/* Select per il tipo di ricerca */}
            <select
              className="form-select ms-3"
              aria-label="Default select example"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="Repositories">Repositories</option>
              <option value="User">User</option>
            </select>
          </form>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row g-4">
          {data.length > 0 &&
            data.map((repo) => (
              <div
                className="col-12 col-md-4 col-sm-6 col-lg-3 text-center"
                key={repo.id}
              >
                {lastSearchType === "Repositories" ? (
                  <div className="card h-100 shadow-sm card-repo">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <img
                        src={repo.owner.avatar_url}
                        alt={`Avatar di ${repo.owner.login}`}
                        className="img-fluid rounded-circle mb-2 mx-auto avatar"
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
                      <a href={repo.html_url} className="btn btn-primary ">
                        Vai al repository
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="card h-100 shadow-sm card-user">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <img
                        src={repo.owner.avatar_url}
                        alt={`Avatar di ${repo.owner.login}`}
                        className="img-fluid rounded-circle mb-2 mx-auto avatar"
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
                      <a href={repo.html_url} className="btn btn-primary ">
                        Vai al repository
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
