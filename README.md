# PawfectMatch

## Project Description

**PawfectMatch** is a user-friendly web application designed to connect loving homes with pets in need. The platform serves as a bridge between animal shelters and potential adopters, providing a seamless experience for discovering, interacting with, and adopting pets. With a focus on creating a personalized experience, PawfectMatch enables users to search, filter, and save their favorite pets, submit adoption requests, and communicate directly with shelters. Whether you're looking to adopt a new furry friend or manage pets at a shelter, PawfectMatch is designed to make the process efficient and rewarding.

### Problem

**PawfectMatch** is needed because the current pet adoption process is fragmented, with limited search capabilities and poor communication between adopters and shelters. Shelters also face challenges like outdated systems, resource constraints, and limited exposure. PawfectMatch addresses these issues by providing a centralized, user-friendly platform that streamlines searches, enhances communication, and increases visibility, making pet adoption more efficient and accessible.

## User Profile

**PawfectMatch** will be used by two primary groups: potential pet adopters and animal shelter staff.

**Potential Adopters** : Individuals or families looking to adopt a pet. They will use the app to search for pets that match their preferences, save favorites, submit adoption requests, and communicate with shelters. Considerations include a user-friendly interface, personalized search filters, and seamless communication tools.

**Shelter Staff** : Employees or volunteers managing pet adoptions. They will use the app to list available pets, manage adoption requests, and communicate with potential adopters. Considerations include easy-to-use management tools, efficient handling of inquiries, and resource-constrained environments.

## Features

- **User Registration & Profiles**: Secure user accounts with personalized profiles, supporting roles for adopters, shelter staff, and administrators.
- **Pet Listings**: Comprehensive profiles for each pet, including photos, health status, and other key details.
- **Advanced Search & Filters**: Easily find pets by species, breed, age, size, and more.
- **Adoption Requests**: Submit and track adoption requests directly through the platform.
- **Messaging System**: Built-in messaging for seamless communication between adopters and shelters.
- **Favorites**: Save and manage a list of pets you’re interested in adopting.
- **Reviews & Ratings**: Share your adoption experience and read reviews from other users.
- **Shelter Management**: Tools for shelters to manage their pet listings, view adoption requests, and communicate with potential adopters.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, React.js ,React Native
- **Backend**: Node.js, Express.js Firebase
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) / OAuth
- **Hosting**: Render / Netlify
- **Version Control**: Git & GitHub
-

## Sitemap

- **Home Page** : Overview of the app with a welcome message and featured pets. Includes navigation links to other sections.
- **Search Pets** : A searchable and filterable database of available pets. Users can filter by species, breed, age, size, location, and other attributes.

**Pet Details Page** : Detailed information about a selected pet, including photos, description, health status, and adoption requirements. Includes options to save the pet or start an adoption inquiry.

**Favorites** : A personalized page where users can view and manage the pets they have saved as favorites.

**Adoption Application** : A form where users can submit their adoption request for a specific pet, including personal details, home environment, and other relevant information.

**Messages/Communication** : A messaging system that allows users to communicate directly with shelters regarding adoption inquiries or questions about specific pets.

**Shelter Dashboard (Shelter Staff)** : A management page for shelter staff to list new pets, update pet information, review adoption applications, and communicate with potential adopters.

**User Profile** : A page where users (adopters and shelter staff) can manage their personal information, view their activity, and update their preferences.

**Login/Sign Up** : Pages for users to create an account or log into their existing account.
**Admin Panel (Optional)** : A backend page for app administrators to manage users, review platform activity, and perform maintenance tasks.

## Data Model

### Data Entities and Relationships

1. **User**

   - **Attributes**: `UserID`, `Name`, `Email`, `Password`, `UserType` (Adopter/Shelter Staff), `ContactInfo`, `ProfilePicture`
   - **Relationships**:
     - Has many **FavoritePets**.
     - Can submit many **AdoptionRequests**.
     - Shelter Staff Users manage multiple **Pets**.

2. **Pet**

   - **Attributes**: `PetID`, `Name`, `Species`, `Breed`, `Age`, `Size`, `Gender`, `HealthStatus`, `Description`, `Photos`, `ShelterID`, `AvailabilityStatus`
   - **Relationships**:
     - Belongs to one **Shelter**.
     - Can have many **AdoptionRequests**.

3. **Shelter**

   - **Attributes**: `ShelterID`, `ShelterName`, `Location`, `ContactInfo`, `StaffUsers` (references `UserID`)
   - **Relationships**:
     - Has many **Pets**.
     - Can receive multiple **AdoptionRequests**.

4. **AdoptionRequest**

   - **Attributes**: `RequestID`, `UserID`, `PetID`, `SubmissionDate`, `Status` (Pending/Approved/Rejected), `Comments`
   - **Relationships**:
     - Belongs to one **User** (Adopter).
     - Belongs to one **Pet**.

5. **FavoritePets**
   - **Attributes**: `FavoriteID`, `UserID`, `PetID`
   - **Relationships**:
     - Belongs to one **User**.
     - References one **Pet**.

## Endpoints

### 1. User Endpoints

