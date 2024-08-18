import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css'; // Ensure this file contains the correct styling

function App() {
  const [length, setLength] = useState(7);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharacterAllowed] = useState(false);
  const passRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charactersAllowed) str += "@#^%&*()_+/*-+";
    if (numberAllowed) str += "0123456789";

    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length);
      pass += str.charAt(ind);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  const handleLength = (e) => {
    setLength(Number(e.target.value)); // Ensure length is a number
  };

  const handleCopy = () => {
    if (passRef.current) {
      passRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <>
      <h1 className="header">Password Generator</h1>
      
      <div className="container">
        <div className="input-group">
          <input 
            type="text" 
            className="password-box"
            placeholder="Generated password" 
            value={password}
            ref={passRef}
            readOnly 
          />
          <button 
            className="copy-button"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>

        <div className="slider-group">
          <label className="slider-label">Password Length: {length}</label>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={length}
            onChange={handleLength}
            className="slider"
          />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              className="checkbox"
              checked={charactersAllowed}
              onChange={() => setCharacterAllowed(prev => !prev)}
            />
            Include Characters
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              className="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            Include Numbers
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
