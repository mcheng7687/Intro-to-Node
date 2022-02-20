const fs = require("fs");
const argv = process.argv;

function cat (path) {

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
        }

        console.log(data);
    });
}

cat(argv[2]);
