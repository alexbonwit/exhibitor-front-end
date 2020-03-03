function main(){

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Loaded!')
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
    
    let exhibitCard = `<h4>Exhibit Name: ${exhibit.name}</h4>
    <p>Museum Name: ${exhibit.museum.name}</p>
    <p>Artist Name: ${iterateArtists(exhibit.artists)}</p>`
    exhibitCardsDiv.innerHTML += exhibitCard

    //render and append singular exhibit card
    //include event name, museum, and artists
    //include creation of Show More button to open modal with full event information
}

// this function might need to be within the scope of renderExhibit
function iterateArtists(artists){
    artists.forEach( artist => {
       
        `<p>${artist.name}</p>`
        
    })
}



main()
