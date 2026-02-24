const api_url = "https://api.vam.ac.uk/v2/objects/search/";

window.addEventListener("DOMContentLoaded", () => {

    // Listen for button press
    const text = document.getElementById("textInput");

    text.addEventListener('keydown', () => {
        search(text.value);
    })

});

async function search(input) {
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('images_exist', true)

    const queryString = params.toString();
    const url = `${api_url}?${queryString}`;

    // search via api
    const response = await fetch(url);
    const data = await response.json();

    // clear container
    const container = document.getElementById("result");
    container.innerHTML = "";


    data.records.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("row");

        let img = document.createElement("img");
        img.setAttribute('src', element._images._primary_thumbnail);
        img.style.width = "150px";  // fixed size for consistent boxes
        img.style.height = "auto";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        let textDiv = document.createElement("div");
        textDiv.classList.add("text-container");
        let pTitle = document.createElement("p");
        pTitle.classList.add("title");
        pTitle.innerText = element._primaryTitle || "No Title";
        let pMaker = document.createElement("p");
        pMaker.classList.add("maker");
        pMaker.innerText = element._primaryMaker?.name || "Unknown maker";
        let pDate = document.createElement("p");
        pDate.classList.add("date");
        pDate.innerText = element._primaryDate || "Date unknown";
        textDiv.appendChild(pTitle);
        textDiv.appendChild(pMaker);
        textDiv.appendChild(pDate);
        div.appendChild(img);
        div.appendChild(textDiv);
        container.appendChild(div);
    });
}
