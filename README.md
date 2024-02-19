# Rick and Morty API Challenge

_George Ndirangu_

For this challenge i used the latest version of next, v14. I used app routing as opposed to page routing.I have all my files in the app folder, with the frontend code in the (frontend) folder and the backend code in the api folder

### REST vs GRAPHQL

I choose to go with GraphQL since i found it to be a better fit for this use case than REST. If i were to use rest, i would have had to perform multiple api calls to get location data filtered by episodes or character names, but with graphQL, I simply declare whatever data I need and fetch it in a single query

### How I strcutured the app

I defined two endpoints on nextjs, `/location` and `/resident`.

I use the `/location` endpoint to fetch location data and perform filtering. I make the necessary graphQL requests from the backend, transform the response from rick-and-morty into the format my frontend expects and then send the data to my frontend.

In a similar manner, I use the `resident` endpoint to fetch a character's full profile and send it to my frontend

### Persistence

I choose to use Local Storgae for this app. I found it sufficient for this use case, since what we basically need is a key-value store to store each charatcer's notes. Data stored in LocalStorage stays there unless a user clears it and is specific to the domain. So it meets our needs.

### Typescript

I used typescript for this project. I like to take advantage of the static type checking and autocomplete features. I also used graphql-codegen to generare types for my graphQL queries
