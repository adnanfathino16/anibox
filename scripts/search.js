import { imageCard } from "./components/components.js";
import { initialSetup } from "./index.js";

initialSetup();

const resultContainer = document.getElementById("result-container");
const searchKeyword = document.getElementById("search-keyword");

// mengambil query string parameter pada url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const q = urlParams.get("q");

searchKeyword.innerHTML = q;

//? ambil data hasil searching dari API
const data = async (q) => {
  try {
    const search = await fetch("https://animeapi-askiahnur1.b4a.run/anime?title=" + q);
    const searchResult = await search.json();
    if (!searchResult.length) {
      resultContainer.innerHTML = "<p>Data not found.</p>";
    } else {
      resultContainer.innerHTML = searchResult
        .map((item) =>
          imageCard({
            title: item.title.romaji,
            genre: item.genres[0],
            id: item.id,
            imageUrl: item.coverImage,
            year: item.year,
          })
        )
        .join("");
    }
    console.log(searchResult);
  } catch (error) {
    console.log(error);
  }
};
data(q);
