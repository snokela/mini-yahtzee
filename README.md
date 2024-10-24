# **Mini-Yahtzee App**

### **Overview**
This app is a simplified version of the upper section of the classic Yahtzee game, developed as a final project for the Mobile Service Programming course. The app includes features such as a Gameboard for gameplay, a Scoreboard to track top five scores and a Home screen for player input and game rules.

### **Features**

- **Home Screen:** Collects the player’s name and displays game rules.
- **Gameboard:**  Core gameplay area where players roll and select dice.
- **Scoreboard:** Displays top scores and allows for clearing the scoreboard.

### **Libraries Used**

- **AsyncStorage:** For persistent data storage.
- **React Navigation:** For handling navigation between the Home, Gameboard and Scoreboard screens using Bottom Tabs Navigator.
- **React Native Paper:** Specifically for using the DataTable component in the Scoreboard.
- **React Native Flex Grid:** Used for Gameboard layout.

### **How to Run**

- Install dependencies: _npm install_
- Start the app: _npx expo start_
- Follow prompts to open the app on an emulator or physical device.

## **Game Rules**

- Players have __five__ dice and __three__ throws per turn.
- Score is based on matching dice spots. Select each point only once.
- Achieve __63__ points for a bonus of __50__ points.
