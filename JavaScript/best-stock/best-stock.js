const bestStock = () => {
    let errorMessage = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");
    let str = document.getElementById("object-stock").value;

    try {
        if (!str) {
            errorMessage.innerHTML = "Please enter something!";
        } else {
            let stockObject = JSON.parse(str.replace(/'/g, '"'));
            let result = "";
            let maxPrice = 0;
            let price = [];

            for (let key in stockObject) {
                if (price.indexOf(stockObject[key]) === -1) {
                    price.push(stockObject[key]);
                } else {
                    errorMessage.innerHTML = "All the prices are unique!";
                    return;
                }

                if (stockObject[key] > maxPrice) {
                    maxPrice = stockObject[key];
                    result = key;
                }
            }

            errorMessage.innerHTML = "";
            strAnnouncement.innerHTML = "The result is:";
            strResult.innerHTML = result;
        }
    } catch {
        alert("Invalid JSON string");
    }
};
