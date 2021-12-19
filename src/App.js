import './App.css';
import Post from './PostComponent'
import React ,{ useState, useEffect } from 'react'
import { db,auth } from './firebaseInsta'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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


function App() {
  const classes = useStyles();
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState([false]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const unsubcribed = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        //user logged in
        console.log(authUser);
        setUser(authUser);

        if(authUser.displayName){
          // dont update username

        } else {
          // if we just created someone
          return authUser.updateProfile(
            {
              displayName:username
            }
          );
        }

      }else{
        //user logged out
        setUser(null);
      }
    })
    return() => {
      unsubcribed();
    }
  },[user,username]);

  useEffect(() => {
     db.collection('posts').onSnapshot(snapshot => {
       setPost(snapshot.docs.map(doc => ({
        id:doc.id, 
        post:doc.data()})))
     })
  }, []);


  const signUp = (event) =>{
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=> alert(error.message))

    setOpenSignIn(false);
  }
  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
                alt=""
              />
            </center>
            <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
           <Button onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
                alt=""
              />
            </center>  
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
           <Button onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
        alt=""/>
      </div>
      {
        user ? (
          <Button onClick={() => auth.signOut}>Logout</Button>
        ) :(
          <div className="app__loginContainer">
            <Button onClick={()=> setOpen(true)}>Sign In</Button>
            <Button onClick={()=> setOpen(true)}>Sign Up</Button>
          </div>
        )
      }
      {/* <Button onClick= {() => setOpen(true)}>Sign Up</Button> */}
     <h4>Hello, Lets start with Instagram Clone!!!</h4>
     <div className="app__post">
        {
          posts.map(({id,post}) => {
            return <Post key={id} username={post.username} imageUrl={post.imageUrl} comment={post.comment} />
          })
        }
     </div>
     
      {/* <Post username="Manoj" imageUrl="" comment="/>
      <Post username="Sheela" imageUrl="" comment="" />
      <Post username="Khushi" imageUrl="" comment=""/> */}
    </div>
  );
}

export default App;
