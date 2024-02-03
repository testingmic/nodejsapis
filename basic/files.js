const fs = require('fs');
const fileName = "./files/target.txt";

// fs.watch(fileName, () => {
//     console.log('file changed');
// });

fs.readFile(fileName, (err, data) => {
    if(err) {
        console.log("Error: ", err);
        return;
    }
    console.log('Data: ', data.toString());
});

console.log('hey there');