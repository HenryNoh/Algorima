import { Line } from 'react-konva';

const Connectors = (props) => {
  return (
    <Line
      key={props.id}
      points={[props.from.x, props.from.y, props.to.x, props.to.y]}
      stroke="#222222"
      strokeWidth={2}
    />
  );
};

export default Connectors;
