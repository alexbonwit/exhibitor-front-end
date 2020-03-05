const button = document.getElementById("btn") 
const artistButton = document.getElementById("artist-btn")
const newArtistForm = document.querySelector("form")

//const form = document.getElementById("new-exhibit-form")

function main(){

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Loaded!')
        loadNav()
        getExhibits()
        getArtists()
        getMuseums()
    })
}

//---------Exhibit Funcitons---------//

function getExhibits(){
    //fetch exhibits from database
    //render exhibits in cards(pass json data into new function)
    fetch("http://localhost:3000/exhibits")
    .then( resp => resp.json() )
    .then( exhibitData => renderExhibits(exhibitData))
}

function renderExhibits(exhibitData){
    exhibitData.forEach( exhibit => renderExhibit(exhibit) )
}

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
}

function iterateArtists(artists){
// return artists.map(artist => `<li>${artist.name}</li>`).join("")
    let returnString = ""
    artists.forEach(artist => {
       let liTag =  `<li>${artist.name}</li>`
       returnString += liTag
    })
    return returnString
}

function handleExhibitButton(){
    console.log('Add Exhibit button clicked')
        const form = document.createElement('form')
        form.id = "new-exhibit-form"
        form.addEventListener("submit", handleSubmit)
        const formInputs = `
    
            <label for="exhibit_name">Exhibit Name:</label>
            <input type="text" id="exhibit_name" name="exhibit_name"><br><br>
    
            
            <label for="description">Description:</label>
            <input type="text_field" id="description" name="description"><br><br>
            
            <label for="museum_name">Museum Name:</label>
            <input type="text" id="museum_name" name="museum_name"><br><br>
    
            <label for="artist_name">Artist Name:</label>
            <input type="text" id="artist_name" name="artist_name"><br><br>
    
            <select>
                <option>${listMuseumsFetch()}</option> "I still need to figure out the chain of events."

            </select>
    
            <input type="submit" value="Submit">`
    
        form.innerHTML += formInputs
        document.body.append(form)
    }

// need a funciton that will iterate through museums to put into <select> tag for museum
function iterateMuseums(museum){
    console.log(museum)
}
    
function handleSubmit(){
    event.preventDefault()

    // be aware that the children values can be different if we've changed some styling
    let exhibitName = event.target[0].value
    let exhibitDescription = event.target[1].value
    let museumName = event.target[2].value
    let artistName = event.target[3].value

    const postObj = {
        method: "POST",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({name: exhibitName,
                                description: exhibitDescription,
                                museum: museumName,
                                artists: artistName})}

    fetch('http://localhost:3000/exhibits', postObj)
    .then( resp => resp.json() )
    .then( newData => console.log(newData))

    console.log(event.target.children)
}
    
//---------Navigation Funciton---------//

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

//---------Artist Funcitons---------//

function getArtists(){
    fetch("http://localhost:3000/artists")
    .then( resp => resp.json() )
    .then( artistData => renderArtists(artistData))
}

function renderArtists(artistData){
    console.log(artistData)
    artistData.forEach( artist => renderArtist(artist))
    
}

function renderArtist(artist){
    // artistForm.reset() 
    let artistCardsDiv =document.querySelector(".artist-cards")

    let artistCard = 
    `<h4>Artist Name: ${artist.name}</h4>
     <p>Bio: ${artist.bio}</p>
    `
    artistCardsDiv.innerHTML += artistCard
}

function handleArtistButton(){
    console.log("Add Artist button clicked")
    const artistForm = document.createElement('form')
    // newArtistForm.reset();
    artistForm.id = "new-artist-form"
    artistForm.addEventListener("submit", handleArtistSubmit)
    // artistForm.reset()
    const artistFormInputs = `
        <label for="artist_name">Artist Name:</label>
        <input type="text" id="artist_name" name="artist_name"><br><br>

        <label for="bio">Bio:</label>
        <input type="text_field" id="bio" name="bio"><br><br> 

        <input type="submit" value="Submit">`

        artistForm.innerHTML += artistFormInputs
        document.body.append(artistForm)
}

function handleArtistSubmit(){
    event.preventDefault()
    
    console.log("test")
    let artistName = event.target[0].value
    let artistBio = event.target[1].value
    // create fetch post to artist to add to the artist database
    const postObj = {
        method: "POST",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: artistName,
            bio: artistBio
        })
    }

    fetch("http://localhost:3000/artists", postObj)
    .then( resp => resp.json() )
    .then( artistData => renderArtist(artistData) )
}

//---------Museum Funcitons---------//

function getMuseums(){
    fetch('http://localhost:3000/museums')
    .then( resp => resp.json() )
    .then( museumData => renderMuseums(museumData))
}

function renderMuseums(museumData){
    museumData.forEach( museum => renderMuseum(museum))
}

function renderMuseum(museum){
    let museumCardDiv = document.querySelector(".exhibit-cards")

    let museumCard = `
        <div class="card d-flex flex-column">
            <h4>Museum Name: ${museum.name}</h4>
            <p>Address: ${museum.address}</p>

            <button type="button" class="btn btn-info interstBtn mt-auto" display="position: absolute; right: 0; bottom: 0;">More Info</button>
        </div>`
    museumCardDiv.innerHTML += museumCard
}

function listMuseumsFetch(){
    fetch('http://localhost:3000/museums')
    .then(resp => resp.json() )
    .then( museumInfo => listMuseums(museumInfo))
}

function listMuseums(museumInfo){
    console.log(museumInfo)
    let select = document.querySelector("select")
    museumInfo.forEach( museum =>{
        let option = `<option>${museum.name}</option>`
        select.innerHTML += option
    })
}


//---------Start Chain of Events---------//

main()
button.addEventListener("click", handleExhibitButton)
artistButton.addEventListener("click", handleArtistButton)
//form.addEventListener("click", ()=>console.log("something was clicked"))