document.addEventListener("DOMContentLoaded", () => {

    // Request song

    chrome.runtime.sendMessage({ type: "GET_STATUS" }, (response) => {

        // Update display of popup with response

        const song = document.getElementById("song");
        const author = document.getElementById("author");
        const thumbnail = document.getElementById("thumbnail");

        song.textContent = response.song?.title || "//";
        author.textContent = response.song?.author || "//";
        thumbnail.src = response.song?.thumbnail || "";

    });

});