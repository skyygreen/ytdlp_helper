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
            return videoUrl; 
        }
        return null;
    }
}

function handleUrlChange(){
    // Send the extracted video URL to the background script
    console.log("handleUrlChange");
    var videoUrl = extractVideoUrl();
    if (videoUrl) {
        console.log("URL: ",videoUrl);
        chrome.runtime.sendMessage({ type: 'video_url', url: videoUrl });
    } 
}
// Initialize
console.log("initialize contentScript.js")
handleUrlChange();

// Triggers each time url is refreshed
window.navigation.addEventListener("navigate", (event) => {
    // Delay accessing window.location.href to ensure it reflects the new URL
    setTimeout(() => {
        console.log('URL changed:', window.location.href);
        handleUrlChange();
    }, 100); // Adjust the timeout duration as needed
})
