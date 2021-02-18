import React, { useState , useContext} from 'react'
import { Container, Row, Button, Form } from "react-bootstrap";
import {Link} from "react-router-dom"
import { SocialContext, SocialProvider } from '../../context/socialContext';
import "../join/join.css"
const Join = props => {
    const { user } = useContext(SocialContext);
    const[userValue , setUserValue] = user
    // const[name , setName] = useState('')
    const[room , setRoom] = useState('')
    const nameChange = e => {setUserValue(e.target.value)}
    const roomChange = e => {setRoom(e.target.value)}
    return ( 
        <SocialProvider>

        <Container fluid className={props.darkMode ? "reg login darkLog" : "reg login"}>
        <Container>
        <Row>
             <div className={props.darkMode ? "signBox loginBox darkBox" : 'signBox loginBox'}>
                         
                                <Form.Group controlId="formBasicName">
                           
                                    <Form.Control type="text" name="email" placeholder="Enter Your Chat Name" className="input chatint" value={userValue.name} onChange={nameChange} disabled />
                               

                                </Form.Group>
                                <Form.Group controlId="formBasicRoom">
                                
                                    <Form.Control type="text" name="room" placeholder="Enter Your Chat Room" className="input chatint" value={room} onChange={roomChange} />
                               

                                </Form.Group>
                                <Link onClick={event => (!userValue.name || !room) ? event.preventDefault() : null} to={`/chat?name=${userValue.name}&room=${room}`}>
                                <Button className={props.darkMode ? "darkBt" :""} type="submit" style={{
                                    backgroundColor: "#44bd32",
                                    border: "none"
                                }}>
                                    Login
</Button>
                                </Link>

                         
                  
        </div>
        </Row>
        </Container>
        </Container>
        </SocialProvider>
     );
}
 
export default Join;