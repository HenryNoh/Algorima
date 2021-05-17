import { Line, Circle } from 'react-konva';

const Virtuals = (props) => {
  return (
    <>
      <Line
        points={[props.from.x, props.from.y, props.toX, props.toY]}
        stroke="#BFFF00"
        strokeWidth={2}
        lineCap="round"
        dash={[5, 5]}
        dashEnabled
      />
      <Circle
        x={props.toX}
        y={props.toY}
        width={10}
        height={10}
        radius={5}
        fill={'#BFFF00'}
      />
    </>
  );
};

export default Virtuals;
