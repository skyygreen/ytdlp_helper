// Generate button
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

// Copy button
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

document.addEventListener('DOMContentLoaded', function () {
    var optionalText = document.getElementById('optionalText');
    optionalText.addEventListener("input", function( ){
        setTimeout(() => {
            console.log('optinal text changed:',optionalText.value);
            chrome.storage.local.set({ 'optional_text': optionalText.value }, function() {
                console.log('optional text:', optionalText.value);
            });
        }, 100);
    });
});


// Initialize output format selection tab / optional text 
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['output_format','optional_text'],function(result){
        if (result.output_format) {
            document.getElementById('outputFormatSelect').value = result.output_format;
            console.log('initialized output format: ', result.output_format);
        }
        if (result.optional_text) {
            document.getElementById('optionalText').value = result.optional_text;
            console.log('initialized optional text: ', result.optional_text);
        }
    });
});  // not working