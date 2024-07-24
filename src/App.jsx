// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Meme from './Components/Meme';

export default function App() {
  // Create a state variable, meme, and set it equal to an object with
  // some default values for topText and bottomText.
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/46e43q.png',
  });
  // Create a state variable, allMemes, and set it equal to an empty array.
  const [allMemes, setAllMemes] = React.useState([]);
  // Fetch all memes from the imgflip API and set the allMemes state variable
  useEffect(() => {
    async function fetchMemes() {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      setAllMemes(data.data.memes);
    }
    fetchMemes();
  }, []);
  // Create a function, getMemeImage, that will fetch a new random meme image
  // from the imgflip API and set the randomImage state variable equal to the URL
  function getMemeImage() {
    const randomMemeImage =
      allMemes[Math.floor(Math.random() * allMemes.length)];
    const url = randomMemeImage.url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  // Create a function, handleInputChange, that will update the topText and
  // bottomText state variables based on the value of the event.target.name
  function handleInputChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  // Return the Header and Meme components

  return (
    <div className="App">
      <Header />
      <Meme
        meme={meme}
        handleInputChange={handleInputChange}
        getMemeImage={getMemeImage}
        randomImage={meme.randomImage}
      />
    </div>
  );
}
