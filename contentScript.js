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
    // Store the extracted video URL to the background script
    var videoUrl = extractVideoUrl();
    if (videoUrl) {
        chrome.storage.local.set({ 'video_url': videoUrl }, function() {
            console.log('video_url stored:', videoUrl);
        });
    } else {
        console.log("No video found.");
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
