
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


function generateCommand(callback){
    var ytDlpCommand = `yt-dlp `;

    chrome.storage.local.get(['video_url','output_format'],function (result){ // add options inside [] TODO

        ytDlpCommand += result.video_url;
        if (result.output_format=='mp4') {
            ytDlpCommand += ' -f "bv*[vcodec^=avc]+ba[ext=m4a]/b[ext=mp4]/b"';
            console.log('output format :',result.output_format);
        } else if (result.output_format=='mp3') {
            ytDlpCommand += ' -x --audio-format mp3';
            console.log('output format :',result.output_format);
        } else if (result.output_format=='wav') {
            ytDlpCommand += ' -x --audio-format wav';
            console.log('output format :',result.output_format);
        } else {
            // ytDlpCommand += ' -f ' TODO
            console.log('output format currently unsupported: ',result.output_format);
        }
        callback(ytDlpCommand);
    })
}

// Listen for messages to generate command
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message contains a YouTube video URL
    if (message.action === 'generate_command') {
        
        // Generate yt-dlp command with the video URL
        generateCommand(function(ytDlpCommand) {
            console.log("Generated yt_dlp_command: ", ytDlpCommand);


            // Send back the ytDlpCommand
            sendResponse(ytDlpCommand);
            
        });
        return true;
    }
});
