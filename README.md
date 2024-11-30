# Toodler
Þróun Smáforrita - Group 10 : Alexía, Halldóra, Kjartan, Óliver

## Description
This React Native application is a robust task management tool designed to help users stay organized and productive. Users can create an account to securely manage their data and build customizable boards. Within each board, users can create lists and populate them with tasks. Tasks can be marked as done, providing a clear overview of progress. The app features an intuitive interface with color customization options, enabling users to personalize their experience while efficiently managing their to-do lists. Ideal for both personal and professional task organization.

## Table of Contents
- Installation & Setup Instructions
- Features x
- Technologies Used x
- Platform Support x
    - Testing x
- Project Structure x
- Running the App x
- Known Issues x
- Future Improvements x


## Installation & Setup Instructions
### Navigate to project directory
`cd Toodler`
### Install dependencies
`npm install`
### Install simulator
Install Expo Go or some other simulator.
    
## Features
- User account creation and login. // Extra
- Board creation and management. (Management entails: Modification and deletion of items)
    - Pictures can be added to the board from camera roll. // Extra
    - Description of boards optional.
- List creation within boards and management.
    - Displays list progress i.e. proportion of total task vs finished tasks. // Extra
- Task creation within lists and management.
    - Can be marked as done.
- Color customization.

## Technologies Used : 
- JavaScript 
- React 
- React-Native / React-Native CLI
- npm
- Expo
- ESLint 
- GitHub.

## Platform Support 
iOS for IPhones and Android
### Primary Development Platform
- Primary Platform: iOS
- Test Device: iPhone 13
- OS Version: iOS 18.1.1
### Secondary Platform Testing
- Secondary Platform: iOS
- Test Device: [e.g., iPhone 14 Pro
- OS Version: iOS 17.6.1
- Testing Status: Everything works.
- Known Platform-Specific Issues: None discovered at this time.
### Testing
This application was primarily tested using manual, human-based testing. During development, the app was run frequently to identify and address issues related to functionality, performance, and user experience. Test scenarios included creating accounts, managing boards, lists, and tasks, and verifying task status changes. Any bugs or unexpected behaviors were fixed iteratively to ensure a smooth and reliable user experience.

## Project Structure : 
The project follows a modular and feature-based structure to ensure scalability and maintainability. Core functionalities are organized into dedicated folders for components, routes, services, styles, and views, promoting separation of concerns and reusability. This structure supports clean organization of static assets, reusable UI elements, and application logic. Configuration files and entry points are kept at the root level for ease of setup and deployment.

## Setup Instructions
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Expo Go installed on a Smart Phone or:
    - Xcode (for iOS development) on a PC/MAC
    - Android Studio (for Android development) on a PC/MAC
### Environment Setup
1. Install React Native dependencies
2. Configure development environment
3. Set up emulators/simulators

## Running the App
In terminal write: `npm start`, then scan the QR-code to run the app on your phone(with Expo Go installed).

## Known Issues
App often tries to make 2 identical boards when creating new boards, the root of this problem is still unknown but has been fixed by not permitting the app to create 2 identical boards. Prop validation is missing 

## Future Improvements
Structure of the program needs some improvement. For the app a profile page has yet to be made, thus the current login functionality is quite redundant. Prop validation also needs to be added for all functions.
