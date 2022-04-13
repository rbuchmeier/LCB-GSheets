const {google} = require('googleapis');
const { GSHEET_ID } = require('./config');

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    keyFile: 'serviceCredentials.json',
  });
  const client = await auth.getClient();
  return google.sheets({version: 'v4', auth: client});
}

 exports.main = async (req_x, res_x) => {
     const headers = {
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
       "Access-Control-Allow-Headers": "Content-Type",
       "Access-Control-Max-Age": 2592000, // 30 days
     };
     if (req_x.method === "OPTIONS") {
        res_x.writeHead(204, headers);
        res_x.end();
        return;
     }
     const sheets = await getSheetsClient();
     let body;
     if (typeof(req_x.body) === 'string') {
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

     console.log("body", body);
     let master_gsheet_id = GSHEET_ID;
     await write_row_to_gsheet(row, master_gsheet_id);

     if (body.gsheet_id) {
         console.log("gsheet_id", body.gsheet_id);
         let user_gsheet_id = body.gsheet_id;
         await write_row_to_gsheet(row, user_gsheet_id);
     }

     res_x.writeHead(200, headers);
     res_x.end(JSON.stringify({status: 200, message: "Successfully updated spreadsheet"}));
  };

async function write_row_to_gsheet(row, gsheet_id) {
   const sheets = await getSheetsClient();
   sheets.spreadsheets.values.append({
      spreadsheetId: gsheet_id,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
            values: [
                  row
            ]
      }
   })
};
