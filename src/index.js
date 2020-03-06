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
            getMuseums();
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
        
        const artistFormInputs = `
        <br>
        <div class="form-group">
            <label for="artist_name">Artist Name:</label>
            <input type="text" id="artist_name" name="artist_name">
        </div>

        <div class="form-group">
            <label for="bio">Bio:</label>
            <input type="text_field" id="bio" name="bio"> 
        </div>

        <input type="submit" value="Submit" class="btn btn-secondary">`
        
        artistForm.innerHTML += artistFormInputs
        formDiv.append(artistForm)
        artistForm.addEventListener("submit", handleArtistSubmit)
    } else {
        formDiv.innerHTML = '';
    }
}

function handleArtistSubmit(){
    event.preventDefault()
    let artistName = event.target[0].value
    let artistBio = event.target[1].value
    event.target.reset()
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

function renderArtists(artistData){
    console.log(artistData)
    artistData.forEach( artist => renderArtist(artist))
}

function renderArtist(artist){
    let artistCardsDiv =document.querySelector(".cards-div")

    let artistCard = 
        `<div class="card d-flex flex-column">
            <h4>Artist Name: ${artist.name}</h4>
            <p>Bio: ${artist.bio}</p>
        </div>`

    artistCardsDiv.innerHTML += artistCard
}

function handleExhibitButton(){
    console.log('Add Exhibit button clicked!!!')
    if (formDiv.innerHTML === ''){
        createEventForm()
        // const form = document.createElement('form')
        // form.id = "new-exhibit-form"
        // form.addEventListener("submit", handleSubmit)

        // const formInputs = `
        //     <br>
        //     <div class="form-group">
        //         <label for="exhibit_name">Exhibit Name:</label>
        //         <input type="text" id="exhibit_name" name="exhibit_name"><br><br>
        //     </div>
            
        //     <div class="form-group">
        //         <label for="description">Description:</label>
        //         <input type="text_area" id="description" name="description"><br><br>
        //     </div>

        //     <div class="form-group">
        //         <label for="museum_name">Museum Name:</label>
        //         <select id="museum_name" name="museum_name">
        //             ${listMuseums()}
        //         </select><br><br>
        //     </div>

        //     <div class="form-group">
        //         <label for="artist_name">Artist Name:</label>
        //         <input type="text" id="artist_name" name="artist_name"><br><br>
        //     </div

        //     <br>
        //     <br>

        //     <input type="submit" value="Submit" class="btn btn-secondary">`
            
    
        
        // form.innerHTML = formInputs
        // formDiv.append(form)
    } else {
        formDiv.innerHTML = '';
    }
}

function createEventForm(){
    fetch('http://localhost:3000/exhibits')
        .then(resp => resp.json())
        .then(exhibitData => renderForm(exhibitData))
    }
    
function renderForm(exhibits){
    let museumString = ''
    exhibits.forEach(exhibit => {
        let option = `<option value=${exhibit.museum.id}>${exhibit.museum.name}</option>`
        museumString += option
    })

    let artistString = ''
    exhibits.forEach(exhibit => {
        let artists = exhibit.artists
        artists.forEach(artist => {
            let option = `<option value=${artist.id}>${artist.name}</option>`
        artistString += option
        })
        
    })

    const form = document.createElement('form')
    form.id = "new-exhibit-form"

    const formInputs = `
            <br>
            <div class="form-group">
                <label for="exhibit_name">Exhibit Name:</label>
                <input type="text" id="exhibit_name" name="exhibit_name"><br><br>
            </div>
            
            <div class="form-group">
                <label for="description">Description:</label>
                <input type="text_area" id="description" name="description"><br><br>
            </div>

            <div class="form-group">
                <label for="start_date">Start Date:</label>
                <input type="text_area" id="start_date" name="start_date"><br><br>
            </div>

            <div class="form-group">
                <label for="end_date">End Date:</label>
                <input type="text_area" id="end_date" name="end_date"><br><br>
            </div>

            <div class="form-group">
                <label for="cost">Cost:</label>
                <input type="text_area" id="cost" name="cost"><br><br>
            </div>

            <div class="form-group">
                <label for="museum_name">Museum Name:</label>
                <select id="museum_name" name="museum_name">
                    ${museumString}
                </select><br><br>
            </div>

            <div class="form-group">
                <label for="artist_name">Artist Name:</label>
                <select id="artist_name" name="artist_name">
                    ${artistString}
                </select><br><br>
            </div>

            <br>

            <input type="submit" value="Submit" class="btn btn-secondary">`



    form.innerHTML = formInputs
    formDiv.append(form)
    form.addEventListener('submit', event => handleExhibitSubmit(event))
}

function iterateMuseum(museums){
    let returnString = ""
    museums.forEach(museum => {
        let museumName = `${museum.name}`
        returnString += museumName
    })
    return returnString
}


function handleExhibitSubmit(event){
    event.preventDefault()

    // be aware that the children values can be different if we've changed some styling
    let newExhibitObj = {
        name: event.target[0].value,
        description: event.target[1].value,
        start_date: event.target[2].value,
        end_date: event.target[3].value,
        cost: event.target[4].value,
        museum_id: parseInt(event.target[5].value),
        artists: {
            id: parseInt(event.target[6].value)},
        interest_count: 0
    }

    event.target.reset()
    // let exhibitName = event.target[0].value
    // let exhibitDescription = event.target[1].value
    // let museumName = event.target[2].value
    // let artistName = event.target[3].value

    const postObj = {
        method: "POST",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify(newExhibitObj)}

    fetch('http://localhost:3000/exhibits', postObj)
        .then( resp => resp.json() )
        .then( newExhibit => putExhibit(newExhibit))

    // console.log(event.target.children)
}

function putExhibit(exhibit){
    let exhibitCardsDiv = document.querySelector(".cards-div")
    let exhibitCard =
    `<div class="card d-flex flex-column">
    <h4>Exhibit: ${exhibit.name}</h4>
    <p>Museum: ${exhibit.museum.name}</p>
    
    <h5>Artists:</h5>
    <ul>
    ${exhibit.artists}
    </ul>
    <button type="button" class="btn btn-info exhibitBtn mt-auto" data-toggle="modal" data-target="#exhibitModalCenter" data-id=${exhibit.id} display="position: absolute; right: 0; bottom: 0;">More Info</button>
    </div>`
    
    debugger

    exhibitCardsDiv.innerHTML += exhibitCard
}

function getMuseums(){
    clearPage();
    fetch('http://localhost:3000/museums')
        .then(resp => resp.json())
        .then(museumsData => renderMuseums(museumsData))
}

function renderMuseums(museumsData){
    museumsData.forEach(museum => renderMuseum(museum))
}

function renderMuseum(museum){
    let museumCardsDiv = document.querySelector(".cards-div")

    let museumCard =
    `<div class="card d-flex flex-column">
            <h4>Museum: ${museum.name}</h4>
            <p>Address: ${museum.address}</p>`

    museumCardsDiv.innerHTML += museumCard
}


main()

//form.addEventListener("click", ()=>console.log("something was clicked"))