
// Function to set initial values in storage
function initializeStorage() {
    chrome.storage.local.set({ 'yt_dlp_command': "generate command" });
    // Check if the output_format has already been set
    chrome.storage.local.get("output_format", function (result) {
        // If the output_format is not found in storage, set it to a default value
        if (!result.output_format) {
            chrome.storage.local.set({ 'output_format': 'mp4' });
        }
    });
}

// Event listener for onInstalled event
chrome.runtime.onInstalled.addListener(function () { 
    initializeStorage();
});


function generateCommand(videoUrl, callback){
    var ytDlpCommand = `yt-dlp "${videoUrl}"`;

    chrome.storage.local.get(['output_format'],function (result){ // add options inside [] TODO
        if (result.output_format=='mp4') {
            ytDlpCommand += ' -f "bv*[vcodec^=avc]+ba[ext=m4a]/b[ext=mp4]/b"';
            console.log('output format :',result.output_format);
        } else if (result.output_format=='mp3') {
            ytDlpCommand += ' --extract-audio --audio-format mp3';
            console.log('output format :',result.output_format);
        } else if (result.output_format=='wav') {
            ytDlpCommand += ' --extract-audio --audio-format wav';
            console.log('output format :',result.output_format);
        } else {
            // ytDlpCommand += ' -f ' TODO
            console.log('output format currently unsupported: ',result.output_format);
        }
        callback(ytDlpCommand);
    })
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a YouTube video URL
    if (message.type === 'video_url') {
        // Parse the video URL
        const videoUrl = message.url;
        
        // Generate yt-dlp command with the video URL
        generateCommand(videoUrl,function(ytDlpCommand) {
            console.log("Generated yt_dlp_command: ", ytDlpCommand);


            // Store the yt_dlp_command in Chrome's storage
            chrome.storage.local.set({ 'yt_dlp_command': ytDlpCommand }, function() {
                console.log('yt_dlp_command stored:', ytDlpCommand);
            });
        })

    }
});
