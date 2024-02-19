// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a YouTube video URL
    if (message.type === 'video_url') {
        // Parse the video URL
        const videoUrl = message.url;
        

        // Generate yt-dlp command with the video URL
        const ytDlpCommand = `yt-dlp "${videoUrl}"`;
        console.log("Generated command: ",ytDlpCommand)

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
