# Low Carbon Beef - GSheet Comment

This project is 1 of 3 repos that are used to create the [Low Carbon Beef App](https://app.lowcarbonranch.com/).

## Installation

Install with npm:
`npm install`

You will also need a `.env` file in the root of the project. If you don't have access to that file, create it, then add:
`GSHEET_ID=<your google sheet id>`
You can get the ID from the URL of the sheet (e.g. https://docs.google.com/spreadsheets/d/<id>/edit#gid=0)
You will also need a header row in the sheet with the following columns:
- Date Uploaded
- User
- Comment
- File_Name

## Running the app

In order to run this project locally run:
- `npm run`

Please be aware which GSheet you are uploading to. Try to stay out of production. There is a gsheet specifically created for testing in the zTEST folder.

## Deployment

Deployment lives solely in [GCP Functions](https://console.cloud.google.com/functions) for the Low Carbon Beef project. If you don't have access, reach out to Ryan Buchmeier, Allen DeHoff, or Colin Beal.

Deploy to test-function:
`gcloud functions deploy gsheet-comment-test --source=. --project=hallowed-nectar-326021`

Deploy to production-function:
`gcloud functions deploy gsheet-comment --source=. --project=hallowed-nectar-326021`
