# Creative Agency Works For Website Creation, Graphics Design And Video Editing

This is a company website, through which some skilled people provide quality services like website development, graphics designing and video editing.

## Features

### General Features

- Anyone can send email to company email address using Nodemailer
- Smooth routing features with React Router Dom
- Private and General Routing features for more secure feature
- Responsive layout for all devices using CSS3 and Bootstrap
- Sorting Services
- Search Services
- Pagination

### Client Features

- Payment with visa card/mobile banking/bank account using SSL Commarz
- Review & Rating if client have any order
- Dashboard where client can see payment history and current wallet balance with printing feature
- Order service list with progress status
- Manual register and login with unique name and email
- Error/Success handling with react toastify
- Conditional status color change
- Send verification code into email when new user try to register
- Update password/name
- Forgot password
- Pagination
- Delete Account

### Admin Features

- See total order list
- Manage services add & delete
- Update project status
- Manage user role with toggle admin/client color
- See email who send email
- Pagination
- Delete Account

### Implement Idea

- Send email when client order new services
- Using regex check email/password
- Edit services

## Technologies Used

### For Client

- ReactJs (JavaScript library for building user interfaces)
- Bootstrap
- CSS3
- React-Router-Dom
- React-Select
- React-Icons
- React-Toastify
- React-Responsive-Carousel
- Firebase for google login

### For Server

- bcryptjs
- body-parser
- cors
- dotenv
- express
- mongoose
- nodemailer
- nodemon
- sslcommerz-lts
- uuidv4

### Using Tools

- vscode
- postman
- dev-tool
- github
- git
- mongodb compass

### Deploy

- vercel server & client

## Links

- Live client: [https://creative-agency-git-main-taher-39.vercel.app/](https://creative-agency-git-main-taher-39.vercel.app/)

- Live server: [https://agency-server-git-main-taher-39.vercel.app/](https://agency-server-git-main-taher-39.vercel.app/)

- Client github: [https://github.com/Taher-39/agency-client](https://github.com/Taher-39/agency-client)

- Server github: [https://github.com/Taher-39/agency-server](https://github.com/Taher-39/agency-server)


## How to Run the Client Code

Follow these steps to run the client code locally:

1. Clone the client repository:

    ```bash
    git clone https://github.com/Taher-39/agency-server.git
    ```

2. Change into the project directory:

    ```bash
    cd agency-server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
3. Create .env file And Add :

    ```bash
    DB_USER = mongodb_db_user 
    DB_PASS = mongodb_db_pass

    STORE_ID=your_store_id
    STORE_PASS=your_store_pass

    company_email=youremail@gmail.com
    company_email_app_pass=yourpass

    CLIENT_URL=http://localhost:3000
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

   The client will be accessible at [http://localhost:3000](http://localhost:3000).

5. Explore the features and functionalities of the Creative Agency website locally.
