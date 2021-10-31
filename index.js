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
     sheets.spreadsheets.values.append({
        spreadsheetId: '1H_Z3GNWuOIb4xtjhToD7OVE3zcZDNDTQ3muX08E4SpU',
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                [
                    new Date().toLocaleDateString("en-US"),
                    req_x.body.user,
                    req_x.body.comment,
                    req_x.body.filename,
                ]
            ]
        }
     }, (err, res) => {
        console.log('callback entry');
        if (err) {
           console.log('The API returned an error: ' + err);
           res_x.status(500).send(err);
        }
        console.log("We got a response");
        console.log(JSON.stringify(res));
        res_x.status(200).send();
     })
  };
  