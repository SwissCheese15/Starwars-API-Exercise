
const baseUrl = "https://swapi.dev/api"

let movies = []

// make the "give me SW Info" button listen for click and execute function
const element = document.getElementById("pressHello");
element.addEventListener("click", function() {
 
    // check if button was pressed or not
    if(! document.getElementById('container').hasChildNodes()) {

        // getting data from target URL
        fetch(`${baseUrl}/films/`)
            .then(response => response.json())
            .then(data => {
                
                // what to do with the data that was fetched
                createMovies(data.results)
            })

            // handles errors if fetch did not work.
            // Not 400-errors, those need to be detected seprately
            .catch(error => {
                console.error('Oh something went wrong with the data!', error)
            })
        
        // Function that takes the fetched data and targets the movie title to display it 
        const createMovies = (input) => {

            // create <ul> element and append it to an html div that "actually exists"
            const ul = document.createElement('ul')
            document.getElementById('container').appendChild(ul)

            // for every movie title, create a <li> element with a child <span> element
            for (let i = 0; i < input.length; i++) {
                    movies.push(input[i].title)
                    const li = document.createElement('li')
                    const span = document.createElement('span')

                    // giving the newly created elements "css classes"
                    li.classList.add("movie-title-list-item")
                    span.classList.add("movie-title-text")

                    // where the text is actually added
                    span.innerText = input[i].title
                    ul.appendChild(li)
                    li.appendChild(span)

                    // making the movie descriptions
                    const p = document.createElement('p')
                    p.classList.add("content-hidden")
                    p.innerText = input[i].opening_crawl
                    span.appendChild(p) 
                    
                    // listen for click on movie title
                    span.addEventListener("click", function() {

                        //turn off/on the css class that hides the movie description
                        p.classList.toggle("content-hidden")

                    })
            }
        }
    }
});




