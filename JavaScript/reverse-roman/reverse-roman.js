const reverseRoman = (strRoman) => {
    let result = 0;
    let romanNumerals = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    for (let i = 0; i < strRoman.length; i++) {
        let current = romanNumerals[strRoman[i]];
        let next = romanNumerals[strRoman[i + 1]];

        if (current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }

    return result;
};

const onClick = () => {
    const regExRoman = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;

    let strRoman = document.getElementById("input-string").value.toUpperCase();
    let errorMessage = document.getElementById("error-message");
    let strAnnouncement = document.getElementById("announcement");
    let strResult = document.getElementById("result");

    if (!strRoman) {
        errorMessage.innerHTML = "Please enter something!";
    } else if (!regExRoman.test(strRoman)) {
        errorMessage.innerHTML = "Please enter a correct roman numerals!";
    } else {
        errorMessage.innerHTML = "";
        strAnnouncement.innerHTML = "The result of " + strRoman + " is:";
        strResult.innerHTML = reverseRoman(strRoman);
    }
};
