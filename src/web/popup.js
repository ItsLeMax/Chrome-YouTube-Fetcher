document.addEventListener("DOMContentLoaded", () => {

    // Port input validation

    const port = document.getElementById("port");

    port.addEventListener("input", () => {

        if (port.value.length > 5)
            port.value = port.value.slice(0, -1);

    });

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