// import React from 'react'
// import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import './index.css'
// import { auth } from '../firebaseConfig';
// import { Navigate, useNavigate } from 'react-router-dom';

// function Auth() {
//     const navigate=useNavigate()
//     const signIn=()=>{
//         const provider = new GoogleAuthProvider();
//         signInWithPopup(auth, provider)
//         .then(async(result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         localStorage.setItem('user',JSON.stringify(user))
//         navigate('/savedGames')
//         }).catch((error) => {
//         // Handle Errors here.
//         // const errorCode = error.code;
//         // const errorMessage = error.message;
//         // The email of the user's account used.
//         // const email = error.customData.email;
//         // The AuthCredential type that was used.
//         // const credential = GoogleAuthProvider.credentialFromError(error);
//         console.log(error)
//         // ...
//         });
//     }
    
//   return (
//     <div className='auth-container'>
//       <h1>Welcome</h1>
//       <h2>Sign In</h2>
//       <br/><br/>
//       <button type="button" onClick={signIn}>
//         <img src="https://shortcuts-france.fr/wp-content/uploads/2021/04/google-logo-carre-2015-09-400.png" alt=""/>
//         <h2>Sign in</h2>
//       </button>
//     </div>
//   )
// }

// export default Auth



