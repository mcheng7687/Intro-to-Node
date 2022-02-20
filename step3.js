const { default: axios } = require("axios");
const fs = require("fs");
const argv = process.argv;

function catWrite(content, newFilePath) {
    fs.writeFile(newFilePath, content, "utf8", function(err) {
        if (err) {
            console.error(`Couldn't write to ${newFilePath}: ${err}`);
            process.exit(1);
        }
        console.log("Successfully write to file!");
    });
}

function readOrWrite(action, data, newFilePath) {
    if (action == "write") {
        catWrite(data, newFilePath);
    }
    else if (action == "read") {
        console.log(data);
    }
}

function cat(action, path, newFilePath) {

    fs.readFile(path, 'utf8', function (err, data) {
        if (err)
            console.log(`Error reading ${path}: ${err}`);

        readOrWrite(action, data, newFilePath);
    });
}

async function webCat(action, path, newFilePath) {
    try {
        let resp = await axios.get(path);

        readOrWrite(action, resp.data, newFilePath);
    }
    catch (err){
        console.error(err);
    }
}

async function handlePath() {
    let path = argv[2];
    let action = "read";
    let newFilePath;

    if (path == "--out") {
        newFilePath = argv[3];
        path = argv[4];
        action = "write";
    }
    
    if (path.endsWith(".txt"))
        cat(action, path, newFilePath);
    else if (path.startsWith("http"))
        webCat(action, path, newFilePath);
    else
        console.log("This isn't a text file or a web address! Try again.");
}

handlePath();





