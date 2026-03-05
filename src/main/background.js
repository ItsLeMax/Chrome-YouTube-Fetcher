let lastSong;

chrome.runtime.onMessage.addListener((message) => {

    if (message.type != "SONG_UPDATE")
        return;

    // Don't spam the server if the title and author have not changed

    if (lastSong?.title == message.title && lastSong?.author == message.author)
        return;

    // Cache for the check above and for requests of the receiver

    lastSong = {
        title: message.title,
        author: message.author,
        thumbnail: message.thumbnail
    };

    console.log(lastSong);

    // Send song to receiver (like a twitch bot)

    fetch("http://localhost:3001/song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lastSong)
    }).catch(_error => {
        // Receiver on localhost:3001 not reachable; ignoring...
    });

});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {

    // Respond to song request (like in the popup of the extension)

    if (msg.type === "GET_STATUS")
        sendResponse({ song: lastSong });

});

// Update already opened youtube tabs

chrome.tabs.query({ url: "*://www.youtube.com/watch*" }, (tabs) => {
    for (const tab of tabs) {
        injectContentScript(tab.id);
    }
});

// Listen to tab updates

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch") && changeInfo.status === "complete") {
        injectContentScript(tabId);
    }
});

/**
 * @description Injects content.js into a tab
 * @author ItsLeMax
 * @param { Number|String } tabId Tab id of the browsers tab
 * @since 1.0.0 
 */
function injectContentScript(tabId) {

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["main/content.js"]
    });

}