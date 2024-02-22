# Next.js Authentication Project with Next-Auth v5

In this project, an authentication (auth) project has been created using Next.js and Next-Auth v5. The project includes the following features:

- User registration and login functionalities.
- Two-factor authentication (2FA) feature.
- Ability for users to change their email addresses and passwords.
- Ability for users to optionally add, edit, and delete "todo" items.
- Pagination support for the "todo" list.
- Use of Tailwind CSS components for user interface with dark mode support.
- Use of Nodemailer for email sending.

## Installation

1. Clone or download the project files to your computer.
2. Open a terminal and navigate to the project directory.
3. Run the `npm install` command to install the necessary dependencies.
4. Copy the `.env.example` file in the project root directory as `.env` and edit it to set up the required environment variables.
5. Run the command `npx prisma migrate dev --name initial` to create the database.
6. Start the application by running the command `npm run dev`.
7. Visit `http://localhost:3000` in your browser to view the application.

## Usage

- To create a new account, visit the "Register" page and provide the necessary information.
- To log in with an existing account, visit the "Login" page and sign in with your username/email and password.
- To enable or disable two-factor authentication, visit the "Profile" page and update your settings.
- To change your email address or password, visit the "Profile" page and update the relevant information.
- To add, edit, or delete "todo" items, visit the "Todo" page and perform your actions.
- You can change the interface theme using the "Toggle Dark Mode" button at the top of the page.
- You can also log in using your Google or GitHub account.

## Dependencies

The following libraries have been used in the project:

- **Next-Auth** - A library for easy integration of authentication.
- **Prisma** - Used as an ORM (Object-Relational Mapping) for the database and for database management.
- **Nodemailer** - Used for sending emails.
- **React Hook Form** - Used for form management.
- **Zod** - Used for TypeScript-compatible schema validation.
- **UUID** - Used for generating unique identifiers.
- **Husky** - Git hooks made easy.
- **Bcryptjs** - Library for hashing passwords.

The complete list of dependencies and version numbers can be found in the `package.json` file.

## Contribution

- If you would like to contribute to this project, feel free to create a pull request with your suggestions and contributions.

- If you encounter any issues or problems, please open an issue to report them.

## License

- This project is licensed under the MIT License. You can find more information by examining the LICENSE file."
