// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a YouTube video URL
    if (message.type === 'video_url') {
        // Parse the video URL
        const videoUrl = message.url;

        // Generate yt-dlp command with the video URL
        const ytDlpCommand = `yt-dlp "${videoUrl}"`;

        // Send the yt-dlp command to the extension UI for display
        chrome.runtime.sendMessage({ type: 'yt_dlp_command', command: ytDlpCommand });
    }
});
