let fizzBuzz = (num) => {
    return num % 15 === 0 ? "Fizz Buzz"
        : num % 3 === 0 ? "Fizz"
            : num % 5 === 0 ? "Buzz"
                : num;
};

let onClick = () => {
    const maxNumber = 1000;

    let num = document.getElementById("input-number").value;
    let errorMessage = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    if (!num) {
        errorMessage.innerHTML = "Please enter something!";
    } else if (num <= 0 || num > maxNumber) {
        errorMessage.innerHTML = "Please enter a number from 0 to 999!";
    } else {
        errorMessage.innerHTML = "";
        strAnnouncement.innerHTML = "The Fizz Buzz of " + num + " is:";
        strResult.innerHTML = fizzBuzz(num);
    }
};
