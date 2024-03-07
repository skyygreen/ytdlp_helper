// contentScript.js

// Function to extract video URL
function extractVideoUrl() {
    var currentUrl = window.location.href;
    // Different actions for each media 
    if (currentUrl.includes('youtube.com') || currentUrl.includes('youtu.be') ){
        // Different actions for page types TODO 
        if (currentUrl.includes('watch')){
            return currentUrl;
        } else if(currentUrl.includes('playlist?')){
            return currentUrl;
        } else {
            console.log("Not a video or playlist page.");
            return null;
        }
    } else if (currentUrl.includes('tiktok.com')) {
        // Different actions for page types TODO 
        if (true){
            return currentUrl;
        } else{
            console.log("Not a video or playlist page.");
            return null;
        }
    } else {
        const videoElement = document.querySelector('video'); // random code. need to find out how to extract urls for each website TODO
        if (videoElement) {
            var videoUrl=videoElement.getAttribute('src'); 
            console.log('Found video element:',videoUrl); 
            return videoUrl; 
        }
        return null;
    }
}

// Send the extracted video URL to the background script
const videoUrl = extractVideoUrl();
if (videoUrl) {
    chrome.runtime.sendMessage({ type: 'video_url', url: videoUrl });
}
