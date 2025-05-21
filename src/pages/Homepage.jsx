export default function HomePage() {
  const fetchApi = async () => {
    const response = await fetch(
      "https://api.github.com/users/FrancescoGiommi/repos"
    );
    const data = await response.json();
    return data;
  };

  (async () => {
    const response = await fetchApi();
    console.log(response);
  })();

  return (
    <>
      <h1>Homepage</h1>
    </>
  );
}
