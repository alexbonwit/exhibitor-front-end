const button = document.getElementById("btn") 
//const form = document.getElementById("new-exhibit-form")

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

function handleButton(){
console.log('here')
    const form = document.createElement('form')
    form.id = "new-exhibit-form"
    form.addEventListener("submit", handleSubmit)

   
    const formInputs = `


        <label for="exhibit_name">Exhibit Name:</label>
        <input type="text" id="exhibit_name" name="exhibit_name"><br><br>

        
        <p>Please enter a description of the exhibit below.</p>
        <textarea name="comment" form="usrform"></textarea><br><br>
        
        <label for="museum_name">Museum Name:</label>
        <input type="text" id="museum_name" name="museum_name"><br><br>

        <label for="artist_name">Artist Name:</label>
        <input type="text" id="artist_name" name="artist_name"><br><br>
        

        <input type="submit" value="Submit">


`
    form.innerHTML += formInputs
    document.body.append(form)
   
}

function handleSubmit(){
    event.preventDefault()
    debugger
    // be aware that the children values can be different if we've changed some styling
    let exhibitName = event.target.children[1].value
    let exhibitDescription = event.target.children[5].value
    let museumName = event.target.children[9].value
    let artistName = event.target.children[13].value
    console.log(event.target.children)
}


main()
button.addEventListener("click", handleButton)
//form.addEventListener("click", ()=>console.log("something was clicked"))