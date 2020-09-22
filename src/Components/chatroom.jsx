import React, { Component, useEffect, useState, useRef } from 'react';
import './styles/chatroom.css'
import { makeStyles } from '@material-ui/core/styles';
import querystring from 'query-string';
import io from 'socket.io'
import Avatar from '@material-ui/core/Avatar';
import { TextField, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send';

const ENDPOINT = 'https://realtimechat-server1.herokuapp.com/';
let socket = io(ENDPOINT);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        color: theme.palette.getContrastText('#4849A1'),
        backgroundColor: '#4849A1',
    },
}));


export default function ChatRoom({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        const { name, rid } = querystring.parse(location.search);
        console.log(name, rid);
        setRoom(rid);
        setName(name);
        console.log(socket);
        socket.emit('join', { name, rid }, ({ error }) => {
            alert(error);
        });
        socket.on('reconnect', () => {
            socket.emit('join', { name, rid }, ({ error }) => {
                alert(error);
            });
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [location.search]);

    useEffect(() => {
        socket.on('message', ({ message, room, from }) => {
            console.log(from + ":" + message + " in " + room);
        })
    }, [message]);
    const sendMessage = (event) => {

        event.preventDefault();
        console.log("Sending message " + message)
        if (message) {
            socket.emit('sendMessage', socket.id, room, message, () => setMessage(''));

        }
    }

    console.log(message);
    let element = <div className='form-chat'>
        <OnlineUsers />
        <ChatBox location={location}>

        </ChatBox>
        {/*
        <input type="text" id="message" value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
        />*/
        }

    </div>;

    return element;
}
//Online users component
function OnlineUsers() {
    const classes = useStyles();


    const [users, setusers] = useState([]);
    useEffect(() => {
        socket.on('users', ({ online }) => {
            users.length = 0;
            setusers(users.concat(online));

        })
        console.log(users);
    }, [users]);
    if (!socket) return;
    return <div className='online-form'>
        <div className="online-formNavContainer">
        <h2>Active Users ({users.length})</h2>
        </div>
        <div className='online-formList'>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {users.map((user) => {
                    return <li key={user.name} className="online-listitem" > 
                    <div className="online-formCard">
                        <div className={classes.root}>
                            <Avatar className={classes.large}>{user.name.charAt(0).toUpperCase()}</Avatar>
                        </div>
                        <h2>{user.name}</h2>
                    </div>
                    </li>
                })}
            </ul>
        </div>


    </div>
}
export class ChatBox extends Component {


    constructor(props) {
        super(props);
        const { name,rid } = querystring.parse(this.props.location.search);
        this.state = {
            name:name,
            room: rid,
            message: '',
            messagelist: [{
                message:`Welcome ${name}!`,
                room:rid,
                from:'admin'
            }]
        }
        socket.on('message', ({ message, room, from }) => {
            console.log(from + ":" + message + " in " + room);
            this.setState({ messagelist: this.state.messagelist.concat({ message: message, room: room, from: from }) })
        })
    }

    sendMessage(newmes) {

        console.log("Sending message " + newmes)
        if (newmes) {
            socket.emit('sendMessage', socket.id, this.state.room, newmes, ({ status }) => {
                if (status !== "success")
                    alert(status);

                this.setState({ message: '' })
            });


        }
    }
    MessageCard({message,room,from}) {

        if(from!=='admin')
        {
            let _class='message-container recieve';
            if(this.state.name===from)
              _class='message-container send';
              return <div className={_class}>
                <a>{message}</a>
                
               
                <div className="message-details">
                    <div>{from}</div>
                </div>
            </div>
        }
        else{
            return <div className="admin-container">
                <div className="admin-message">
                    {message}
                </div>
            </div>
        }
        
        
         
        
        
    }

    render() {


        return <div className='chatbox'>
            <div className="chatbox-formNavContainer">
                <IconButton href="/" className="navbutton back" >
                    <ArrowBackIcon />
                </IconButton>
                <h1>Room: {this.state.room}</h1>
                <IconButton href="/" className="navbutton logout"  >
                    <ExitToAppIcon />
                </IconButton>
            </div>
            <div className="chatbox-inner">
                <div className="message-list">
                <ul >
                    
                   
                        {this.state.messagelist.map((value) => {
                            return <li ref="mess" key={value.message}>{this.MessageCard({message:value.message,
                                room:value.room,
                                from:value.from})}</li>
                        })}
                       
                   
                    </ul>
                    
                </div>


                <div className="input-container" >
                    <TextField
                        variant='standard'
                        fullWidth type="text"
                        id="message"
                        value={this.state.message}
                        placeholder='Type your Message'
                        onChange={(e) => { this.setState({ message: e.target.value }) }}
                        onKeyPress={(e) => {
                            console.log(e.key)
                            if (e.key === "Enter") {

                                this.sendMessage(e.target.value)
                            }
                        }
                        }
                    />
                    <IconButton onClick={() => { this.sendMessage(this.state.message) }} >
                        <SendIcon />
                    </IconButton>
                </div>

            </div>
        </div>
    }
    scrollToBottom = () => {
        const { mess } = this.refs;
        mess.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }
    componentDidMount(){
        this.scrollToBottom();
    }
    componentDidUpdate()
    {
        this.scrollToBottom();
    }
}


