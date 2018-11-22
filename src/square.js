import React from './util/react';
import Button from 'muicss/lib/react/button';
function Square(props) {
  return (
    <Button
        className="square"
        style={{background: `${props.background}` }}
        onClick={() => props.onClick() }
      >
        { props.value }
      </Button>
  )
};

export default Square;