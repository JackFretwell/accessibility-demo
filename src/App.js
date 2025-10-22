import React from 'react';

function App() {
  return (
    <div>
      <h1>Accessibility Demo</h1> {/* comment added so I can make a PR */}
      <button>Click me</button> {/* This button actually has accessible text, so it's fine */}
      <button></button> {/* This button is missing accessible text */}
      <img src="logo.jpg" /> {/* Missing alt text */}
      <p>This is a demo app to showcase ESLint with accessibility checks.</p>
    </div>
  );
}

export default App;