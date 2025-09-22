const http = require("http");
const dateEt = require("./src/dateTimeET");
const oldSayings = require("./src/readFile");
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n<title>Leht</title>\n</head>\n\t<body>';
const pageBody = '\n<h1>Leht</h1>\n<p>See on leht, midagi uhket siit ei leia. <a href="https://www.tlu.ee">TLÜ</a></p><hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(pageBody);
    res.write("\n<p> Täna on " + dateEt.weekDay() + ", " + dateEt.date() + "</p>");
    res.write("<hr> \n")
    let wisdomList = oldSayings.readTextFile();
    let wisdomsSeperated = wisdomList.split(";");
    if (wisdomsSeperated === undefined || wisdomsSeperated.length == 0) {
        res.write("<p>Vanasõnu ei leitud!</p>")
    }
    res.write("<ol>");
    for (let i = 0; i < wisdomsSeperated.length; i++) {
        res.write("\n<li>" + wisdomsSeperated[i] + "</li>");
    }
    res.write("</ol> \n <hr>")
    

    
    
    res.write(pageFoot);
    return res.end();
}).listen(5118);