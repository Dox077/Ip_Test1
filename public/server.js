// const express = require('express');
// const { GoogleSpreadsheet } = require('google-spreadsheet');
// const publicIp = require('public-ip');

// const app = express();

// // Load your Google Sheets API credentials JSON here
// const credentials = require('./your-credentials.json');
// const doc = new GoogleSpreadsheet('1UDDarsUSFfdEhALQUlPvONklLpR0jzeV5kTaJ6Nslr4');

// app.use(express.static('public'));
// app.use(express.json());

// app.post('/track-ip', async (req, res) => {
//     try {
//         await doc.useServiceAccountAuth(credentials);
//         await doc.loadInfo();

//         const sheet = doc.sheetsByIndex[0]; // Assuming it's the first sheet.
//         const ipAddress = await publicIp.v4();
//         const currentTime = new Date().toLocaleString();

//         const newRow = {
//             IP_Address: ipAddress,
//             Timestamp: currentTime
//         };

//         await sheet.addRow(newRow);

//         // console.log('IP address added to Google Sheet:', newRow);

//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Error occurred.');
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     // console.log(`Server is running on port ${PORT}`);
// });
