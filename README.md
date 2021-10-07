# tree-placement-app 

An application that uses the City of Chicagos 311 Request's API to return data by ZIP code and status on resident requests for new trees. 

The goal of the project was to build an app that uses AJAX to make a request to an external API, incorporates responsive design and has one or more complex user interface modules. 

  - The app uses HTML, CSS JavaScript and JQuery.
  - The app gets data from https://data.cityofchicago.org/ and the Google Maps API.
  - The app uses fonts from Google.
  - Tree icon from from ICONS8.com. Info icon from fontawesome.

#### Approach:  

The APP makes a request to the API seeking results based on ZIP code. There are three variables that change in the API request.
  - One variable for the ZIP code being searched. 
  - One variable for how far back the data should go.
  - A last variable for whether the tree request is 'complete' or 'open.'

In results, the date of the request or completion is displayed with a 'more' button. The more button expands the area to give the user additional information.

Because in some cases, there can be hundreds of results returned, the data is displayed over several pages.
 #### Live site:
https://trees-app-a086f6.netlify.app/

#### Future upgrades: 

- I would change the date drop down to be by year: "2021 requests," "2020 requests" etc.
- There is still not enough room for some mobile devices and for the last list item on the page. It should be more responsive to smallest of devices.

