// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a yt-dlp command
    if (message.type === 'yt_dlp_command') {
        // Get the yt-dlp command from the message
        const ytDlpCommand = message.command;
        console.log('Received yt-dlp command:', ytDlpCommand);

        // Update the popup UI to display the yt-dlp command
        document.getElementById('ytDlpCommand').textContent = ytDlpCommand;
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Find the button element by its ID
    var generateButton = document.getElementById('generateButton');

    // Add a click event listener to the button
    generateButton.addEventListener('click', function () {
        // Do something when the button is clicked
        console.log("generateButton clicked")

        chrome.storage.local.get('yt_dlp_command', function(data) {
            var ytDlpCommand = data.yt_dlp_command;
            if (ytDlpCommand) {
                console.log('Retrieved yt_dlp_command:', ytDlpCommand);
                document.getElementById('ytDlpCommand').textContent = ytDlpCommand;
            } else {
                console.log('No yt_dlp_command stored.');
                document.getElementById('ytDlpCommand').textContent = 'No yt_dlp_command stored.';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Find the button element and text to copy by its ID
    var copyButton = document.getElementById('copyButton');
    // Add a click event listener to the button
    copyButton.addEventListener('click', function() {
            // Do something when the button is clicked
            var ytDlpCommand = document.getElementById('ytDlpCommand').textContent;
            //ytDlpCommand="AAA";
            console.log("copyButton clicked with ", ytDlpCommand);
            var textarea = document.createElement('textarea');
            textarea.value = ytDlpCommand;
            document.body.appendChild(textarea);

            // Select and copy the text
            textarea.select();
            document.execCommand('copy');

            // Remove the textarea element
            document.body.removeChild(textarea);
        });
});