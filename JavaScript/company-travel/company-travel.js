let $data = [];
$data["buu"] = ["Thailand", "Philippines", "Singapore"];
$data["dat"] = ["Singapore", "Philippines", "Thailand"];
$data["huy-vo"] = ["Philippines", "Thailand", "Singapore"];
$data["huy"] = ["Thailand", "Philippines", "Singapore"];
$data["khoa"] = ["Singapore", "Thailand", "Philippines"];
$data["quynh"] = ["Thailand", "Philippines", "Singapore"];
$data["vui"] = ["Singapore", "Philippines", "Thailand"];

const companyTravel = ($data) => {
    let result = [];

    for (let i = 0; i < $data[Object.keys($data)[0]].length; i++) {
        let array = [];
        for (let j in $data) {
            array.push($data[j][i]);
        }

        let priority = 0,
            index = 0;
        let counts = [];

        for (let k of array) {
            if (counts[k]) {
                counts[k] += 1;
            } else {
                counts[k] = 1;
            }
        }

        for (let t in counts) {
            let temp = priority;

            if (priority < counts[t]) {
                priority = counts[t];
            } else {
                priority = priority;
            }

            if (temp < counts[t]) {
                index = t;
            } else {
                index = index;
            }
        }

        result.push(index);
    }

    return result;
};

let result = companyTravel($data);

result.forEach((i) => {
    console.log(i);
    let line = document.createElement("p");
    line.innerHTML = i;
    document.body.appendChild(line);
});
