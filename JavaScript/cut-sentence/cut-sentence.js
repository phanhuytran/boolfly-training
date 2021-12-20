const cutSentence = (str, num) => {
    const ellipsis = "...";
    const space = " ";

    if (str.length > num) {
        let words = str.slice(0, num).split(space);

        if (str[num] !== space) {
            words.pop();
        }

        return words.join(space).trim() + ellipsis;
    }

    return str;
};

const onClick = () => {
    const maxString = 79,
        maxNumber = 76;
    const regExLatinh = /^([A-z]|\s)+$/g;

    let str = document.getElementById("input-string").value;
    let num = document.getElementById("input-number").value;

    let strErrorMessage = document.getElementById("str-error-message");
    let numErrorMessage = document.getElementById("num-error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    if (!str) {
        strErrorMessage.innerHTML = "Please enter something!";
    } else if (!regExLatinh.test(str)) {
        strErrorMessage.innerHTML =
            "All chars in line are English Letters and/or spaces";
    } else if (str.length <= 0 || str.length > maxString) {
        strErrorMessage.innerHTML =
            "Please enter a string with length from 1 to 79!";
    } else if (!num) {
        numErrorMessage.innerHTML = "Please enter something!";
    } else if (isNaN(num)) {
        numErrorMessage.innerHTML = "Please enter a number!";
    } else if (num <= 0 || num > maxNumber) {
        numErrorMessage.innerHTML = "Please enter a number from 1 to 76!";
    } else {
        strErrorMessage.innerHTML = "";
        numErrorMessage.innerHTML = "";
        strAnnouncement.innerHTML = "The Result is:";
        strResult.innerHTML = cutSentence(str, num);
    }
};
