import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./index.css";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";


function Auth() {
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const player = result.user.uid;
        //
        const docSnap = await getDoc(doc(db, "games", "XhxrYcgKoKl9eLoCVFl2"));

        if (docSnap.exists()) {
          const data = docSnap.data();
          await updateDoc(doc(db, "games", "XhxrYcgKoKl9eLoCVFl2"), {
            players: { ...data.players, [player]: 0 },
          });
        }
        //save player.uid something in place of JSON.stringify(player) in localStorageSetItem
        localStorage.setItem("player", JSON.stringify(player));
        
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };

  return (
    <div className="auth-container">
      <h1>Welcome</h1>
      <h2>Sign In</h2>
      <br />
      <br />
      <button type="button" onClick={signIn}>
        <img
          src="https://shortcuts-france.fr/wp-content/uploads/2021/04/google-logo-carre-2015-09-400.png"
          alt=""
        />
        <h2>Sign in</h2>
      </button>
    </div>
  );
}

export default Auth;
