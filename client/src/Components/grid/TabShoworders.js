import React,{useState, useEffect,useContext, Suspense} from 'react'
// import ShowOrders from './ShowOrders'
import {useAuth0} from '@auth0/auth0-react'


import axios from 'axios'
import {UserContext} from '../../contextapi'

import './login.css'
import Loading from '../../Loading'

const ShowOrders = React.lazy(()=>import('./ShowOrders'))


const TabShoworders = () => {
    
    // const [show,setshow]=useState(false)
    const [login,setlogin]=useState('')
    const [pass,setpass]=useState('')
    const [loggedin,setloggedin]=useState(false)
    const [registered,setregistered]=useState(false)
    const [state,setState] = useContext(UserContext)


    const {isAuthenticated,user}=useAuth0()

    useEffect(() => {
        setlogin('');
        setpass('')
    }, [state])
    useEffect(() => {
        if(login !== '' && pass !== '')
        {
            const payload = {username:login,password:pass}

             axios.post("http://localhost:4000/user/add",payload)
             .then(()=>{
                  console.log('successfully created a user || axios to mongodb')
             })
             .catch(()=>{
                  console.log('unable  to  create a user')
             })
    
        }//end of if
    }, [registered])

    useEffect(() => {
       if(login !== '' && pass !== '')
       {
        const payload = {username:login,password:pass}

        axios.get("http://localhost:4000/user/registered",payload)
        .then(()=>{
             console.log('successfully logged in')
            //  setshow(true)
             setState({show_logout_btn:true})  

        })
        .catch((err)=>{
             alert('unable  to login, Error:'+err)
        })

       }//if block

    }, [loggedin])

    function check_sub(strval){
         if(strval === process.env.REACT_APP_user1 || strval === process.env.REACT_APP_user2 ||
            strval === process.env.REACT_APP_user3 || strval === process.env.REACT_APP_user4 ||
            strval === process.env.REACT_APP_user5 
          )
         return true
         else
         return false
    }

    return(
    
     {/* {!state.show_logout_btn && <div >
            
                <form className="container"  >
                <input className="box" type="text" id="login"  name="login" placeholder="login" value={login} onChange={(e)=>{setlogin(e.target.value)}}/>
                <input className="box" type="password" id="password"  name="password" placeholder="password" value={pass} onChange={(e)=>{setpass(e.target.value)}}/>
               <div>
                <button className="box" className="btn btn-outline-success btn-lg " onClick={(e)=>{ e.preventDefault(); setloggedin(true)}}>Login</button>
                <button className="box" className="btn btn-outline-success btn-lg  " onClick={(e)=>{ e.preventDefault(); setregistered(true)}}>Register</button>
                </div>
                </form>
       </div>}  */}


     {/* {state.show_logout_btn &&  */}
     {!isAuthenticated && <div style={{"height":"90vh","width":"90vw","color":"white","display":"flex","justify-content":"center","align-item":"center","padding-top":"40vh"}}><h1>Please, try to Login if you want to see private data.</h1> </div>}
     {isAuthenticated &&  check_sub(String(user.sub)) &&
     <Suspense fallback={<Loading/>}>
     <ShowOrders />
     </Suspense>
     }

    </>)
}
export default TabShoworders