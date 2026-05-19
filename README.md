# Chrome YouTube Fetcher

Collects title, author and thumbnail of YouTube videos using Chrome
<br>
<img width="346" height="230" alt="2 0 0-popup" src="https://github.com/user-attachments/assets/fa3b997a-4ed5-4391-9e79-6a5b12940a11" />

## Requirements

> ...that are necessary:
- [Google Chrome](https://www.google.com/chrome/de/download-chrome/)
> ...that may have working alternatives:
- [Node](https://nodejs.org/en/download/prebuilt-installer)
- Windows
> ...that have working alternatives:
- [7-Zip](https://7-zip.de/download.html)

## Setup

> [!NOTE]
> Please note that specific mentioned menu options may not be accurate since english is not my native language.

1. Download the source code by clicking on `<> Code` & `Download ZIP` and extract its content.
<img width="410" height="532" alt="download" src="https://github.com/user-attachments/assets/012e59c0-9459-4536-8b66-17ab940854e5" />
2. Head to the three dotted menu inside chrome, `Settings` & `Add-ons`
3. Click on `Load unpacked extension`
4. Open the downloaded repository within the search explorer and click on `Select folder`

## Guide

> [!NOTE]
> The bot will send data only if the next song was selected.

If set up correctly, the add-on will send data of the song to the port `3001` of your host if a youtube song is being played back.
Below is an example of how to collect the data using JavaScript (intended for local usage):

```
const http = require("http");

const SERVER_PORT = 3001;
let currentSong;

const server = http.createServer((request, result) => {

    if (request.method === "POST" && request.url === "/song") {

        let body = "";

        request.on("data", chunk => {
            body += chunk.toString();
        });

        request.on("end", () => {

            try {

                const data = JSON.parse(body);

                if (typeof data.title == "string" && typeof data.author == "string") {

                    currentSong = {
                        title: data.title.trim(),
                        author: data.author.trim()
                    };

                    result.writeHead(200, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    });

                    result.end(JSON.stringify({ status: "ok" }));
                    return;

                }

            } catch (error) {
                // Ignore
            }

            result.writeHead(400, {
                "Access-Control-Allow-Origin": "*"
            });
            result.end();

        });

        return;

    }

    if (request.method === "OPTIONS") {

        result.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        });

        result.end();
        return;

    }

    result.writeHead(404);
    result.end();

});

function getCurrentSong() {
    return currentSong;
}

module.exports = { getCurrentSong };
```