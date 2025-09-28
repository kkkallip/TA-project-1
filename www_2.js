const http = require("http");
const fs = require("fs");
//laeme moodulid äingu pärsimiseks
const url = require("url");
//failitee haldamiseks
const path = require("path");
const dateEt = require("./src/dateTimeET");
const oldSayings = require("./src/readFile");

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n<title>Leht</title>\n</head>\n\t<body>';
const pageBanner = '<img src="/vp_banner_2025_TA.jpg" alt="kursuse bänner">';
const thumbsup = '<img src="/thumbsup.jpg" alt="thumbsup">';
const pageLink = '\n\t<p>Vaata <a href="/vanasonad/">vanasõnasid</a>.</p>';
const pageBody = '\n<h1>Leht</h1>\n<p>See on leht, midagi uhket siit ei leia. <a href="https://www.tlu.ee">TLÜ</a></p><hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res) {
    
    //parsin URLi
    let currentUrl = url.parse(req.url, true);
    console.log(currentUrl.pathname);

    if (currentUrl.pathname === "/") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write("\n<p> Täna on " + dateEt.weekDay() + ", " + dateEt.date() + "</p>");
        res.write(pageLink);
        res.write("<a href='/kodune/'>Kodune töö</a>")
        res.write(pageFoot);
        return res.end();

    } else if (currentUrl.pathname === "/vanasonad/") {
        res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(pageBanner);
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

} else if (currentUrl.pathname === "/kodune/") {
    res.writeHead(200, {"Content-type": "text/html"});
    res.write(pageHead);
    res.write(thumbsup);
    res.write("<p> Oskan ka veel ühe lehe lisada</p>");
    res.write("<p>Tagasi <a href='http://greeny.cs.tlu.ee:5118'>pealehele</a>.</p>");
    res.write(pageFoot);
    return res.end();

} else if (path.extname(currentUrl.pathname) === ".jpg") {
    //liidame muidu kättesaamatu piltide kausta meie veebi failiteega
    let bannerPath = path.join(__dirname, "images");
    fs.readFile(bannerPath + currentUrl.pathname, (err, data) => {
        if (err) {
            throw(err);
        } else {
            res.writeHead(200, {"Content-type": "image/jpeg"});
            res.end(data);
        }
    });
} else {
    res.end("Viga 404");
}
}).listen(5118);