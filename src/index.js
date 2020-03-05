const exhibitButton = document.getElementById("exhibit-btn") 
const artistButton = document.getElementById("artist-btn")
const cardsDiv = document.querySelector('.cards-div')
const formDiv = document.querySelector('.form-div')
const formButton = document.querySelector('.form-btn')
const modalDiv = document.querySelector('.modal-div')
//const form = document.getElementById("new-exhibit-form")

function main(){

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Loaded!')
        loadNav();
        getExhibits()
    })
}

function getExhibits(){
    //fetch exhibits from database
    //render exhibits in cards(pass json data into new function)
    clearPage();
    renderExhibitButton();
    fetch("http://localhost:3000/exhibits")
        .then( resp => resp.json() )
        .then( exhibitData => renderExhibits(exhibitData))
}

function clearPage(){
    cardsDiv.innerHTML = '';
    formDiv.innerHTML = '';
    formButton.innerHTML = '';
}

function renderExhibitButton(){
    const newExhibitButton = `<button type="button" class="btn btn-secondary" id="exhibit-btn">Add Exhibit</button>`;
    formButton.innerHTML = newExhibitButton;
    const exhibitButton = document.getElementById("exhibit-btn");
    exhibitButton.addEventListener("click", handleExhibitButton);
}

function renderExhibits(exhibitData){
    exhibitData.forEach( exhibit => renderExhibit(exhibit) )
    //loop over exhibit data to render cards
    cardsDiv.addEventListener('click', event => {
        if (event.target.innerText === "More Info"){
            const eventId = event.target.dataset.id;
            fetchModalData(eventId)
        }
    })
}

function fetchModalData(eventId){
    fetch(`http://localhost:3000/exhibits/${eventId}`)
        .then(resp => resp.json())
        .then(exhibitData => openEventModal(exhibitData))
}

function openEventModal(exhibitData){
    modalDiv.innerHTML = '';

    const eventModal = `
    <div class="modal fade" id="exhibitModalCenter" tabindex="-1" role="dialog" aria-labelledby="exhibitInfo" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exhibitTitle">${exhibitData.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${exhibitData.description}</p>
                    <br>
                    <p>Runs from ${exhibitData.start_date} to ${exhibitData.end_date}</p>
                    <p>Admission cost: ${exhibitData.cost}</p>
                    <br>
                    <p>${exhibitData.interest_count} people are interested in this exhibit</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-info" data-id="${exhibitData.id}">I'm interested!</button>
                </div>
            </div>
        </div>
    </div>
    `
    modalDiv.innerHTML = eventModal;
    
}

document.body.addEventListener('click', event => {
    if (event.target.innerText === "I'm interested!"){
        const exhibitInterestObj = {
            id: event.target.dataset.id,
            
        }
        manageInterest(exhibitInterestId);
    }
})

function manageInterest(exhibit){

}

function renderExhibit(exhibit){
    
    let exhibitCardsDiv = document.querySelector(".cards-div")
    
    let exhibitCard = 
        `<div class="card d-flex flex-column">
            <h4>Exhibit: ${exhibit.name}</h4>
            <p>Museum: ${exhibit.museum.name}</p>
            
            <h5>Artists:</h5>
            <ul>
                ${iterateArtists(exhibit.artists)}
            </ul>
            <button type="button" class="btn btn-info exhibitBtn mt-auto" data-toggle="modal" data-target="#exhibitModalCenter" data-id=${exhibit.id} display="position: absolute; right: 0; bottom: 0;">More Info</button>
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

function loadNav() {
    const nav = document.querySelector('.navbar')

    nav.addEventListener('click', e => {
        if (e.target.innerText === "Exhibits") {
            console.log('Exhibits')
            getExhibits();
        } else if (e.target.innerText === "Artists") {
            console.log('Artists!')
            getArtists();
        } else if (e.target.innerText == "Museums") {
            console.log('MUSEUMS!!!')
            // getMuseums();
        }
    })
}
function getArtists(){
    clearPage();
    renderArtistButton();
    fetch("http://localhost:3000/artists")
        .then( resp => resp.json() )
        .then( artistData => renderArtists(artistData))
}

function renderArtistButton(){
    const newArtistButton = `<button type="button" class="btn btn-secondary" id="artist-btn">Add Artist</button>`;
    formButton.innerHTML = newArtistButton;
    const artistButton = document.getElementById("artist-btn")
    artistButton.addEventListener("click", handleArtistButton);
}

function handleArtistButton(){
    console.log("Add Artist button clicked")
    if (formDiv.innerHTML === '') {
        const artistForm = document.createElement('form')
        artistForm.id = "new-artist-form"
        artistForm.addEventListener("submit", handleArtistSubmit)

        const artistFormInputs = `
            <label for="artist_name">Artist Name:</label>
            <input type="text" id="artist_name" name="artist_name"><br><br>

            <label for="bio">Bio:</label>
            <input type="text_field" id="bio" name="bio"><br><br> 

            <input type="submit" value="Submit">`

            artistForm.innerHTML += artistFormInputs
            formDiv.append(artistForm)
    } else {
        formDiv.innerHTML = '';
    }
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
    .then( artistData => renderArtists(artistData) )
}

function renderArtists(artistData){
    console.log(artistData)
    artistData.forEach( artist => renderArtist(artist))
}

function renderArtist(artist){
    let artistCardsDiv =document.querySelector(".cards-div")

    let artistCard = 
    `<h4>Artist Name: ${artist.name}</h4>
     <p>Bio: ${artist.bio}</p>
    `
    artistCardsDiv.innerHTML += artistCard
}

function handleExhibitButton(){
    console.log('Add Exhibit button clicked')
    if (formDiv.innerHTML === ''){
        const form = document.createElement('form')
        form.id = "new-exhibit-form"
        form.addEventListener("submit", handleSubmit)

        const formInputs = `
            <br>
            <div class="form-group">
                <label for="exhibit_name">Exhibit Name:</label>
                <input type="text" id="exhibit_name" name="exhibit_name"><br><br>
            </div>
            
            <div class="form-group">
                <label for="description">Description:</label>
                <input type="text_field" id="description" name="description"><br><br>
            </div>

            <div class="form-group">
                <label for="museum_name">Museum Name:</label>
                <input type="text" id="museum_name" name="museum_name"><br><br>
            </div>

            <div class="form-group">
                <label for="artist_name">Artist Name:</label>
                <input type="text" id="artist_name" name="artist_name"><br><br>
            </div

            <div class="form-group">
                <select>
                    <option>Something</option>
                </select>
            </div>
            <br>
            <br>

            <input type="submit" value="Submit" class="btn btn-secondary">`
            
    
        
        form.innerHTML += formInputs
        formDiv.append(form)
    } else {
        formDiv.innerHTML = '';
    }
}

function iterateMuseum(museums){
    let returnString = ""
    museums.forEach(museum => {
        let museumName = `${museum.name}`
        returnString += museumName
    })
    return returnString
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




main()

//form.addEventListener("click", ()=>console.log("something was clicked"))