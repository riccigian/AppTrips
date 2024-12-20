# App Trips

App Trips is an Angular App that will be the main place for our users to see data about trips.

The App will have a home page that will list the trips returned by the list endpoint, with the name of the trip and its basic traits, as well as the trip's thumbnail. This won't display the description inside the trip structure The home page will allow you to sort the trips based on the quantifiable criteria: price, creationDate, rating, name.

- There will be a detail page that will be accessible from the home page, by tapping on the cell/row for a particular trip
- The detail page will display the photo of the trip in a bigger size, and all the data, including the description
- Navigation back and forth between detail and home should be possible
- If any kind of sorting is applied, and detail is opened, navigating to home should preserve this order.
- There should be a button that gives us the "trip of the day" on the home page. The trip of the day should not change during the navigation and will remain the same for the whole day.

# Bonus

Implement a score badge visible on each trip, it should be based on rating, nrOfRatings and co2 (there should be 3 tiers assignable to the resulting score). Here you can find the three tiers:

- average
- good
- awesome

# Technical details

In order to have App Trips working, you can use this API: https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/docs

# Considerations

- More trips and trip types can be added in the future
- We could have millions of trips available in the near future and we need to take into account the performance
- App Trips can have users in different countries
