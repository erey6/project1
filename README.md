# tree-placement-app 

An application that uses the City of Chicago's 311 Requests API to return data by ZIP code and status on resident requests for new trees. 

 #### Live site:
https://trees-app-a086f6.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/fc13a5e3-6d89-4e4f-9270-fb6f1a3a677f/deploy-status)](https://app.netlify.com/sites/trees-app-a086f6/deploys)

The goal of the project was to build an app that uses AJAX to make a request to an external API, incorporates responsive design and has one or more complex user interface modules. 

  - The app uses HTML, CSS JavaScript and JQuery.
  - The app gets data from https://data.cityofchicago.org/ and the Google Maps API.
  - The app uses fonts and mapping from Google.
  - Tree icon from from ICONS8.com. Info icon from fontawesome.

#### Approach:  

The APP makes a request to the API seeking results based on ZIP code. There are three variables that change in the API request.
  - One variable for the ZIP code being searched. 
  - One variable for how far back the data should go.
  - A last variable for whether the tree request is 'complete' or 'open.'

In results, the date of the request or completion is displayed with a 'more' button. The more button expands the area to give the user additional information. Additional information includes a map generated using the Google Maps API that receives a latitude and longitude from the 311 results.  


Because in some cases, there can be hundreds of results returned, the data is displayed over several pages.


#### Future upgrades: 

- I would change the date drop down to be by year: "2021 requests," "2020 requests" etc.
- There is still not enough room for some mobile devices and for the last list item on the page. It should be more responsive to smallest of devices.
- Return error for bad zip code or non integer input in main form.

