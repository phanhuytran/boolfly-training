const biggerTogether = () => {
    const regExArrayNumber = /^\[[\d|\,]+\]$/;

    let messageError = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    let positiveIntegersList = document.getElementById("list-integers").value;
    let numberArray = positiveIntegersList
        .split(" ")
        .map((i) => (/\d+/.test(i) ? i - 0 : NaN));
    let max;
    let min;
    let result;

    if (!positiveIntegersList) {
        messageError.innerHTML = "Please enter something!";
    } else {
        if (!regExArrayNumber.test(JSON.stringify(numberArray))) {
            messageError.innerHTML = "This positive integers list is invalid!";
            return;
        } else {
            numberArray = numberArray.map((i) => String(i));
            max = numberArray
                .sort((a, b) => a + b - (b + a))
                .reverse()
                .join("");
            min = numberArray.sort((a, b) => a + b - (b + a)).join("");
            result = max - min;

            messageError.innerHTML = "";
            strAnnouncement.innerHTML = "The result of " + max + " - " + min + " is:";
            strResult.innerHTML = result;
        }
    }
};
