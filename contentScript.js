// contentScript.js

// Function to extract video URL
function extractVideoUrl() {
    // if youtube,
    if (window.location.href.includes('youtube.com') || window.location.href.includes('youtu.be') ){
        
        // if the page is the "watch" page TODO
        if (true){
            return window.location.href;
        } else{

        }
    } else{
        const videoElement = document.querySelector('video'); // random code. need to find out how to extract urls for each website TODO
        if (videoElement) {
            videoUrl=videoElement.getAttribute('src'); 
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
