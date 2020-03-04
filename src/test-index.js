function main() {

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Loaded!')
        getExhibits()


    })
}


function getExhibits() {
    //fetch exhibits from database
    //render exhibits in cards(pass json data into new function)
    fetch("http://localhost:3000/exhibits")
        .then(resp => resp.json())
        .then(exhibitData => renderExhibits(exhibitData))
}

function renderExhibits(exhibitData) {
    exhibitData.forEach(exhibit => renderExhibit(exhibit))
    //loop over exhibit data to render cards
}

// function renderExhibit(exhibit){
//     let exhibitCardsDiv = document.querySelector('.exhibit-cards');

//     let exhibitCard = document.createElement('div');
//     exhibitCard.className = 'card';
//     exhibitCard.style = 'width: 18rem;';

//     let cardBody = document.createElement('div');
//     cardBody.className = 'card-body';

//     let exhibitName = document.createElement('h5');
//     exhibitName.innerHTML = exhibit.name;

//     let museumName = document.createElement('h6');
//     museumName.innerHTML = exhibit.museum.name;

//     cardBody.append(exhibitName, museumName);
//     exhibitCard.append(cardBody);
//     exhibitCardsDiv.append(exhibitCard);
// }

function renderExhibit(exhibit) {

    let exhibitCardsDiv = document.querySelector(".exhibit-cards");

    let exhibitCard =
        `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${exhibit.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${exhibit.museum.name}</h6>
                <p class="card-text">Artists: ${renderArtists(exhibit)}</p>
                <a href="#" class="card-link">More Info</a>
            </div>
        </div>`;

    exhibitCardsDiv.innerHTML += exhibitCard

    // `<h4>Exhibit Name: ${exhibit.name}</h4>
    // <p>Museum Name: ${exhibit.museum.name}</p>
    // <p>Artist Names: ${iterateArtists(exhibit.artists)}</p>`

    //render and append singular exhibit card
    //include event name, museum, and artists
    //include creation of Show More button to open modal with full event information
}

function renderArtists(exhibit) {
    let artistList =
        `<ul>
        ${createArtistList(exhibit)}
    </ul>
    `
    return artistList
}

function createArtistList(exhibit) {
    let artists = exhibit.artists
    debugger
    artists.forEach(artist => {
        `<li>${artist.name}</li>`
    })
}

// this function might need to be within the scope of renderExhibit



main()
