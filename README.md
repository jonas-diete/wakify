# Wakify - an app matching your mood to a playlist

Created by [Guillermina Lorenzo](https://github.com/GuillerminaLorenzo), [Mosho Osho](https://github.com/itsmosho), [Liovirgilda Mendonca](https://github.com/liovirgildam), [Millennia Severino](https://github.com/MillieKS) and [Jonas Diete](https://github.com/jonas-diete).

 
 About
 
 Our app allows the user to find a playlist that matches their mood. Wakify use the Spotiy API to search their log of playlist to match with how you are feeling. This app is in development. It currently runs on Expo Go using ReactNative. If you'd like to try this app or develop it futher feel free to scroll down to get started.

 # Our Team 

 We are all Makers Bootcamp students, creating our final project. We had 2 weeks to develop this app and decide on out apps functionality. During our course we learnt Ruby,SQL, HTML, CSS, Javascript so learing ReactNative whilst creating an app was a rewarding learning curve and experience. To manage our tickets we used Trello and regularly has checkins and retros .

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=itsmosho&show_icons=true&theme=transparent)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=GuillerminaLorenzo&show_icons=true&theme=transparent)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=liovirgildam&show_icons=true&theme=transparent)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=jonas-diete&show_icons=true&theme=transparent)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=MillieKS&show_icons=true&theme=transparent)


![alt text](https://github.com/jonas-diete/wakify/blob/readme/readme.img/wakify-emulator.png?raw=true)

## Design
This is how the current build of the app works.
![alt text](https://github.com/jonas-diete/wakify/blob/readme/readme.img/design.png?raw=true)



## Dependencies

- Expo go 
- Expo auth session
- Expo notifications
- Expo webpack/web browser
- React Native
- Spotify web api node
- AsyncStorage
## Testing
- For unit testing we used Jest
- For end-to-end testing we used Cypress


# Getting started
1. Clone this repository
2. Run 
```npm install```
*This app was designed to run mobile, but can also be run in the browser


## Emulators 
This app can be ran onn  your mobile phonor through an emulator on your computer. 
For iOS we recommend using Xcode - "link to Xcode"
For Android we recommend using Android studio - "link to Android studio

## Running the App
### On Mobile
Run `npm start` to run the project (currently only available in development mode).
You can run this app by downloading the Expo Go app on through your phone's app store, 
then connecting it to the QR code shown in the command line.
If you have emulators installed, you can press 'a' or 'i' to run the app through the android and iOS emulators respectively.

### On the Web
Run 
```export NODE_OPTIONS=--openssl-legacy-provider```
then run 
```npm start --tunnel```
Once the project is loaded press 'w' to open the app on the web.

## Spotify Developer portal
Since this app is still in development mode, to be able to use it's features you'll need to set it up on the [Spotify developr portal](https://developer.spotify.com/dashboard/applications).

- Login or create a new spotify account. Then create an app. It should look like this
![alt text](https://github.com/jonas-diete/wakify/blob/readme/readme.img/Spotify-dev1.png?raw=true)
- Then take the ClientId from that app and save it as the clientID in src/utils/getClientId.js
- Then go back to the app. click into it and click edit settings
- You need to add two redirecturi's for the SpotifyAPI to work. 
- The first will be the expo from "Metro waiting exp://youripaddress:19000" when you run `npm start`
- The last will be http://localhost:19006 this is for running on the web and testing
## Usage

# App function
- the app makes calls to spotify api to return playlist based on your mood. By clicking the emojis you will be sent to a corresponding playlist

# Testing
To test with cypress, first run the web page, then run `npx cypress run`

