import React, { Fragment, useEffect, useContext, useState } from 'react'
import { SocialProvider, SocialContext } from "./context/socialContext"
import Menu from './components/Nav/Menu'
import Feed from "./components/Feed/Feed"
import { Switch, Route, Redirect } from "react-router-dom";
import SinglePost from './components/Feed/SinglePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/login/singup';
import Signin from './components/login/signin';
import Profile from './components/user/profile';

import isEmpty from "lodash"
import Chat from './components/chat/Chat';



const Social = () => {
  const { token, auth, user } = useContext(SocialContext);
  const [tokenValue, setTokenValue] = token;
  const [authValue, setAuthValue] = auth;
  const [userValue, setUserValue] = user;

  const userColor = () => {
    if (!window.matchMedia) return;
    return window.matchMedia(("perefers-color-scheme:dark"));

  }
  const intMode = () => {
    const saveMode = JSON.parse(localStorage.getItem('dark'))
    userColor()
    return saveMode || false;
  }

  const [darkMode, SetDarkMode] = useState(intMode());
  const darkModeHandle = () => {
    SetDarkMode(prevMode => !prevMode)

  }
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode))
 
   
  }, [darkMode])
  const logoutHandler = () => {
    setAuthValue(false);
    setTokenValue(null);
    localStorage.removeItem('Your_token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userPic');

   

}
  useEffect(() => {
    const expire = localStorage.getItem('expiryDate');
    if(new Date(expire) <= new Date ()){
      logoutHandler();
        return;
      
    }
    
  },[])
  return (

    <SocialProvider>




      <Fragment>

        <Menu darkModeHandle={darkModeHandle} darkMode={darkMode} />
        <Switch>
          {
            JSON.parse(!localStorage.getItem('Your_token')) ? <Redirect from='/' to='/login' /> : ''
          }
        </Switch>

        <Switch>

          <Route path="/signup" render={props => <Signup  {...props} darkMode={darkMode} />} />/>
      <Route path="/login" render={props => <Signin  {...props} darkMode={darkMode} />} />
          <Route path="/user/:userId" render={props => <Profile  {...props} darkMode={darkMode} />} />
          <Route exact path="/post/:postId" render={props => <SinglePost {...props} darkMode={darkMode} />} />

          <Route path="/chat" component={Chat} />
          <Route path="/" render={() => <Feed darkMode={darkMode} darkModeHandle={darkModeHandle} />} />
          {/* <Route exact  path="/" render={() => !isEmpty(tokenValue) ? <Feed/> : <Redirect to="/login"/> }/> */}
        </Switch>
        <ToastContainer />
      </Fragment>


    </SocialProvider>

  );
}

export default Social;