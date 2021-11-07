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
     let body;
     if (typeof(req_x.body === 'string')) {
        body = JSON.parse(req_x.body);
     } else {
        body = req_x.body;
     }
     const row = [
        new Date().toLocaleDateString("en-US"),
        body.user,
        body.comment,
        body.filename,
     ];
     sheets.spreadsheets.values.append({
        spreadsheetId: '1H_Z3GNWuOIb4xtjhToD7OVE3zcZDNDTQ3muX08E4SpU',
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                row
            ]
        }
     }, (err, res) => {
        if (err) {
           console.log('The API returned an error: ' + err);
           res_x.status(500).send(err);
        }
        res_x.status(200).send();
     })
  };
  