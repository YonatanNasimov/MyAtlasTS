export default class CountryItem {
    parent: string;
    code: string;
    name: string;
    pop: string;
    capital: string;
    mainLand: string;
    Language: string[];
    coin: string;
    img: string;
    latlng: [number, number];
    borders: string[] | null;

    constructor(_parent: string, _item: any) {
        this.parent = _parent;
        this.code = _item.cioc;
        this.name = _item.name.common;
        this.pop = _item.population.toLocaleString();
        this.capital = _item.capital;
        this.mainLand = _item.region;
        this.Language = Object.values(_item.languages);
        this.coin =
            Object.keys(_item.currencies) +
            ", " +
            Object.values(Object.values<string>(_item.currencies)[0])[0];
        this.img = _item.flags.png;
        this.latlng = _item.latlng;
        this.borders = _item.borders;
    }

    shownRender(): void {
        const div: HTMLDivElement = document.createElement("div");
        div.className = "col-md-4 p-2";
        document.querySelector(this.parent)?.append(div);

        div.innerHTML = `
        <div class="p-1 h-100 overflow-hidden">
          <article class="border myDiv h-100">
            <a href="../pages/single.html?name=${this.name}" class="text-decoration-none text-dark">
              <div>
                <img src="${this.img}" alt="flag of ${this.name}" class="w-100">
              </div>
              <div class="p-3">
                <h3>${this.name}</h3>
                <p><strong>Capital:</strong> ${this.capital}</p>
                <i class="center h1 m-0 text-dark fa fa-arrow-down" aria-hidden="true"></i>
                <p class="p-0 center">Click for more info</p>
              </a>
            </div>
          </article>
        </div>`;
    }

    render(): void {
        const div: HTMLDivElement = document.createElement("div");
        div.className = "col-md-10 p-4 mx-auto";
        document.querySelector(this.parent)?.append(div);

        div.innerHTML = `
        <article class="row myDiv border p-2 overflow-hidden h-100">
          <div class="box col-md-5">
            <p class="text-decoration-underline"><strong>${this.name}</strong></p>
            <p><strong>Population:</strong>${this.pop}</p>
            <p><strong>Mainland:</strong>${this.mainLand}</p>
            <p><strong>Language:</strong>${this.Language}</p>
            <p><strong>Coin:</strong>${this.coin}</p>
            <p><strong>Capital:</strong>${this.capital}</p>
          </div>
          <div class="box col-md-7 center">
            <img src="${this.img}" alt="flag of ${this.name}" class="w-100 h-75 border">
          </div>
          <div class="box col-md-6 mx-auto">
            <iframe class="w-100"
              height="170"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&hl=en&z=6&amp;output=embed">
            </iframe>
          </div>
          <div id="id_border" class="box col-md-5"></div>
          <div class="col-md-12 text-center p-4">
            <a title="go to home page" href="index.html"><i class="fa fa-home text-decoration-none h1 text-dark"
                aria-hidden="true"></i></a>
            <button title="go back" onclick="history.back()"><i class="fa fa-undo h1" aria-hidden="true"></i></button>
          </div>
        </article>`;

        const borders: HTMLDivElement | null = div.querySelector("#id_border");

        const getBorderName = async (code: string): Promise<string> => {
            const url: string = `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`;
            const resp: Response = await fetch(url);
            const data = await resp.json();
            const { name } = data[0];
            return name.common;
        };

        if (this.borders) {
            this.borders.forEach(async (item, i) => {
                if (i === 0) {
                    borders!.innerHTML += `<strong>Neighbors:</strong>`;
                }
                const CountryName: string = await getBorderName(item);
                const border:HTMLSpanElement = document.createElement("span");
                border.className = "divBorder";
                border.style.cursor = "pointer";
                border.innerHTML = `${CountryName} `;
                borders?.append(border);
                border.addEventListener("click", () => {
                    window.open(`single.html?name=${CountryName}`, "_self");
                });
            });
        }
    }
}
