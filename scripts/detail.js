import { initialSetup } from "./index.js";

initialSetup();

const titleEl = document.getElementById("title");
const descriptionEl = document.getElementById("description");
const bannerImageEl = document.getElementById("banner-image");
const coverImageEl = document.getElementById("cover-image");
const infoEl = document.getElementById("info");
const genreEl = document.getElementById("genre");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//? fetch data dari API
const dataDetail = async (id) => {
  try {
    const detail = await fetch("https://animeapi-askiahnur1.b4a.run/anime/" + id);
    const detailData = await detail.json();
    console.log(detailData);
    //? masukkan data ke masing-masing element
    titleEl.innerHTML = detailData.title.romaji;
    bannerImageEl.setAttribute("src", detailData.bannerImage);
    coverImageEl.setAttribute("src", detailData.coverImage);
    descriptionEl.innerHTML = detailData.description;

    const info = [detailData.year, detailData.format, detailData.episodes ? `${detailData.episodes} Episodes` : ""];

    let result = "";
    info.forEach((item) => {
      if (item) {
        result += `<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${item}</span>`;
      }
    });

    infoEl.innerHTML = result;

    //? tambahkan script untuk menampilkan daftar genre
    let resultGenre = "";
    const genres = detailData.genres;
    genres.forEach((genre) => {
      if (genre) {
        resultGenre += `<span class="m-2 text-white text-sm font-medium mr-2 px-2.5 py-0.5">${genre}</span>`;
      }
    });

    genreEl.innerHTML = resultGenre;
  } catch (error) {
    console.log(error);
  }
};
dataDetail(id);
