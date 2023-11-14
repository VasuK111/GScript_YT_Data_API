// Get the active spreadsheet
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

// Triggered when the Google Sheets document is opened
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  // Create a custom menu named "Youtube Data"
  var YouTubeData = ui.createMenu('Youtube Data')
  
  // Add menu items and associate them with corresponding functions
  YouTubeData.addItem("Get Channel Data", 'getChannelData')
    .addToUi();
  
  // Add another menu item for fetching channels
  YouTubeData.addItem("Get Channels", 'GetChannels').addToUi();
}

// Function to get YouTube channel data
function getChannelData() {
  var ui = SpreadsheetApp.getUi();
  
  // Prompt the user to input a YouTube channel ID
  var channelId = ui.prompt("Add the channel ID to fetch its analytics").getResponseText();
  
  // Call the function to retrieve and append channel data
  return channelListbyChannelId('snippet,contentDetails,statistics', { 'id': channelId });
}

// Function to retrieve channel data by channel ID
function channelListbyChannelId(part, params) {
  // Make a request to the YouTube Data API
  var response = YouTube.Channels.list(part, params);

  if (response.items && response.items.length > 0) {
    // Extract relevant channel information from the API response
    var channel = response.items[0];
    
    // Calculate average views per video
    var totalView = channel.statistics.viewCount;
    var totalVideos = channel.statistics.videoCount;
    var avgViews = totalView / totalVideos;
    
    // Construct an array with channel data
    var dataRow = [
      channel.id,
      channel.snippet.title,
      channel.snippet.title,  // (Note: Duplicate entry, consider correcting it)
      channel.snippet.email,  // (Note: Check if email is available before accessing)
      channel.statistics.subscriberCount,
      channel.statistics.viewCount,
      channel.statistics.videoCount,
      avgViews
    ];
    
    // Get the first sheet in the spreadsheet and append the data
    var firstSheet = spreadsheet.getSheets()[0];
    firstSheet.appendRow(dataRow);
    
    // Return the spreadsheet
    return spreadsheet;
  } else {
    // Log an error message if the channel is not found
    Logger.log("Channel not found for the provided ID");
  }
}

