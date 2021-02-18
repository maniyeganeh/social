import React,{useState , createContext} from 'react';

export const SocialContext = createContext([[],() => {}]);
export const SocialProvider = props => {
    const[post , setPost] = useState([])
    const[user , setUser] = useState({})
    const[name , setName] = useState({})
    const[token,setToken] = useState(null)
    const[auth , SetAuth] =useState(false)
    const[edit , setEdit] = useState(false)
    const[editPost , setEditPost] = useState(false)
    return(
        <SocialContext.Provider value={{user:[user , setUser] , token:[token,setToken], post:[post,setPost] , auth:[auth , SetAuth] , nameData:[name , setName] , edit:[edit , setEdit], editPost:[editPost , setEditPost]} }>
            {props.children}
            </SocialContext.Provider>
    )
}
