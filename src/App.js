// import logo from './Images/profile-jalal.jpg';
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
import {
  getAuth, signInWithPopup, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendEmailVerification,
  sendPasswordResetEmail, GoogleAuthProvider
} from "firebase/auth";
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  // set Email && Password
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);


  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {

        const user = result.user;
        console.log(user);
      })
  }





  //Sign Up onclick
  const handleSignUp = e => {
    e.preventDefault();

    //error endaling 
    if (password.length < 6) {
      setError("Password Must be at least 6 character long")
      return;
    }

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password must contain 2 UpperCase letter ");
      return;
    }
    isLogin ? processLogin(email, password) : createNewUser(email, password);


  }
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })
  }
  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail();
      })
      .catch(error => {
        setError(error.message);

      })
  }




  // verify Email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then( result => {
          console.log("result verify ",result);
      });
  }
   const handleResetPassword = () =>{
    sendPasswordResetEmail(auth, email)
     .then(result =>{

     })

   }




  const handleEmailChange = e => {
    setEmail(e.target.value);

  }
  const handlePasswordChange = e => {
    SetPassword(e.target.value);

  }
  const toggleLogin = e => {
    setIsLogin(e.target.checked); //checked
  }
  return (
    <div className="my-5 w-75 mx-auto">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}


      <form onSubmit={handleSignUp}>
        <h3 className="text-primary">Please {isLogin ? 'Login' : 'Sign Up'}</h3>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email"
              className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password"
              className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" htmlFor="gridCheck1">
                Already Sign up
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3 text-danger">{error}</div>
        <button onClick={handleSignUp} type="submit"
          className="btn btn-primary">{isLogin ? 'Login' : 'Sign Up'}</button>
        <button onClick={handleResetPassword} type="button" className="m-2 btn btn-secondary btn-sm">
          Reset Password</button>

      </form>
      <br /><br /><br />
      <div>----------------------------------------</div>

      <br /><br /><br /><br />
      <button onClick={handleGoogleSignIn} >Google Sing in</button>
    </div>
  );
}

export default App;
