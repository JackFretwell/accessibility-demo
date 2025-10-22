import React from 'react';

function TestAccessibility() {
  return (
    <div>
      {/* This should trigger jsx-a11y/alt-text */}
      <img src="test.jpg" />
      
      {/* This should trigger jsx-a11y/anchor-has-content */}
      <a href="https://example.com"></a>
      
      {/* This should trigger jsx-a11y/control-has-associated-label */}
      <button onClick={() => console.log('clicked')}></button>
      
      {/* This should trigger jsx-a11y/heading-has-content */}
      <h1></h1>
      
      {/* This should trigger jsx-a11y/label-has-associated-control */}
      <label>Name</label>
      <input type="text" />
    </div>
  );
}

/* adding comment to test pull request */
export default TestAccessibility;