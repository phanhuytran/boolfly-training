let digitNumbers = [
    "không ",
    "một ",
    "hai ",
    "ba ",
    "bốn ",
    "năm ",
    "sáu ",
    "bảy ",
    "tám ",
    "chín "
];
let unitMoney = ["", "nghìn ", "triệu ", "tỷ ", "nghìn tỷ ", "triệu tỷ "];

const readThreeDigitNumbers = (threeDigitNumbers) => {
    let hundreds = parseInt(threeDigitNumbers / 100);
    let tens = parseInt((threeDigitNumbers % 100) / 10);
    let units = threeDigitNumbers % 10;
    let result = "";

    if (hundreds !== 0) {
        result += digitNumbers[hundreds] + "trăm ";
        tens === 0 && units !== 0 ? (result += "linh ") : "";
    }

    if (tens !== 0 && tens !== 1) {
        result += digitNumbers[tens] + "mươi ";
        tens === 0 && units !== 0 ? (result += "linh ") : "";
    }

    tens === 1 ? (result += "mười ") : "";

    switch (units) {
        case 1:
            tens !== 0 && tens !== 1
                ? (result += "mốt ")
                : (result += digitNumbers[units]);
            break;
        case 5:
            tens === 0 ? (result += digitNumbers[units]) : (result += "lăm ");
            break;
        default:
            units !== 0 ? (result += digitNumbers[units]) : "";
            break;
    }
    return result;
};

const readMoneyInWords = (amountOfMoney) => {
    let time = 0,
        num = 0,
        result = "",
        tmp = "";
    let position = [];

    amountOfMoney == 0 ? (result = "0 ") : "";
    amountOfMoney < 0 ? (result = "Âm ") : "";
    amountOfMoney > 0 ? (num = amountOfMoney) : (num = -amountOfMoney);

    if (amountOfMoney > 99999999999999999) {
        return "Xóa bớt số, nhập zừa zừa thôi má!";
    }

    position[5] = Math.floor(num / 1000000000000000);
    num = num - parseFloat(position[5].toString()) * 1000000000000000;

    position[4] = Math.floor(num / 1000000000000);
    num = num - parseFloat(position[4].toString()) * 1000000000000;

    position[3] = Math.floor(num / 1000000000);
    num = num - parseFloat(position[3].toString()) * 1000000000;

    position[2] = parseInt(num / 1000000);
    position[1] = parseInt((num % 1000000) / 1000);
    position[0] = parseInt(num % 1000);

    position[5] > 0
        ? (time = 5)
        : position[4] > 0
            ? (time = 4)
            : position[3] > 0
                ? (time = 3)
                : position[2] > 0
                    ? (time = 2)
                    : position[1] > 0
                        ? (time = 1)
                        : (time = 0);

    for (let i = time; i >= 0; i--) {
        tmp = readThreeDigitNumbers(position[i]);
        result += tmp;
        position[i] > 0 ? (result += unitMoney[i]) : "";
    }

    result = result.substring(0, 1).toUpperCase() + result.substring(1);
    return result + "đồng";
};

const currencyFormat = (num) => {
    return num
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev;
        });
};

const onClick = () => {
    let num = document.getElementById("input-number").value;
    let errorMessage = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    if (!num) {
        errorMessage.innerHTML = "Please enter something!";
    } else {
        errorMessage.innerHTML = "";
        strAnnouncement.innerHTML =
            "The amount of money in words of " + currencyFormat(num) + " VND is:";
        strResult.innerHTML = readMoneyInWords(num);
    }
};
