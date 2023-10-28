// Define your client ID (replace with your actual value)
const CLIENT_ID = '1023049278699-489s2oqrr75au1a0e214hjvtqr99kfbk.apps.googleusercontent.com';
const SPREADSHEET_ID = '1UDDarsUSFfdEhALQUlPvONklLpR0jzeV5kTaJ6Nslr4';

// Array with Google Sheets API discovery documents
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorized scopes
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Initialize the Google API client
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
function initClient() {
  gapi.client.init({
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  }).then(function () {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Enable the "Store IP Address" button
    document.getElementById('storeButton').disabled = false;
  });
}

function updateSigninStatus(isSignedIn) {
  if (!isSignedIn) {
    // User is not signed in, disable the "Store IP Address" button
    document.getElementById('storeButton').disabled = true;
  }
}

// Handle the click event of the "Store IP Address" button
document.getElementById('storeButton').addEventListener('click', storeIpAddress);

// Function to fetch IP address
function storeIpAddress() {
  fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      appendIpAddressToSheet(ipAddress);
    })
    .catch(error => {
      console.error('Error fetching IP address:', error);
    });
}

// Function to append the IP address to the Google Sheet
function appendIpAddressToSheet(ipAddress) {
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Ip', // Update with your sheet name and range
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[ipAddress]],
    },
  }).then(function (response) {
    console.log('IP Address stored in Google Sheet:', response);
    alert('IP Address stored in Google Sheet');
  }).catch(function (error) {
    console.error('Error storing IP address in Google Sheet:', error);
    alert('Failed to store IP address in Google Sheet');
  });
}
