import CountryItem from "./countryItem.js";

const countries_ar: any[] = [];

const showLoading = () => {
    const loadingElement = document.querySelector("#id_loading") as HTMLElement;
    const rowElement = document.querySelector("#id_row") as HTMLElement;
    loadingElement.style.display = "block";
    rowElement.style.display = "none";
};

const hideLoading = () => {
    const loadingElement = document.querySelector("#id_loading") as HTMLElement;
    const rowElement = document.querySelector("#id_row") as HTMLElement;
    loadingElement.style.display = "none";
    rowElement.style.display = "flex";
};

export const doApi = async () => {
    showLoading();
    const url: string = "https://restcountries.com/v3.1/all";
    const resp: Response = await fetch(url);
    const data = await resp.json();
    countries_ar.splice(0, data.length, ...data);
    console.log(data);
    let startCountries_ar:string[] = ["Peru", "Israel", "Russia", "Brazil", "Thailand"];
    let filter_ar:string[] = data.filter((item: any) => startCountries_ar.includes(item.name.common));
    console.log(filter_ar);
    creatCountries(filter_ar);
};

export const creatCountries = (_ar: any[]) => {
    hideLoading();
    console.log(_ar);
    const rowElement = document.querySelector("#id_row") as HTMLElement;
    rowElement.innerHTML = "";
    if (_ar.length !== 0) {
        _ar.forEach((item: any) => {
            const Country = new CountryItem("#id_row", item);
            Country.shownRender();
        });
    } else {
        rowElement.innerHTML = "<h3>Country is undefined</h3>";
    }
};

export const searchApi = async (_searchQuery: string) => {
    console.log(_searchQuery);
    const sorted_ar = countries_ar.filter((item: any) =>
        item.name.common.toLowerCase().includes(_searchQuery.toLowerCase())
    );
    console.log(sorted_ar);
    if (_searchQuery.length < 1) {
        const rowElement = document.querySelector("#id_row") as HTMLElement;
        rowElement.innerHTML = "<h3>Search field is empty</h3>";
    } else {
        creatCountries(sorted_ar);
    }
};
