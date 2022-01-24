import { Button, makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from './firebase';
import './Login.css'
import { useStateValue } from './StateProvider';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Login() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [openSignIn,setOpenSignIn] = useState(false);
    const history = useHistory();
    const [{user}, dispatch] = useStateValue();

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
            displayName : username
          })
          dispatch({
            type:"ADD_USER",
            user:authUser.user

        })
          
        })
        .catch(error => alert(error.message));
        setOpen(false);
        history.push('/');
        
     }

     const signIn =(e) => {
       e.preventDefault();

       auth
        .signInWithEmailAndPassword(email, password)
        .then((authUser) =>{
            dispatch({
                type:"ADD_USER",
                user:authUser.user

            })
        })
        .catch(error => alert(error.message));
      setOpenSignIn(false);
      history.push('/body');
     }



  return <div className='login'>

          <Modal
            open={open}
            onClose={() => setOpen(false)}

          >
            <div style={modalStyle} className={classes.paper}>
            <form className='app-signUp'>
              <center>
              <h5 className="app-headerLogo">Chatroom</h5>

              <input className="app-type1"
                  type='text'
                  placeholder='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                <input className="app-type1"
                  type='email'
                  placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                <input className="app-type1"
                  type='password'
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <Button type="submit" onClick={signUp}>Sign Up</Button>
              </center> 
            </form>
              
            </div>
          </Modal>

          <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}

          >
            <div style={modalStyle} className={classes.paper}>
            <form className='app-signUp'>
              <center>
              <h5 className="app-headerLogo">Chatroom</h5>

                <input className='app-type1' 
                  type='email'
                  placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                <input className='app-type1' 
                  type='password'
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <Button type="submit" onClick={signIn}>Sign In</Button>
              </center> 
            </form>
              
            </div>
          </Modal>

      <div className="login-container">
          <img src="https://png.pngtree.com/element_our/png_detail/20181229/vector-chat-icon-png_302635.jpg"
           />
         <button onClick={() => setOpenSignIn(true)} className="app-signInBtn">Sign In</button>
         <button onClick={() => setOpen(true)} className='app-signUpBtn'>Sign Up</button>


      </div>

  </div>;
}

export default Login;
