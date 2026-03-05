function extractSong() {

    // Load title, author/uploader and thumbnail

    const titleElement = document.querySelector("#below #title h1");
    const authorElement = document.querySelector("#upload-info a");

    const title = titleElement?.textContent;
    const author = authorElement?.textContent;
    const thumbnail = `https://i.ytimg.com/vi/${window.location.href.split("?v=").join("&").split("&")[1]}/maxresdefault.jpg`;

    // In case the website hasn't loaded yet

    if (!title || !author)
        return;

    // Send data to background.js

    chrome.runtime.sendMessage({
        type: "SONG_UPDATE",
        title: title.trim(),
        author: author.trim(),
        thumbnail: thumbnail
    });

}

setInterval(extractSong, 500);