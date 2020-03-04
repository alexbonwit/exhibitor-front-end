function main(){

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Loaded!')
        loadNav()
        getExhibits()
    })
}


function getExhibits(){
    //fetch exhibits from database
    //render exhibits in cards(pass json data into new function)
    fetch("http://localhost:3000/exhibits")
    .then( resp => resp.json() )
    .then( exhibitData => renderExhibits(exhibitData))
}

function renderExhibits(exhibitData){
    exhibitData.forEach( exhibit => renderExhibit(exhibit) )
    //loop over exhibit data to render cards
}

// function renderDogBreed(dogBreedData){
//     // console.log('asdf')

//     Object.keys(dogBreedData).forEach(dog => {
//         let dogBreedName = `<li class="doggies">${dog}</li>`
//         dogList.innerHTML += dogBreedName
//     })

function renderExhibit(exhibit){
    
    let exhibitCardsDiv = document.querySelector(".exhibit-cards")
    
    let exhibitCard = 
        `<div class="card d-flex flex-column">
            <h4>Exhibit: ${exhibit.name}</h4>
            <p>Museum: ${exhibit.museum.name}</p>
            
            <h5>Artists:</h5>
            <ul>
                ${iterateArtists(exhibit.artists)}
            </ul>
            <button type="button" class="btn btn-info interstBtn mt-auto" display="position: absolute; right: 0; bottom: 0;">More Info</button>
        </div>`
    
    
    exhibitCardsDiv.innerHTML += exhibitCard

    //render and append singular exhibit card
    //include event name, museum, and artists
    //include creation of Show More button to open modal with full event information

    // <p>${iterateArtists(exhibit.artists)}</p>
}

// this function might need to be within the scope of renderExhibit
function iterateArtists(artists){
//    return artists.map(artist => `<li>${artist.name}</li>`).join("")
    let returnString = ""
    artists.forEach(artist => {
       let liTag =  `<li>${artist.name}</li>`
       returnString += liTag
    })
    return returnString
}

function loadNav() {
    const nav = document.querySelector('.navbar')

    nav.addEventListener('click', e => {
        if (e.target.innerText === "Exhibits") {
            getExhibits()
        } else if (e.target.innerText === "Artists") {
            getArtists()
        } else if (e.target.innerText === "Museums") {
            getMuseums()
        }
    })
}


main()
