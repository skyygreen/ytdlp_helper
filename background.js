
// Function to set initial values in storage
function initializeStorage() {
    // Check if the username has already been set
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


function generateCommand(videoUrl){
    var ytDlpCommand = `yt-dlp "${videoUrl}"`;

    if (chrome.storage.local.get('output_format')=='mp4') {
        ytDlpCommand += ' -f "bv*[vcodec^=avc]+ba[ext=m4a]/b[ext=mp4]/b"';
    } else {
        // ytDlpCommand += ' -f ' TODO
        console.log('output format currently unsupported');
    }

    return ytDlpCommand;
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a YouTube video URL
    if (message.type === 'video_url') {
        // Parse the video URL
        const videoUrl = message.url;
        
        var ytDlpCommand = generateCommand(videoUrl)

        // Generate yt-dlp command with the video URL
        console.log("Generated command: ", ytDlpCommand);

        // Send the yt-dlp command to the extension UI for display
        //chrome.runtime.sendMessage({ type: 'yt_dlp_command', command: ytDlpCommand });


        // Store the yt_dlp_command in Chrome's storage
        chrome.storage.local.set({ 'yt_dlp_command': ytDlpCommand }, function() {
          console.log('yt_dlp_command stored:', ytDlpCommand);
        });

        chrome.storage.local.get('yt_dlp_command', function(data) {
            var test = data.yt_dlp_command;
            if (test) {
                console.log('Retrieved yt_dlp_command:', test);
            } else {
                console.log('No yt_dlp_command stored.');
            }
        });
    }
});
