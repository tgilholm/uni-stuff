const api_url = "https://api.vam.ac.uk/v2/objects/search/";


window.addEventListener("load", () => {
    const button = document.querySelector('#searchButton');
    const form = document.querySelector('.search-container');
    const input = document.querySelector('#textInput');
    const target = document.querySelector('#result');

    // Listen for button press or "enter" pressed
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        search(input.value, target);
    });
    button.addEventListener('click', () => search(input.value, target));
});


/**
 * Gets a list of all the records matching the search term and fills out
 * the target with the templated results
 * @param {string} text the search term from the user
 * @param {Element} target the parent element to fill with elements
 * @returns early return if no text is provided
 */
async function search(text, target) {
    // Reject empty strings
    if (!text || !target) return;

    // Display a "loading" message while getting the results
    displayMessage(target, `Searching for: ${text}...`);

    // Handle the try catch here to display errors
    try {
        const result = await getFromQuery(text);

        // If nothing found, tell the user
        if (result.length === 0) {
            displayMessage(target, `No results found for search: "${text}"`);
            return; // break early
        }

        // Resolve all the promises concurrently instead of iterating
        const elements = await Promise.all(result.map(record => getElementFromTemplate(record)));
        target.replaceChildren(...elements);
    } catch (error) {
        displayMessage(target, `Search failed... Reason: ${error.message}`);
    }
}

/**
 * Executes the GET call with the provided query parameter, returning
 * a promise of an array of records matching the query.
 * @param {string} text the search term entered by the user
 * @returns {Promise<Array> | null} the array of records
 */
async function getFromQuery(text) {
    const params = new URLSearchParams();
    params.append('q', text);   // search by title
    params.append('images_exist', true);

    const url = `${api_url}?${params.toString()}`;  // e.g ./search/?q=text
    const response = await fetch(url);
    const results = await response.json(); // parse to json if not already

    return results.records || [];
}


/**
 * Returns an Element from the template in index.html with the record's
 * title, maker, date and image (IIIF or thumbnail).
 * @param {any} record a record from the API call 
 * @returns {Promise<Element>} the element with children created from the template
 */
async function getElementFromTemplate(record) {
    // Use the template from index.html
    const template = document.getElementById('record-template');
    const clone = template.content.cloneNode(true);
    const imageUrl = getIIIFImage(record);

    // Extract each element from the template
    const title = clone.querySelector('.title');
    const maker = clone.querySelector('.maker');
    const date = clone.querySelector('.date');
    const img = clone.querySelector('.image');

    // Fallback to the object type if no title found, then no title
    title.textContent = record._primaryTitle || record.objectType || "No Title";
    maker.textContent = `Maker: ${record._primaryMaker?.name || "Unknown Maker"}`;
    date.textContent = `Date: ${record._primaryDate || "Unknown Date"}`;

    img.setAttribute('src', imageUrl);

    return clone;
}


/**
 * Returns the higher-resolution IIIF image or the thumbnail URL as a fallback
 * @param {any} record the record to extract the image URL from 
 * @returns {string} an image URL, either IIIF or thumbnail.
 */
function getIIIFImage(record) {
    const iiifBase = record._images?._iiif_image_base_url;
    const thumbnail = record._images?._primary_thumbnail;

    // iiif the image exists, return it
    if (iiifBase) {
        return `${iiifBase}/full/600,/0/default.jpg`;
    }

    // otherwise send the thumbnail 
    return thumbnail || ""; // if the thumbnail doesn't exist, use nothing
}


/**
 * Helper method to replace the text displayed in a target with a set message.
 * This is used to display error/loading messages and replaces all children.
 * @param {Element} target the element to display the message in 
 * @param {string} message the message to display
 */
function displayMessage(target, message) {
    // Always append the message
    const p = document.createElement('p');
    p.textContent = message;
    target.replaceChildren(p);
}
