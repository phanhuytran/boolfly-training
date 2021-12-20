const romanNumerals = (number) => {
    let result = [];

    let thousands = [
        "",
        "M",
        "MM",
        "MMM",
        "MMMM",
        "MMMMM",
        "MMMMMM",
        "MMMMMMM",
        "MMMMMMMM",
        "MMMMMMMMMM"
    ];
    let hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    let tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    let units = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

    let th = thousands[Math.floor(number / 1000)];
    result = th;

    let h = hundreds[Math.floor((number % 1000) / 100)];
    result += h;

    let t = tens[Math.floor((number % 100) / 10)];
    result += t;

    let u = units[number % 10];
    result += u;

    return result;
};

const onClick = () => {
    const maxNumber = 4000;

    let num = document.getElementById("input-number").value;
    let errorMessage = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    if (!num) {
        errorMessage.innerHTML = "Please enter something!";
    } else if (num <= 0 || num >= maxNumber) {
        errorMessage.innerHTML = "Please enter a number from 1 to 3999!";
    } else {
        errorMessage.innerHTML = "";
        strAnnouncement.innerHTML = "The Roman Numerals of " + num + " is:";
        strResult.innerHTML = romanNumerals(num);
    }
};
