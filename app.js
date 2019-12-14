/**
 * Asynchronous JavaScript.
 *
 */

/**
 * 1. Get `pets/pets.json`, wait for response. ✔️
 *
 * 2. Based on response-array of `pets/pets.json`
 * make a request to the URL of each item (in parallel). ✔️
 *
 * 3. When we get a response back for each sub-request,
 * render the contents to their own UL-element.
 */

const petsEl = document.querySelector('#pets');

const getPets = (url) => {
	return new Promise( (resolve, reject) => {
		const request = new XMLHttpRequest();

		request.addEventListener('readystatechange', () => {
			if(request.readyState === 4) {
				request.status !== 200 ? reject(`Error code ${request.status}`) : resolve(request); 
			}
		});

		request.open('Get', url);
		request.send();
	});	
}

const renderPets = (title, pets) => {
	if(petsEl.innerText == 'Loading...') {
		petsEl.innerHTML = '';
	}
	let petSectionEl = document.createElement('section');
	let titleEl = document.createElement('h2');
	let petUlEl= document.createElement('ul');
	titleEl.innerText = title;

	petsEl.append(petSectionEl);
	petSectionEl.append(titleEl);
	petSectionEl.append(petUlEl);

	console.log(pets);
	pets.forEach( pet => {
		let petLiEl = document.createElement('li');
		petLiEl.innerText = `${pet.name}, Age: ${pet.age}`
		petUlEl.append(petLiEl);
	})
}

getPets('pets/pets.json')
	.then(request => {
		JSON.parse(request.responseText).forEach( pet => {
			getPets(pet.url)
				.then( petRequest => {
					renderPets(pet.title, JSON.parse(petRequest.responseText));
				})
				.catch(err => {
					console.warn('petRequest', err);
				})
			console.log(pet.title);
			console.log(pet.url);
		})
	})
	.catch(err => {
		console.warn(err);
	})