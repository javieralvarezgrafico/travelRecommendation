// Recommendations result
const dataUrl = 'travel_recommendation_api.json';
let jsonData = null;

fetch(dataUrl)
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log("Data read succeeded! [v]");
            return response.json();
        } else {
            console.error("Error: status", response.status);
            return null;
        }
    })
    .then(data => {
        if (data) {
            jsonData = data;
            console.log(data); 
        } else {
            console.log("JSON data couldn't be processed.");
        }
    })
    .catch(error => {
        console.error("This error occurred:", error);
    });

// Keywords search
document.getElementById("magnifier_btn").addEventListener("click", function(event) {
    event.preventDefault();  // Because is <a>
    searchRecommendation();
});

document.getElementById("search_btn").addEventListener("click", function() {
    searchRecommendation();
});

document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchRecommendation();
    }
});

function searchRecommendation() {
    // Obtener el valor del input y convertirlo a minúsculas para comparación
    const searchInput = document.getElementById("search").value.toLowerCase();

    // Manejo de la búsqueda con switch
    switch (searchInput) {
        case "beach":
        case "beaches":
            showRecommendations("beach");
            break;
        case "temple":
        case "temples":
            showRecommendations("temple");
            break;
        case "country":
        case "countries":
            showRecommendations("country");
            break;
        default:
            console.log("No se encontraron resultados para: " + searchInput);
            break;
    }
}

function showRecommendations(term) {
    const card_one = document.getElementById("card1");
    const card_two = document.getElementById("card2");
    const gb = document.getElementById("greenbar")
    card_one.style.visibility = "hidden";
    card_two.style.visibility = "hidden";
    gb.style.visibility = "hidden";

    if (term === "beach") {
        card_one.innerHTML = '';
        card_two.innerHTML = '';

        const beaches = jsonData.beaches;

        beaches.forEach((beach, index) => {
            const card = index === 0 ? card_one : card_two;
            const cardHTML = `
                <div class="card-image" style="background-image: url('${beach.imageUrl}');"></div>
                <div class="card-content">
                    <h3>${beach.name}</h3>
                    <p>${beach.description}</p>
                    <button class="visit_btn">Visit</button>
                </div>
            `;
            card.innerHTML += cardHTML;
        });
        card_one.style.visibility = "visible";
        card_two.style.visibility = "visible";
        gb.style.visibility = "visible";

    } else if (term === "temple") {
        card_one.innerHTML = '';
        card_two.innerHTML = '';

        const temples = jsonData.temples;

        temples.forEach((temple, index) => {
            const card = index === 0 ? card_one : card_two;
            const cardHTML = `
                <div class="card-image" style="background-image: url('${temple.imageUrl}');"></div>
                <div class="card-content">
                    <h3>${temple.name}</h3>
                    <p>${temple.description}</p>
                    <button class="visit_btn">Visit</button>
                </div>
            `;
            card.innerHTML = cardHTML;
        });
        card_one.style.visibility = "visible";
        card_two.style.visibility = "visible";
        gb.style.visibility = "visible";

    } else if (term === "country") {
        card_one.innerHTML = '';
        card_two.innerHTML = '';

        const countries = jsonData.countries;

        countries.forEach((country, index) => {
            country.cities.forEach((city, cityIndex) => {
                const card = (cityIndex === 0 || cityIndex % 2 === 0) ? card_one : card_two;
    
                const cardHTML = `
                    <div class="card-image" style="background-image: url('${city.imageUrl}');"></div>
                    <div class="card-content">
                        <h3>${city.name}</h3>
                        <p>${city.description}</p>
                        <button class="visit_btn">Visit</button>
                    </div>
                `;
                card.innerHTML = cardHTML;
            });
        });
        card_one.style.visibility = "visible";
        card_two.style.visibility = "visible";
        gb.style.visibility = "visible";
    }  else {
        card_one.style.visibility = "hidden";
        card_two.style.visibility = "hidden";
        gb.style.visibility = "hidden";
    }
}