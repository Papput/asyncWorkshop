/**
 * Asynchronous JavaScript.
 *
 */

/**
 * 1. Get `pets/pets.json`, wait for response.
 *
 * 2. Based on response-array of `pets/pets.json`
 * make a request to the URL of each item (in parallel).
 *
 * 3. When we get a response back for each sub-request,
 * render the contents to their own UL-element.
 */

const petsEl = document.querySelector('#pets');