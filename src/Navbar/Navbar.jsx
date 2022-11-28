import React, { useEffect, useState } from "react";
import "./styles.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "./logo.svg";
import log from "./logo.jpeg"

import ringer from "./songs/Let-Me-Down-Slowly_320(PagalWorldl).mp3"
import ring1 from "./songs/Believer_192(PaglaSongs).mp3"
import ring2 from "./songs/Bilionera_192(PagalWorld).mp3"
import ring3 from "./songs/decpecito.mp3"
import ring4 from "./songs/Kesariya - Brahmastra 128 Kbps.mp3"
import ring5 from "./songs/Let Me Love You_320(PaglaSongs).mp3"
import ring6 from "./songs/Love Nwantiti_192(PagalWorldl).mp3"
import ring7 from "./songs/Manike Mage Hithe - Yohani.mp3"
import ring8 from "./songs/Mi Gente(PagalWorld).mp3"
import "bootstrap/dist/css/bootstrap.min.css";


const songs=[ringer,ring1,ring2,ring3,ring4,ring5,ring6,ring7,ring8]

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);
  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);
  return [playing, toggle];
};



export default function NAVBAR() {
 
  const [nextSongIndex, setNextSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[nextSongIndex]);
  
 
  const [playing, toggle] = useAudio(currentSong);

  function Nextsong(){

   setNextSongIndex(nextSongIndex+1)
   setCurrentSong(songs[nextSongIndex])
   console.log(currentSong)
  }
  
  

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
       

      <Navbar.Brand href="#home">
        <img src="https://media.giphy.com/avatars/jaaaamesperrett/Dx0SbsMf7gjn.gif"
          alt=""
          width="40"
          height="30"
          className="d-inline-block align-top"
        />
       
       𝕯𝖔𝖙 & 𝕭𝖔𝖝 𝕲𝖆𝖒𝖊
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">𝕷𝖔𝖌𝖎𝖓</Nav.Link>
          {/* <Nav.Link href="#pricing">Sign Up</Nav.Link> */}
          <NavDropdown title="𝕯𝖗𝖔𝖕𝖉𝖔𝖜𝖓" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
           
           
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">𝓐𝖇𝖔𝖚𝖙 𝕲𝖆𝖒𝖊</Nav.Link>
          <Nav.Link href="#deets">𝕮𝖔𝖓𝖙𝖆𝖈𝖙 𝖀𝖘</Nav.Link>
          <Nav.Link ><button class="button-91" role="button" onClick={toggle}>{playing ? "𝓟𝓪𝓾𝓼𝓮♬" : "𝓟𝓵𝓪𝔂♬"}</button></Nav.Link>
          <Nav.Link ><button class="button-91" role="button" onClick={Nextsong}>𝓝𝖊𝖝𝖙
           </button></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
