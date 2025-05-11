# SVAC Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.x or higher)
- npm (comes with Node.js)
- Git (for version control)

## Getting Started

### Step 1: Clone the Repository

First, clone this repository to your local machine:

```bash
git clone [repository-url]
cd svac
```

### Step 2: Install Dependencies

Install all the required dependencies using npm:

```bash
npm install
```

This command will:

- Read the `package.json` file
- Install all listed dependencies
- Create a `node_modules` folder containing all the installed packages

### Environment Variables

The project includes a `.env` file with all necessary environment variables for easy testing. You don't need to create or modify any environment variables to get started. The included variables are:

- API connection strings
- API keys

### Testing Bulk Upload

For testing the bulk upload functionality, a sample Excel file `dummy_students.xlsx` is included in the repository. This file contains:

- Sample student data for testing
- Properly formatted columns matching the required upload template
- Multiple entries to test bulk processing

To test bulk upload:

1. Login as admin
2. Navigate to the bulk upload section
3. Use the provided `dummy_students.xlsx` file to test the functionality

### Step 3: Start the Development Server

Run the development server using:

```bash
npm run dev
```

This will:

- Start the Next.js development server
- Enable hot-reloading (changes will reflect immediately)
- Make the application available at `http://localhost:3000`

## Login Credentials

You can access the application using these credentials:

- **Email:** kislayvats22@gmail.com
- **Password:** alphabeta

## Registration and Admin Access

If you're unable to login with the provided credentials, you can register as a new admin user:

1. Navigate to `/register` in your browser
2. Fill in the registration form with your details
3. After successful registration, you can login using your new credentials

Note: The registration page is specifically designed for admin users. Regular users should contact the system administrator for access.

## Project Structure

The project follows the standard Next.js structure:

- `/app` - Contains the main application code
- `/public` - Stores static assets like images
- `/components` - Reusable React components
- `/styles` - CSS and styling files

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm start` - Runs the production build
- `npm run lint` - Runs the linter to check code quality

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are properly installed
3. Verify you're using the correct Node.js version
4. Try deleting `node_modules` and running `npm install` again
