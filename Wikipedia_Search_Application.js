let searchInputElement = document.getElementById("searchInput");
let searchResultElement = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner");

function createAndAppendSearchResult(result) {

    let {
        link,
        title,
        description
    } = result;

    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");

    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.target = "_blank";
    titleElement.textContent = title;
    titleElement.classList.add("result-title");
    resultItemElement.appendChild(titleElement);

    let titleBreak = document.createElement("br");
    resultItemElement.appendChild(titleBreak);

    let linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.textContent = link;
    linkElement.classList.add("result-link");
    resultItemElement.appendChild(linkElement);

    let linkBreak = document.createElement("br");
    resultItemElement.appendChild(linkBreak);

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("link-description");
    resultItemElement.appendChild(descriptionElement);

    searchResultElement.appendChild(resultItemElement);

}

function displayResults(searchResults) {

    spinnerElement.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        spinnerElement.classList.remove("d-none");
        searchResultElement.textContent = "";

        let searchValue = searchInputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;

                displayResults(search_results);
            });
    }
}

searchInputElement.addEventListener("keydown", searchWikipedia);