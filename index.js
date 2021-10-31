const {google} = require('googleapis');

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    keyFile: 'serviceCredentials.json',
  });
  const client = await auth.getClient();
  return google.sheets({version: 'v4', auth: client});
}

 exports.main = async (req_x, res_x) => {
     const sheets = await getSheetsClient();
     console.log('made sheets');
     sheets.spreadsheets.values.get({
         spreadsheetId: '1H_Z3GNWuOIb4xtjhToD7OVE3zcZDNDTQ3muX08E4SpU',
         range: 'Sheet1!A:C',
     }, (err, res) => {
         console.log('callback entry');
         if (err) {
            console.log('The API returned an error: ' + err);
            res.status(500).send(err);
         }
        const rows = res.data.values;
        console.log("no error");
        if (rows.length) {
            console.log("got rows");
            res.status(200).send(JSON.stringify(rows));
        } else {
            console.log("no data found");
            res.status(404).send('No data found.');
        }
     })
  };
  