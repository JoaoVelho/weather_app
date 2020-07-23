const apiKey = "FEOq2J9u01jruhs2KLDA5fZGgGCFYAHK";

const createCard = (data) => {
  const header = document.createElement("h3");
  header.innerHTML = `${data.city}<span>${data.country}</span>`;

  const spanDelete = document.createElement("span");
  spanDelete.className = "delete";
  spanDelete.innerHTML = "X";

  const temp = document.createElement("h2");
  temp.innerHTML = `${data.temp}ºC`;

  const img = document.createElement("img");
  img.src = `imgs/${data.icon}.png`;

  const p = document.createElement("p");
  p.innerHTML = `${data.status.toUpperCase()}`;

  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(header);
  card.appendChild(spanDelete);
  card.appendChild(temp);
  card.appendChild(img);
  card.appendChild(p);

  const content = document.querySelector(".content");

  spanDelete.onclick = (e) => {
    content.removeChild(card);
  };

  content.appendChild(card);
};

document.querySelectorAll(".delete").forEach(
  (span) =>
    (span.onclick = (e) => {
      const card = e.target.parentNode;
      const content = card.parentNode;

      content.removeChild(card);
    })
);

document.search.onsubmit = async (e) => {
  e.preventDefault();

  const input = e.target.childNodes[1];

  const urlLocation = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${input.value}`;

  input.value = "";

  try {
    const res = await fetch(urlLocation);
    const data = await res.json();

    const urlWeather = `https://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=${apiKey}`;

    const resW = await fetch(urlWeather);
    const dataW = await resW.json();

    const fullData = {
      city: data[0].LocalizedName,
      country: data[0].Country.ID,
      temp: dataW[0].Temperature.Metric.Value,
      icon: dataW[0].WeatherIcon,
      status: dataW[0].WeatherText,
    };

    createCard(fullData);
  } catch (err) {
    console.log(err);
  }
};
