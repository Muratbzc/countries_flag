const selectCoutryByFlag = () => {
  const url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`something wrong: ${res.status} `);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      countrySelect(data);
    })
    .catch((err) => console.log(err));
};

//**VARIABLES DECLERATION */
const countryDiv = document.querySelector(".countries");

//**ERROR */
const renderError = () => {
  countryDiv.innerHTML += `
    <h2>Countries can not fetched</h2>
    <img src="./img/404.png" alt="" />
    `;
};

//**SELECT OPTIONS */
const countrySelect = (data) => {
  const selectCountry = document.getElementById("selectCountry");
  data.forEach((a) => {
    const newOption = document.createElement("option");
    newOption.value = a.name.common;
    newOption.innerText = a.name.common;
    selectCountry.appendChild(newOption);
  });

  selectCountry.addEventListener("change", (e) => {
    console.log(e.target.value);
    renderCountries(data, e.target.value);
  });
};

//**SELECT FLAG */

const renderCountries = (data, countryName) => {
  data.forEach((country) => {
    const {
      capital,
      currencies,
      flags: { svg },
      languages,
      name: { common },
      region,
    } = country;
    if (common == countryName) {
      countryDiv.innerHTML = `
    <div class="card m-auto mt-5" style="width: 18rem;">
        <img src="${svg}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${common} </h5>
            <p class="card-text">${region}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i> ${capital}
            </li>
            <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i> ${Object.values(
                  languages
                )}
            </li>
            <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i>
                ${Object.values(currencies).map(
                  (item) => Object.values(item) + " "
                )}
            </li>
        </ul>
    </div>
    `;
    }
  });
};

selectCoutryByFlag();
