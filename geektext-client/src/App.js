import React from 'react';
import logo from './logo.svg';
import './App.css';

//Todo: Continue developing user signup form
function App() {
  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
