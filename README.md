# Welcome to the review of my readable project.

The following will be needed to be done to run this project:
__1. The readable backend server from udacity will need to be installed.__
__2. My project code will need to be downloaded and setup.__

Steps for both are below and then follows my project notes.

## Install the readable project backend server supplied by udacity.

Please make sure you have node and npm installed on your machine.

Please create a project folder (directoy) on your machine

Open a terminal session to that project folder.

Please enter:

```git clone https://github.com/udacity/reactnd-project-readable-starter```

please then go into that directory

```cd reactnd-project-readable-starter```

enter the following command to install external npm modules

```npm install```

once the npm finishes and the command prompt return please enter

```npm start```

to start the server for the project I have built will be using.

If all went well the following message should appear

__Server listening on port 5001, Ctrl+C to stop__

## We will now install the readable project I have built.


Please open another terminal session in the project folder (directory) you
cloned the server.

To get the source code you have two options:

1. Unzip the file sent with this project in the project folder

2. download the source via git
  Steps for git download are simply:

  ```git clone https://github.com/netlogic/brets-readable-project.git```

please then go into the directory brets-readable-project

```cd brets-readable-project```

enter the following command to install external npm modules

```npm install```

once the npm finishes and the command prompt return please enter

```npm start```

If all has gone well you can now browse to the following location
to start using the project.

```http://localhost:3000```

## Project Notes

A lot of this project follows the structure of reactjs/redux
I found it very clean and URLS were supported.
That repository can be found at:
```https://github.com/reactjs/redux/blob/v3.6.0/examples/real-world/src/index.js```
This blog spot about react-redux-router also was guiding me.
```https://blog.marvelapp.com/managing-the-url-in-a-redux-app/```
This blog is very helpful in describing bind actions to an index
http://blog.scottlogic.com/2016/05/19/redux-reducer-arrays.html

I checked in my code often and all git commits can be found at:

https://github.com/netlogic/brets-readable-project.git

I suck at pure html and CSS so I used react-native-web.
I have been building a large number of my apps with react-native-web
For best display please use chrome or safari as I have not tested the presentation of
my app on other browsers.  Unfortunately flex-box screws up and normally
hacks need to be implemented so presentation is improved on IE and FireFox.

Udacity server could be made better to return comment count with post to stop multiple requests on post view.

Did not have time to work with a UX designer.  Application sorely needs some guidance on UX.
But I believe (hopefully) all items in rubric have been met.
Rubric can be found here:
https://review.udacity.com/#!/rubrics/1017/view

To vote on a Post please select either thumb up 👍 or thumb down 👎 button.
Aria support has been added to icons.

One comment:
Not being allowed to use state makes some things trickier, but overall react-redux is fun to play with.
But I hope we can use state on the next project.

Looking forward to comments and learning more.





