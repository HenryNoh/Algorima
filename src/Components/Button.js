import React, { useState } from 'react';
import { Group, Rect, Text } from 'react-konva';

const Button = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <Group
      onClick={props.handleOnClick}
      onMouseEnter={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = 'pointer';
        setHover(true);
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage().container();
        container.style.cursor = 'default';
        setHover(false);
      }}
    >
      <Rect
        x={props.x}
        y={20}
        width={100}
        height={50}
        fill={!hover ? 'white' : '#dddddd'}
        stroke={'black'}
        cornerRadius={5}
      />
      <Text
        x={props.x + 10}
        y={30}
        width={window.innerWidth / 8}
        height={30}
        fontSize={30}
        text={props.text}
        stroke={'black'}
      />
    </Group>
  );
};

export default Button;
