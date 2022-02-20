const { default: axios } = require("axios");
const fs = require("fs");
const argv = process.argv;

function cat(path) {

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
        }

        console.log(data);
    });
}

async function webCat(path) {
    try {
        let resp = await axios.get(path);
        console.log(resp.data)
    }
    catch (err){
        console.error(err);
    }
}

path = argv[2];

if (path.endsWith(".txt")) {
    cat(path);
}
else if (path.startsWith("http")) {
    webCat(path);
}
else {
    console.log("This isn't a text file or a web address! Try again.")
}
