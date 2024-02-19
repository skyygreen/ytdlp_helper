// contentScript.js

// Function to extract video URL
function extractVideoUrl() {
    const videoElement = document.querySelector('video');
    if (videoElement) {
        return videoElement.src;
    }
    return null;
}

// Send the extracted video URL to the background script
const videoUrl = extractVideoUrl();
if (videoUrl) {
    chrome.runtime.sendMessage({ type: 'video_url', url: videoUrl });
}
