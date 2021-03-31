import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function Search(props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <p>
        go{" "}
        <Link href="/">
          <a>home</a>
        </Link>
      </p>
      <h1>Search results for: {router.query.searchTerm}</h1>
      <div className="content-grid">
        {props.giphys.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=RUtcgrBUha03XCX45ON17U59vhhmcZy1&limit=40`
  );
  giphys = await giphys.json();
  return { props: { giphys: giphys.data } };
}
