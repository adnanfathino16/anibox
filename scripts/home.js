import { bannerCarouselItem, section } from "./components/components.js";
import { initialSetup } from "./index.js";

initialSetup();

const setBannerCarouselItem = (banner) => {
  const bannerContainer = document.getElementById("banner-container");

  const carouselItems = banner.map((item) =>
    bannerCarouselItem({
      id: item.id,
      title: item.title.romaji,
      description: item.description,
      banner: item.bannerImage,
      year: item.year,
      genre: item.genres[0],
      format: item.format,
    })
  );

  bannerContainer.innerHTML = carouselItems.join("");

  const items = [];
  let index = 0;
  for (const item of bannerContainer.children) {
    items.push({
      position: index++,
      el: item,
    });
  }

  const carousel = new Carousel(items);
  carousel.cycle();

  const prevButton = document.querySelector("[data-carousel-prev]");
  const nextButton = document.querySelector("[data-carousel-next]");

  prevButton.onclick = () => {
    carousel.prev();
  };

  nextButton.onclick = () => {
    carousel.next();
  };
};

const data = async () => {
  try {
    const trending = await fetch("https://animeapi-askiahnur1.b4a.run/anime?sort=trending");
    const tredingData = await trending.json();
    const filter = await tredingData.slice(0, 5);
    setBannerCarouselItem(filter);

    const popular = await fetch("https://animeapi-askiahnur1.b4a.run/anime?sort=popularity");
    const popularData = await popular.json();

    const newest = await fetch("https://animeapi-askiahnur1.b4a.run/anime?sort=newest");
    const newestData = await newest.json();

    const listSection = [
      {
        name: "Trending",
        data: tredingData, //? ganti dengan data yang sudah diambil
      },
      // tambahkan section lain
      {
        name: "Popular",
        data: popularData,
      },
      {
        name: "Newest",
        data: newestData,
      },
    ];

    // menampilkan data ke halaman HTML
    document.querySelector("main").innerHTML = listSection.map((item) => section(item)).join("");

    // memberi action pada button scroll kiri dan kanan
    listSection.forEach((item) => {
      const sectionName = item.name.toLowerCase();

      const prev = document.querySelector("#" + sectionName + " button[data-carousel-prev]");
      prev.onclick = () => {
        document.getElementById(sectionName + "-container").scrollLeft -= 1000;
      };

      const next = document.querySelector("#" + sectionName + " button[data-carousel-next]");
      next.onclick = () => {
        document.getElementById(sectionName + "-container").scrollLeft += 1000;
      };
    });
  } catch (error) {
    console.log(error);
  }
};
data();
