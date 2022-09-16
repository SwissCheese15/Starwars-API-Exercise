
const baseUrl = "https://swapi.dev/api"

let movies = []

// make the "give me SW Info" button listen for click and execute function
const element = document.getElementById("pressHello");
element.addEventListener("click", function() {
 
    // check if button was pressed or not
    if(! document.getElementById('container').hasChildNodes()) {

        const baseUrl = "https://swapi.dev/api"

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

                    let starshipLinks = []

                    movies.push(input[i].title)
                    starshipLinks = input[i].vehicles
                    const li = document.createElement('li')
                    const span = document.createElement('span')
                    const button = document.createElement("button")
                    button.innerText = "What Starships are in this movie?"

                    for (j = 0; j < starshipLinks.length; j++) {
                    // starship fetch
                    fetch(starshipLinks[j])
                        .then(response => response.json())
                        .then(data => {
                            createSS(data.name)
                        })
                        .catch(error => {
                            console.error('Oh something went wrong with the data!', error)
                        })
                    }

                    // giving the newly created elements "css classes"
                    li.classList.add("movie-title-list-item")
                    span.classList.add("movie-title-text")
                    button.classList.add("content-hidden","ssButton")

                    // where the text is actually added
                    span.innerText = input[i].title
                    ul.appendChild(li)
                    li.appendChild(span)
                    // Add Button for displaying Starship Info
                    li.appendChild(button)

                    // making the movie descriptions
                    const p = document.createElement('p')
                    const div = document.createElement('div')
                    div.classList.add("wrapper")
                    p.classList.add("content-hidden")
                    p.innerText = input[i].opening_crawl
                    ul.appendChild(div)
                    div.appendChild(p)
                
                    // making the starship descriptions
                    const createSS = (input) => {

                        const ssLi = document.createElement('li')
                        const ssSpan = document.createElement('span')
                        const ss = document.createElement("ul")
                        ss.classList.add("content-hidden")
                        ssSpan.innerText = input
                        span.appendChild(ss)
                        ss.appendChild(ssLi)
                        ssLi.appendChild(ssSpan)

                        //turn off/on the css class that hides the starships
                        button.addEventListener("click", function() {

                            ss.classList.toggle("content-hidden")
                        })  
                    }
                    
                    // listen for click on movie title
                    span.addEventListener("click", function() {

                        //turn off/on the css class that hides the movie description
                        p.classList.toggle("content-hidden")
                        button.classList.toggle("content-hidden")
                    })  
            }
        }
    }
});

    // Sets the number of stars to display
    const numStars = 500;

    // Generating the stars to be displayed
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");  
        star.className = "star";
        var xy = getRandomPosition();
        star.style.top = xy[0] + 'px';
        star.style.left = xy[1] + 'px';
        document.body.append(star);
    }

    // Get random x, y values
    function getRandomPosition() {  
        var y = window.innerWidth;
        var x = window.innerHeight;
        var randomX = Math.floor(Math.random()*x);
        var randomY = Math.floor(Math.random()*y);
        return [randomX,randomY];
    }



