// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a yt-dlp command
    if (message.type === 'yt_dlp_command') {
        // Get the yt-dlp command from the message
        const ytDlpCommand = message.command;

        // Update the popup UI to display the yt-dlp command
        document.getElementById('ytDlpCommand').textContent = ytDlpCommand;
    }
});
