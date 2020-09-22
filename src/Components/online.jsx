import React, { Component,useState, useEffect } from 'react';
import io from 'socket.io-client'
let socket;
function Online()
{
    const[users,setUsers]=useState(['']);

    useEffect(()=>{
        socket=io(ENDPOINT);
    })
}
