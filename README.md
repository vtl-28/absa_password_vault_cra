# Absa Service Desk password manager
Password manager used to help internal staff of Absa to store the passwords to the many applications and systems they use to get work done

# Table of contents
- [About](#about)
- [Demo](#demo)
- [Recorded Visual](#recorded_visual)
- [Getting Started](#getting_started)
- [Installation](#installation)
- [Features](#features)
- [Tech stack](#tech_stack)
- [License](#license)

## About
This is a web application that I developed back in 2017 when I was still an Absa employee working as a call centre agent in the service desk department. It is the solution to a problem that the service desk department of Absa was facing at the time regarding callers(internal staff) always calling in to have their passwords reset because they would forget the passwords to the many applications and systems they were using internally to get work done. 

## Demo
A live version of this project can be found at <a alt="live link" src="https://absa-password-vault-client.vercel.app/">https://absa-password-vault-client.vercel.app/</a>
## Recorded Visual
https://github.com/vtl-28/absa_password_vault_cra/assets/73833164/e89d60d6-a6c1-4efb-93e9-a49c35a34574

## Getting Started
- To run this application on your machine, one must have git and nodejs installed on their machine
- To get a copy of this project on your local machine
  ```bash
  git clone https://vtl-28/absa_password_vault_cra.git
  ```

## Installation

client
```bash
  cd client
  npm install
  npm run dev
  ```
server
```bash
  npm install
  npm start
  ```

## Features
- Users can store the password and username of their favourite applications
- Users can retrieve the password and username of their favourite applications
- User can delete the password and username of their favourite applications
- Users can update their profile information
- Users can get their master password hint to help with the retrieval of their master password if they have         forgotten it

## Tech stack
This project was built using Mongo, Express, React, Nodejs and Tailwindcss

## License
[MIT](https://choosealicense.com/licenses/mit/)
