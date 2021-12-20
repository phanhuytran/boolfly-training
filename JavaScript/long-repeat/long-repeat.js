const longRepeat = (str) => {
    let length = 1;
    let maxLength = 1;

    for (let i = 0; i <= str.length; i++) {
        if (str[i - 1] === str[i]) {
            length++;
        } else {
            maxLength = Math.max(maxLength, length);
            length = 1;
        }
    }

    return maxLength;
};

const onClick = () => {
    let str = document.getElementById("input-string").value;
    let errorMessage = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    if (!str) {
        errorMessage.innerHTML = "Please enter something!";
    } else {
        errorMessage.innerHTML = "";
        strAnnouncement.innerHTML = "The Long Repeat of '" + str + "'" + " is:";
        strResult.innerHTML = longRepeat(str);
    }
};