- **POST /signup**

  - **Description**: Register a new user.
  - **Parameters**: `Name`, `Email`, `Password`, `UserType`
  - **Response**:
    ```json
    { "status": "success", "message": "User registered successfully." }
    ```

- **POST /login**

  - **Description**: Log in an existing user.
  - **Parameters**: `Email`, `Password`
  - **Response**:
    ```json
    { "status": "success", "token": "jwt_token" }
    ```

- **GET /profile**
  - **Description**: Get user profile information.
  - **Parameters**: JWT Token
  - **Response**:
    ```json
    {
      "userID": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "Adopter"
    }
    ```

### 2. Pet Endpoints

- **GET /pets**

  - **Description**: Retrieve a list of pets with optional filters.
  - **Parameters**: `Species`, `Breed`, `Age`, `Size`, `Location`
  - **Response**:
    ```json
    [
      { "petID": 1, "name": "Buddy", "species": "Dog", "breed": "Labrador", "age": 3, "size": "Large", "location": "NY" },
      ...
    ]
    ```

- **GET /pets/{petID}**

  - **Description**: Get details of a specific pet.
  - **Parameters**: `petID`
  - **Response**:
    ```json
    {
      "petID": 1,
      "name": "Buddy",
      "species": "Dog",
      "breed": "Labrador",
      "age": 3,
      "size": "Large",
      "description": "Friendly and energetic.",
      "photos": ["url1", "url2"],
      "shelterID": 2
    }
    ```

- **POST /pets**
  - **Description**: Shelter staff can add a new pet.
  - **Parameters**: JWT Token, Pet Data (`Name`, `Species`, `Breed`, `Age`, `Size`, etc.)
  - **Response**:
    ```json
    { "status": "success", "message": "Pet added successfully." }
    ```

### 3. Adoption Request Endpoints

- **POST /adoption-requests**

  - **Description**: Submit a new adoption request.
  - **Parameters**: JWT Token, `PetID`, `UserID`, `Comments`
  - **Response**:
    ```json
    { "status": "success", "message": "Adoption request submitted." }
    ```

- **GET /adoption-requests/{userID}**
  - **Description**: Retrieve all adoption requests made by a specific user.
  - **Parameters**: JWT Token, `UserID`
  - **Response**:
    ```json
    [
      { "requestID": 1, "petID": 1, "status": "Pending", "submissionDate": "2023-08-01", "comments": "I have a large yard." },
      ...
    ]
    ```

### 4. Favorite Pets Endpoints

- **POST /favorites**

  - **Description**: Save a pet to favorites.
  - **Parameters**: JWT Token, `PetID`
  - **Response**:
    ```json
    { "status": "success", "message": "Pet added to favorites." }
    ```

- **GET /favorites/{userID}**
  - **Description**: Retrieve a list of favorite pets for a user.
  - **Parameters**: JWT Token, `UserID`
  - **Response**:
    ```json
    [
      { "petID": 1, "name": "Buddy", "species": "Dog", "breed": "Labrador" },
      ...
    ]
    ```

## Authentication/Authorization (Auth)

- **JWT-Based Authentication**:

  - JSON Web Tokens (JWT) are used for secure authentication. Upon successful login, a JWT is generated and stored on the client-side.

- **Role-Based Access Control (RBAC)**:

  - Users are assigned roles (Adopter or Shelter Staff) during registration. Access to specific endpoints and actions is restricted based on the user’s role.

- **Token Verification**:
  - Each request to protected endpoints requires a valid JWT in the Authorization header. The server verifies the token before granting access.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL database set up
- Git installed

### Installation

1. Clone the repository:

   ```bash

   ```

### Client

git clone https://github.com/bernard493/HappyPaws

````


```bash
### Server
git clone https://github.com/bernard493/HappyPaws-server
````

2. Navigate to the project directory:
   ```bash
   cd pawfectmatch
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add your database connection string, JWT secret, and other necessary configurations.

   ```bash
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Nice-to-haves

One exciting feature that can enhance the **PawfectMatch** experience is the integration of OpenAI's assistance for pet finding. This AI-driven feature would allow users to interact with a virtual assistant that can help them find the perfect pet based on their preferences and needs.

**OpenAI Assistance for Pet Finding Description:**

**Personalized Pet Recommendations**: The OpenAI assistant can engage users in a conversational manner, asking questions about their lifestyle, home environment, and preferences. Based on the responses, it will suggest pets that are a good match.

**Natural Language Search**: Instead of using traditional search filters, users can describe the type of pet they’re looking for in natural language. For example, "I want a small, low-maintenance dog that's good with kids," and the assistant will recommend suitable pets.

**Guidance on Pet Care** : The assistant can provide information on pet care, such as feeding, grooming, and training tips, making it easier for first-time pet owners to prepare for their new furry friend.

**Adoption Process Support** : The assistant can guide users through the adoption process, answering questions about the required steps, paperwork, and even helping them draft messages to shelters.

## Usage

- **Explore Pets**: Browse and search for pets based on various criteria.
- **Adoption Process**: Submit requests, communicate with shelters, and complete adoptions.
- **Shelter Management**: Add, update, and manage pet profiles and monitor adoption activity.







## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to [bernardayam493@gmail.com](mailto:bernardayam493@gmail.com).
