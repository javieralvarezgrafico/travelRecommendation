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