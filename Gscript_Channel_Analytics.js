function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Youtube Data")
      .addItem("Get Channel Data", "getChannelData")
      .addToUi();
  }
  // onOpen function adds youtube data ui item that we can have add youtube channel id to channels infos as we want like channel title , Subcount, viewCount etc.
  function getChannelData() {
    var ui = SpreadsheetApp.getUi();
    var channelId = ui
      .prompt("Add the channel ID to fetch its analytics")
      .getResponseText();
    return channelListbyChannelId("snippet,contentDetails,statistics", {
      id: channelId,
    });
  }
  // getChannelData function gets prompts of channel id from the user to return it to the channelListbyChannelId function.
  function channelListbyChannelId(part, params) {
    var response = YouTube.Channels.list(part, params);
    if (response.items && response.items.length > 0) {
      var channel = response.items[0];
      var dataRow = [
        channel.id,
        channel.snippet.title,
        channel.snippet.title,
        channel.snippet.channel.statistics.subscriberCount,
      ];
      // channelListbyChannelId this function gets data from youtube data API and stores it into dataRow array. 
      SpreadsheetApp.getActiveSheet().appendRow(dataRow);
      // this method appends stored data in to the dataRow array to the spreadsheet row. 
    } else {
      Logger.log("Channel not found for the provided ID");
    }
  }