function sendToAirtable() {
  // Determine the data you want to send to Airtable
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Sheet1"); // Adjust the sheet name as needed
  var cellValue = sheet.getRange("H3").getValue(); // Adjust the cell reference as needed

  // Check if the cell value is not blank before sending data to Airtable
  if (cellValue !== "") {
    // Prepare the data to send in the HTTP request
    var payload = {
      sheetId: spreadsheet.getId(), // Google Sheets file ID
      sheetName: sheet.getName(), // Name of the active sheet
      body: cellValue
    };

    // Specify the webhook URL
    var webhookUrl = "https://balance.hellodowntime.com/awesomeendpoint";

    // Configure the HTTP options
    var options = {
      "method": "post", // or "get" depending on your webhook's requirements
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };

    // Make the HTTP request to Airtable
    var response = UrlFetchApp.fetch(webhookUrl, options);

    // Log the response (you can remove this if not needed)
    Logger.log(response.getContentText());
  } else {
    // Log a message indicating that the cell value is blank
    Logger.log("Cell value is blank. No data sent to Airtable.");
  }
}


function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);
    if (!postData || !postData.body) {
      throw new Error("Invalid JSON data or missing 'body' key.");
    }
    // Log the incoming data
    console.log('Received data:', JSON.stringify(e));
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Sheet1");
    var cellToUpdate = sheet.getRange("I3");
    cellToUpdate.setValue(postData.body);

    var response = {
      message: "Data received and cell updated successfully."
    };

    // Log the response
    console.log('Response:', JSON.stringify(responseData));

    // Return the response as JSON
    return ContentService.createTextOutput(JSON.stringify(responseData)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput("Error processing data").setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  // Get the value of the 'message' query parameter from the request
  var message = e.parameter.message;

  // Process the received data based on whether it's a URL or not
  if (isURL(message)) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Sheet1");
    var urlCell = sheet.getRange("J3");
    
    var link = '=HYPERLINK("' + message + '", "Click Here to See Your Tub!")';
    
    urlCell.setValue(link);
    
  } else {
    // Handle non-URL data (assuming it's descriptive text)
    Logger.log("Received message: " + message);

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Sheet1");
    var cellToUpdate = sheet.getRange("I3");
    var adjacentCell = sheet.getRange("H3");
    
    var html = message;
    
    cellToUpdate.setValue(html);

    // Clear everything in the adjacent cell (J2)
    adjacentCell.clearContent();
  }

  // Return a response (in this case, we'll just return a simple message)
  return ContentService.createTextOutput("Received and processed message: " + message);
}

// Function to check if a given string is a URL
function isURL(str) {
  // You can implement a URL validation logic here
  // For a simple check, you can look for 'http://' or 'https://' in the string
  return str.startsWith("http://") || str.startsWith("https://");
}
