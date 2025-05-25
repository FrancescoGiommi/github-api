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

  // State per tracciare se la ricerca è stata fatta
  const [hasSearched, setHasSearched] = useState(false);

  // State per il loader
  const [isLoading, setIsLoading] = useState(false);

  // Fetch per repository
  const fetchRepositories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      setData(data.items || []);
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch per utente
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${query}/repos`
      );
      const data = await response.json();
      setData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isQueryValid) return;

    setHasSearched(true); // Solo al click del bottone
    setLastSearchType(searchType);

    if (searchType === "User") {
      fetchUser();
    } else {
      fetchRepositories();
    }
  };

  useEffect(() => {
    // Reset dei dati quando cambia la query o il tipo di ricerca
    setHasSearched(false);
  }, [query, searchType]);

  // Validazione della query
  const isQueryValid = query.trim().length >= 3;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">GitHub API</a>
          <form className="d-flex" onSubmit={handleSubmit} role="search">
            <div className="d-flex flex-column align-items-start me-3">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* Validazione della query */}
              <p className={isQueryValid ? "text-success" : "text-danger"}>
                {isQueryValid
                  ? "Ricerca valida"
                  : "Inserisci almeno 3 caratteri"}
              </p>
            </div>

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
          {isLoading ? (
            <p className="text-center">Caricamento...</p>
          ) : data.length > 0 ? (
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
                        className="img-fluid rounded-circle mb-2 mx-auto"
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
                  </div>
                ) : (
                  <div className="card h-100 shadow-sm card-user">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <img
                        src={repo.owner.avatar_url}
                        alt={`Avatar di ${repo.owner.login}`}
                        className="img-fluid rounded-circle mb-2 mx-auto"
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
                  </div>
                )}
              </div>
            ))
          ) : (
            hasSearched &&
            isQueryValid && (
              <p className="text-center text-danger mt-3 w-100">
                Nessun risultato trovato per "{query}"
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}
