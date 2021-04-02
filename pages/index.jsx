import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("The walking dead");

  useEffect(() => {
    setSearchResults(initialData.catGifs.data);
  }, [initialData]);

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${process.env.API_KEY}&limit=10`
    );
    giphys = await giphys.json();
    setSearchResults(giphys.data);
    setSearchTerm(formInputs.searchTerm);
  };
  return (
    <>
    <div className="container">
      <Head>
        <title>Giphy Search App</title>
        <meta name="description" content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>Gif Searh App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchTerm" onChange={handleInputs} required />
        <button>Search</button>
      </form>
      <h1>Search results for: {searchTerm}</h1>
      <p>
        Share this search with others:
        <Link href="/search/[pid]" as={`/search/${searchTerm}`}>
          <a>{`http://localhost:3000/search/${searchTerm}`}</a>
        </Link>
      </p>
      <div className="content-grid">
        {searchResults.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
    </div>
    <Footer />
    </>
  );
}
// example of statically generated page
// export async function getStaticProps() {
//   let catGifs = await fetch(
//     `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${process.env.API_KEY}&limit=10`
//   );
//   catGifs = await catGifs.json();
//   return { props: { catGifs: catGifs } };
// }

//in order to ssr page just change the function name into getServerSideProps and it'll do the magic
export async function getServerSideProps() {
  let catGifs = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=thewalkingdead&api_key=${process.env.API_KEY}&limit=40`
  );
  catGifs = await catGifs.json();
  return { props: { catGifs: catGifs } };
}
