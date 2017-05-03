import React from 'react';

// stateless component that recieves props from parent (Board)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


export default Square
