import React from 'react'
import { Grid,Typography,TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function Saves() {
    const navigate=useNavigate()
    const userData=JSON.parse(localStorage.getItem('user'))
    const saveGame=async(e)=>{
        e.preventDefault()
        try {
            await setDoc(doc(db, "savedGames", userData.uid), {
              ...userInfo
            });
            alert("GameSaved")
            navigate('/')
          } catch (e) {
            console.error("Error saving game: ", e);
          }
    }
  return (
    <form onSubmit={(e)=>{saveGame(e)}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Typography variant='h6'>Name</Typography>
                <TextField/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant='h6'>Date</Typography>
                <TextField/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant='h6'>Time</Typography>
                <TextField/>
            </Grid>
        </Grid>
    </form>
  )
}

export default Saves