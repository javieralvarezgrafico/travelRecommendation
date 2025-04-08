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
    card_one.classList.add("hidden");
    card_two.classList.add("hidden");
    gb.classList.add("hidden");
    gb.classList.remove("visible");
    card_one.classList.remove("visible");
    card_two.classList.remove("visible");

    if (term === "beach") {
        card_one.innerHTML = '';
        card_two.innerHTML = '';

        const beaches = jsonData.beaches;

        beaches.forEach((beach, index) => {
            const card = index === 0 ? card_one : card_two;
            const cardHTML = `
                <div class="card-image" style="background-image: url('${beach.imageUrl}'); background-size: cover; height: 200px;"></div>
                <div class="card-content" style="background-color: white; padding: 20px;">
                    <h3>${beach.name}</h3>
                    <p>${beach.description}</p>
                    <button class="visit_btn">Visit</button>
                </div>
            `;
            card.innerHTML += cardHTML;
        });
        addVisible(gb, card_one, card_two);

    } else if (term === "temple") {
        card_one.innerHTML = '';
        card_two.innerHTML = '';

        const temples = jsonData.temples;

        temples.forEach((temple, index) => {
            const card = index === 0 ? card_one : card_two;
            const cardHTML = `
                <div class="card-image" style="background-image: url('${temple.imageUrl}'); background-size: cover; height: 200px;"></div>
                <div class="card-content" style="background-color: white; padding: 20px;">
                    <h3>${temple.name}</h3>
                    <p>${temple.description}</p>
                    <button class="visit_btn">Visit</button>
                </div>
            `;
            card.innerHTML = cardHTML;
        });
        addVisible(gb, card_one, card_two);

    } else if (term === "country") {
        card_one.innerHTML = '';
        card_two.innerHTML = '';

        const countries = jsonData.countries;

        countries.forEach((country, index) => {
            const card = index === 0 ? card_one : card_two;
            const cardHTML = `
                <div class="card-image" style="background-image: url('${country.imageUrl}'); background-size: cover; height: 200px;"></div>
                <div class="card-content" style="background-color: white; padding: 20px;">
                    <h3>${country.name}</h3>
                    <p>${country.description}</p>
                    <button class="visit_btn">Visit</button>
                </div>
            `;
            card.innerHTML = cardHTML;
        });
        addVisible(gb, card_one, card_two);
    }  else {
        addHidden(gb, card_one, card_two);
    }
}

function addVisible(gb, c1, c2) {
    gb.classList.add("visible");
    c1.classList.add("visible");
    c2.classList.add("visible");
    gb.classList.remove("hidden");
    c1.classList.remove("hidden");
    c2.classList.remove("hidden");
}

function addHidden() {
    gb.classList.remove("visible");
    c1.classList.remove("visible");
    c2.classList.remove("visible");
    gb.classList.add("hidden");
    c1.classList.add("hidden");
    c2.classList.add("hidden");
}