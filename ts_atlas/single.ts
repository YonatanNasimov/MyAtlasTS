import CountryItem from "../ts_atlas/countryItem.js";

const init = (): void => {
    doApi();
};

const doApi = async (): Promise<void> => {
    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    const name: string | null = urlParams.get("name");
    if (name) {
        const url: string = `https://restcountries.com/v3.1/name/${name}`;
        const resp: Response = await fetch(url);
        const data = await resp.json();
        console.log(data);
        creatCountries(data);
    }
};

const creatCountries = (_ar: any[]): void => {
    console.log(_ar);
    const rowElement = document.querySelector("#id_row") as HTMLElement;
    rowElement.innerHTML = "";
    _ar.forEach((item: any) => {
        const Country = new CountryItem("#id_row", item);
        Country.render();
    });
};

const logo = document.querySelector(".logo") as HTMLElement;
logo.style.cursor = "pointer";
logo.addEventListener("click", () => {
    window.open("index.html", "_self");
});

init();
