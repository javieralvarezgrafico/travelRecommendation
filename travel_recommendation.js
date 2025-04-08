// Recommendations result
const dataUrl = 'travel_recommendation_api.json';
let jsonData = null;

fetch(dataUrl)
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log("Data read succeeded! [✓]");
            return response.json();
        } else {
            console.error("Error: status", response.status);
            return null;
        }
    })
    .then(data => {
        if (data) {
            jsonData = data; 
        } else {
            console.log("JSON data couldn't be processed.");
        }
    })
    .catch(error => {
        console.error("This error occurred:", error);
    });