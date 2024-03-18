// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'yt_dlp_command') {
        const ytDlpCommand = message.command;
        console.log('Received yt-dlp command:', ytDlpCommand);

        document.getElementById('ytDlpCommand').textContent = ytDlpCommand;
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var generateButton = document.getElementById('generateButton');

    // Add a click event listener to the button
    generateButton.addEventListener('click', function () {
        // Do something when the button is clicked
        console.log("generateButton clicked")

        // Send a message to background.js requesting command generation
        chrome.runtime.sendMessage({ action: "generate_command" }, function(ytDlpCommand) {
            // Handle response (ytDlpCommand)
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

// Output format button
document.addEventListener('DOMContentLoaded', function () {
    var outputFormatButton = document.getElementById('outputFormatSelect');
    outputFormatButton.addEventListener('change', function() {
        const selectedValue = this.value;
        chrome.storage.local.set({ 'output_format': selectedValue }, function() {
            console.log('Selected output format:', selectedValue);
        });
    });
});

// Initialize output format selection tab
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('output_format',function(result){
        if (result.output_format) {
            outputFormatSelect.value = result.output_format;
            console.log('initialised output format:', result.output_format);
        }
    });
}); // has intersections with initializeStorage() 