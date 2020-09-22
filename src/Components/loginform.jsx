import React, { useState } from 'react';
import './styles/loginform.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
}));

export default function LoginForm() {

    const [name,setName]=useState('');
    const [room,setRoom]=useState('')

    const classes = useStyles();
    return <div className="form">

        <div className={classes.root}>
            <Avatar alt="Remy Sharp" src="https://avatars0.githubusercontent.com/u/33596752?s=460&u=0306d4f90d57e0a81268b451373673d67925a615&v=4" className={classes.large} />
        </div>
        
        <div className="inputcontainer">
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Username"
                placeholder="Enter your name to Login"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(event)=>setName(event.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rid"
                label="RoomID"
                placeholder="Your Room ID"
                name="rid"
                autoComplete="id"
                autoFocus
                onChange={(event)=>setRoom(event.target.value)}
            />
            <Link href={`/chat?name=${name}&rid=${room}`}>

            <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                onClick={(event)=>validate(event,name,room)}>
                Enter Chat Room
          </Button>
          </Link>
          <div className="input-item">
           {Author()} 
        </div>
            <div className="input-item">
               
                {Copyright()}
            </div>

        </div>

    </div>
}
const validate=(event,name,room)=>{
    if(!name || !room)
    {
        event.preventDefault()
        alert("All fields are mandatory");
    }
    
    
}
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}

            <Link color="inherit" href="https://material-ui.com/">
                Jerry S Joseph
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
function Author() {
    return (
        <div>
             <Typography variant="body2" color="textSecondary" align="center">
            Designed and Developed by 
           
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
            
            <Link color="inherit" href="https://material-ui.com/">
            <strong> Jerry S Joseph</strong> 
        </Link>{' '}
           
        </Typography>
        </div>
        
    );
}