function Video_with_stats(){

    //declare your spreadsheet variable to get data in desired one
    var sheeetID = "YOUR_SPREADSHEET_ID"
    var spreadsheet = SpreadsheetApp.openById(sheeetID)
    // variable declared to get first sheet 
    var activeSheet = spreadsheet.getSheets()[0]
  
    //youtube api called
    var search = YouTube.Search.list("snippet, id", {q:"YOUR_SEARCH_KEYWORD", maxResults: 50})
    var results = search.items.map((item) =>[item.id.videoId, item.snippet.title, item.snippet.publishedAt])
    var ids = results.map((id) => id[0]).join(",")
    var stats = YouTube.Videos.list("statistics", {id:ids})
    var videoStats = stats.items.map((item) => [item.statistics.viewCount, item.statistics.likeCount, item.statistics.dislikeCount])
    activeSheet.getRange(2, 1, results.length, results[0].length).setValues(results)
    activeSheet.getRange(2, 3, videoStats.length, results[0].length).setValues(videoStats)
    
  }
  
  
   function Search_by_keyword(){
  
    var sheeetID = "YOUR_SPREADSHEET_ID"
    var spreadsheet = SpreadsheetApp.openById(sheeetID)
    var activeSheet = spreadsheet.getSheets()[0]
    var search = YouTube.Search.list("snippet, id", {q:"YOUR_SEARCH_KEYWORD", maxResults: 50})
    var results = search.items.map((item) =>[item.id.videoId, item.snippet.title, item.snippet.publishedAt])
    activeSheet.getRange(2, 1, results.length, results[0].length).setValues(results)
  
    }
  