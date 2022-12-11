# node-smart-home

## how to run the project 
- to install all dependencies run ``npm install``
- before you run the application make sure to create config.ts file holding your eWeLink credential
```const config = {
  ewelink: {
  password: 'x',
  email: 'y',
  reqion: 'z',
  }
  };
  export default config;
```
- to run application run ``npm run start`` in root catalog 
- applcation uses MongoDB for storing events you should have one or use inMemory option.

Enjoy!
---
If you have any question or feedback don't hesitate to contact me :)