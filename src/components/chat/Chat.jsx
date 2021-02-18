import React, { useEffect , useContext , useState } from 'react'
import openSocket from "socket.io-client"
import { SocialContext, SocialProvider } from '../../context/socialContext';
import queryString from 'query-string'
let socket;
const Chat = ({location}) => {
    const { user } = useContext(SocialContext);
    const[userValue , setUserValue] = user
    const[room , setRoom] = useState('')
    const[message , setMessage] = useState('')
    const[messages , setMessages] = useState([])
    const ENDPOINT = "localhost:8080"
    useEffect(() => {
        const {name , room} = queryString.parse(location.search)
          socket = openSocket(ENDPOINT,  {transports: ['websocket']});
         socket.emit("join" , {name : userValue.name , room:room} , () => {
     
            
         })
         setUserValue(name)
      setRoom(room)
      console.log(socket);
      
    
        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
        
    },[ENDPOINT , location.search])
    useEffect(() => {
        socket.on('message' , (message) => {
            setMessages([...messages , message])
        })
    },[messages , message])

    const sentMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage' , message , () => setMessage(''))
            console.log("created");
            
        }
    }
    console.log(message, messages);
    
    return (
        <SocialProvider>
        <div style={{marginTop:"10%"}}>
            <div>
                <input value = {message} onChange={(e) => setMessage(e.target.value)} onKeyPress={event => event.key === "Enter" ? sentMessage(event): null}/>
            </div>

        </div>
        </SocialProvider> 
     );
}
 
export default Chat;