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


function renderExhibit(exhibit){
    
    let exhibitCardsDiv = document.querySelector(".exhibit-cards")
    
    let exhibitCard = 
    `<h4>Exhibit Name: ${exhibit.name}</h4>
    <h6>Museum Name: ${exhibit.museum.name}</h6>
    
    <h6>Artist:</6>
    <ul>
        ${iterateArtists(exhibit.artists)}
    </ul>
    `    
    exhibitCardsDiv.innerHTML += exhibitCard
}

function iterateArtists(artists){
//    return artists.map(artist => `<li>${artist.name}</li>`).join("")
    let returnString = ""
    artists.forEach(artist => {
       let liTag =  `<li>${artist.name}</li>`
       returnString += liTag
    })
    return returnString
}

const button = document.getElementById("btn") 
button.addEventListener("click", handleButton)

function handleButton(){
    console.log("The button was clicked.")
}




main()
