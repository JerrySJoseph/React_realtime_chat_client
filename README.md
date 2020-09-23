# Realtime Chat Server Client
This is an open-source project for implementing realtime chat application in any platform using Websockets. It implements Websocket via Socket.io library. An instance of its server is hosted in the cloud for demonstration. This server facilitates mutltiple rooms supervised by server. Each user needs to enter username and room id the join the room. Joining the session is done by initialising a socket at this server's ENDPOINT.

The client application in fully developed using React framework. This project explains how to implement the Client side of Chat Application.

# Demo
A demo of the client app is hosted on 
https://jerrysjoseph.github.io/React_realtime_chat_client/

# EVENTS
Getting online Users
```javascript
 socket.on('users', ({ online }) => {
           //A destructured object named online is used to fetch list of online users;
           users=[];
           users.concat(online);

        })
```
Recieving messages
```javascript
  socket.on('message', ({ message, room, from }) => {
            //display the recieved message in console
            console.log(from + ":" + message + " in " + room);
            
        })
```
Send Messages
```javascript
 sendMessage(newmes) {
        console.log("Sending message " + newmes)
        if (newmsg) {
            socket.emit('sendMessage', socket.id, room, newmes, ({ status }) => {
                //A status is recieved as callback from server if message is delivered successfully
                if (status !== "success")
                    alert(status);
                    //TODO: Clear input
            });
        }
    }
```
## About 
This project is developed by Jerry S Joseph as a demostration of WebSockets via socket.io. This application is developed in React.js and hosted in githhub pages.

## Server Endpoint

Visit this link to check if the hosted server is running...

https://realtimechat-server1.herokuapp.com/

License
-------

    Copyright 2014 - 2021 Jerin Sebastian

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
