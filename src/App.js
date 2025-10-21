import React from 'react';

function App() {
  return (
    <div>
      <h1>Accessibility Demo</h1>
      <button>Click me</button> {/* This button is missing an accessible label */}
      <p>This is a demo app to showcase ESLint with accessibility checks.</p>
    </div>
  );
}

export default App;