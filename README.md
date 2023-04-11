# RentEase
RentEase is a mobile application for finding and listing rental homes, apartments, or rooms. With RentEase, tenants can search for rental properties based on their preferences, location, and budget. Lessors can list their properties, manage inquiries, and communicate with potential tenants all in one place.

The app offers a unique feature where tenants can read reviews from previous tenants and current viewing renters about the place they are interested in. This authentic communication is something that other rental apps do not provide. Users can also add their comments about the place, with additional or missing information that shows up anonymously on the listing.

# Usage
To run the application on your local machine:
Ensure that you have a device emulator running or a physical device connected to your computer.
Run:

npx expo start OR npx expo start --tunnel

# First Iteration
## Features(Sujit)
This application allows users to:
* View a list of apartments.
* Search for apartments based on their title and address.
* View a list of apartments that match the search criteria.

## Features(Kshitij)
* Firebase - CRUD methods are added in an encapsulated manner for Creation of users (Auth + Firestore), Reading of Listings and Users and Deletion of Users
* Login/Signup - for Users with email and password
* User details page - Users can delete their profile from here
* Bottom Navigation bar - Two menus for now - Listing and User Profile (later will be moved to a hamburger menu)
* Stack Navigation - Between Login and SignUp Page

# Second Iteration 
## Features  (Sujit)
- Authentication
  - Anonymous login: The app allows users to log in anonymously without providing any personal information. This feature is       particularly useful for users who want to try out the app before creating an account.
  - Bookmarks tab: Users can bookmark their favorite rentals and access them easily from the bookmarks tab stored separately for each user in database.
- Camera 
  - Profile Picture:  Users can take a picture of themselves using their device's camera and use it as their profile picture.      This feature makes it easy for users to personalize their profiles and make them more recognizable to other users.
  
## Features (Kshitij)
  - CRUD: User's when signing up and now presented with a Profile Setup Page that takes in user details and stores it on Firestore. For this, the UUID of he Firebase Authentication is used in the 'user' field to make each entry unique and identifiable.
  - Location API: On the Profile Setup Page, users can also locate themselves using the Google Maps Location API that locattes the user with the GPS sensor (after asking permissions)
  - Reverse Geotagging API (External API): This API is used to figure out the Street Location of the user in {Number, Street, Locality, City, Province, Country, Postal Code} format and is used in the 'Location' field of the form for User Details.
  - Comment Modal: A modal is added on the RentalItem page which brings up a form for the user to be able to leave a TextInput for comments and a rating (0-10) for a particular listing. The CRUD for this is not enabled yet- I was running into issues with uniquely identifying the listing, so this is moved to Iteration 3 for now.
