// The onOpen function creates a custom menu in the Google Sheets UI named "Youtube Data."
// It adds a menu item labeled "Get Channel Data" that calls the getChannelData function.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Youtube Data')
    .addItem("Get Channel Data", 'getChannelData')
    .addToUi();
}

// The getChannelData function prompts the user to input a YouTube channel ID.
// It then calls the channelListbyChannelId function with the specified data part and the user-provided channel ID.
function getChannelData() {
  var ui = SpreadsheetApp.getUi();
  var channelId = ui.prompt("Add the channel ID to fetch its analytics").getResponseText();
  return channelListbyChannelId('snippet,contentDetails,statistics', { 'id': channelId });
}

// The channelListbyChannelId function retrieves data from the YouTube Data API
// and stores it in the dataRow array. It appends the data to the active spreadsheet.
function channelListbyChannelId(part, params) {
  var response = YouTube.Channels.list(part, params);

  if (response.items && response.items.length > 0) {
    var channel = response.items[0];
    var dataRow = [
      channel.id,
      channel.snippet.title,
      channel.snippet.title,  // This looks like a duplicate, consider correcting it
      channel.snippet.email,  // You're trying to access email, but it's not part of the 'snippet'
      channel.statistics.subscriberCount,
      channel.statistics.viewCount,
      channel.statistics.videoCount,
      channel.contentOwnerDetails.contentOwner,
    ];

    // The channelListbyChannelId function retrieves data from the YouTube Data API
    // and stores it in the dataRow array. It appends the data to the active spreadsheet.
    SpreadsheetApp.getActiveSheet().appendRow(dataRow);

    // This method appends the stored data from the dataRow array to a new row in the spreadsheet.
  } else {
    Logger.log("Channel not found for the provided ID");
  }
}

