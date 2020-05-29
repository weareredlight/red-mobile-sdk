## How to install fonts quickly (for React Native 0.62)

1. create a folder named ```assets/fonts``` on project root

2. put .ttf files in it
2.1 Make sure the "PostScript name" is equal to the file name + .ttf

3. create a file named ```react-native.config.js``` on project root

4. add the following content to that file:

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
    web: {},
  },
  assets: ["./assets/fonts/"],
};
```

5. run ```react-native link``` to copy all asset files into android and ios project folders

6. uninstall both android and ios apps and stop bundlers (metro and webpack)

7. run ```yarn ios``` and ```yarn android``` to install the new apps with the assets

8. web should be fine

source: https://bigcheeseapp.com/2020/01/04/using-custom-fonts-in-react-native/
