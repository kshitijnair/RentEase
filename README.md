# RentEase
RentEase is a mobile application for finding and listing rental homes, apartments, or rooms. With RentEase, tenants can search for rental properties based on their preferences, location, and budget. Lessors can list their properties, manage inquiries, and communicate with potential tenants all in one place.

The app offers a unique feature where tenants can read reviews from previous tenants and current viewing renters about the place they are interested in. This authentic communication is something that other rental apps do not provide. Users can also add their comments about the place, with additional or missing information that shows up anonymously on the listing.

# Usage
To run the application on your local machine:
Ensure that you have a device emulator running or a physical device connected to your computer.
Run:

`npx expo start` OR `npx expo start --tunnel`

# First Iteration
## Features (Sujit)
This application allows users to:
* View a list of apartments.
* Search for apartments based on their title and address.
* View a list of apartments that match the search criteria.

## Features (Kshitij)
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


 <p float="left"> 
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/0014cf26-1e84-423d-b1df-118c9e3d3031" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/5e14b808-4f5c-4a92-89d7-9de564656813" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/c9c0de5c-23e3-4d00-a6dc-978be6714e93" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/3377d5e4-8d5e-4d6f-84df-24e7ca36abb3" width="150" height="280">
</p>

## Features (Kshitij)
- Authentication: User Login and Signup added. User is asked more details when Signing Up and these are stored in a Firestore Document in the 'Users' Collection.
- CRUD: User's when signing up and now presented with a Profile Setup Page that takes in user details and stores it on Firestore. For this, the UUID of he Firebase Authentication is used in the 'user' field to make each entry unique and identifiable.
- Location API: On the Profile Setup Page, users can also locate themselves using the Google Maps Location API that locattes the user with the GPS sensor (after asking permissions)
- Reverse Geocoding API (External API): This API is used to figure out the Street Location of the user in {Number, Street, Locality, City, Province, Country, Postal Code} format and is used in the 'Location' field of the form for User Details.
- Comment Modal: A modal is added on the RentalItem page which brings up a form for the user to be able to leave a TextInput for comments and a rating (0-10) for a particular listing. The CRUD for this is not enabled yet- I was running into issues with uniquely identifying the listing, so this is moved to Iteration 3 for now.
 <p float="left"> 
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/44ebb282-5b58-4fca-86aa-9b3e0fc62982" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/4a268083-e551-44e3-9306-e4a798389f52" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/3df69f5b-1054-4735-aabb-3561f04a7d57" width="150" height="280">

<img src="https://media.github.khoury.northeastern.edu/user/14110/files/0028ca7a-3ec0-4cc1-8832-293be34537d9" width="150" height="280">

</p>

# Third Iteration 
## Features  (Sujit)
- Notification
 - To ensure that users don't forget about their scheduled home appointments, a reminder notification will be sent to them prior to the appointment time. For testing, a reminder notification will be sent to users 30 seconds prior to their scheduled home appointment. However, in practice,  the notification be sent at least 30 minutes before the appointment time. This will provide users with enough time to prepare and make any necessary arrangements before the scheduled appointment.
 <p float="left"> 
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/8ad6aaee-e103-4a52-9928-cf9308790ade" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/63ae4daa-ebc4-4310-ae86-7da6637385cd" width="150" height="280">
<img src="https://media.github.khoury.northeastern.edu/user/14110/files/23627aea-c74e-42c7-8b9b-9fdda5dbb99e" width="150" height="280">
</p>

## Features (Kshitij)
- Added Comments
  - User can now add comments to each listing with a review text and rating (0-5)
  - Comments are listing specific, but visible to everyone using the app anonymously.
- Added Bookings
  - User can now create bookings (Anonymous user is allowed to make bookings for now, there is a route bug that needs to be fixed to enable proper flow for anonymoususers)
  - Bookings are made with selected date and time, notes are optional.
  - User has the ability to cancel a booking from their profile as well.
- Design
  - App was designed from last iteration to look more aesthetic. More design changes will be made before the presentation.
