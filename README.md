# tree-placement-app 

An application that uses the City of Chicagos 311 Request's API to return data by ZIP code and status on resident requests for new trees. 


The goal of the project was to build an app that uses AJAX to make a request to an external API, incorporates responsive design and has one or more complex user interface modules. 


  - The app uses HTML, CSS JavaScript and JQuery.

#### Approch:  

My first approach was to first build the app to return all tree planting requests for all dates, completed or not completed for the requested ZIP code. And then the app would filter those results.

But I found it easier to filter via the API request. There are three variables that change in the API request.
  - One variable for how far back the data should go.
  - One variable for the ZIP code being searched. 

One of the main challenges I ran into was working with the ISO dates. 

Another challenge after I completed the basic functional app was adding paging. 


future add sort
add map