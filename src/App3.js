import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle, Group } from 'react-konva';

const INITIAL_STATE = () => {
  const shapes = [];
  for (var i = 0; i < 3; i++) {
    shapes.push({
      id: i,
      rectx: i * 200,
      recty: 0,
      circle1x: i * 200 + 20,
      circle1y: 20,
      circle2x: i * 200 + 180,
      circle2y: 20,
      line1id: null,
      line2id: null,
      currentx: 0,
      currenty: 0,
    });
  }
  return shapes;
};

const App = () => {
  const [shapes, setShapes] = useState(INITIAL_STATE);
  const [connectors, setConnectors] = useState([]);
  const [makeLine, setMakeLine] = useState(false);
  const [lineId, setLineId] = useState(0);
  const [fromX, setFromX] = useState(0);
  const [fromY, setFromY] = useState(0);
  const [toX, setToX] = useState(0);
  const [toY, setToY] = useState(0);

  const [fromId, setFromId] = useState();
  const [toId, setToId] = useState();

  const handleDragStart = (e) => {
    console.log(e.target.id());
    var temp = [...shapes];
    shapes[e.target.id()].currentx = e.evt.clientX;
    shapes[e.target.id()].currenty = e.evt.clientY;
    setShapes(temp);
  };

  const handleDragEnd = (e) => {
    // console.log(e.target.children[0].attrs.currentx);
    // console.log(e.target.children[1].attrs.currentx);
    // console.log(e.target.children[2].attrs.currentx);
  };

  const makeLineStart = (e) => {
    setFromId(e.target.attrs.id);
    if (!makeLine) {
      setMakeLine(true);
      // setFromX(e.target.attrs.currentx);
      // setFromY(e.target.attrs.currenty);
    }
  };
  const makeLineEnd = (e) => {
    setToId(e.target.attrs.id);
    if (makeLine) {
      setMakeLine(false);
      // setToX(e.target.attrs.currentx);
      // setToY(e.target.attrs.currenty);
      // const newConnector = {
      //   id: lineId,
      //   from: fromId,
      //   to: toId,
      // };
      // setConnectors(connectors.concat([newConnector]));
      setLineId(lineId + 1);
      // setFromId(null);
      // setToId(null);
    }
  };

  useEffect(() => {
    if (makeLine) {
      const newConnector = {
        id: lineId,
        from: fromId,
        to: toId,
      };
      setConnectors(connectors.concat([newConnector]));
    }
  }, [makeLine]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {connectors.map((con) => {
          console.log(con);
          // var from = shapes[con.from];
          // var to = shapes[con.to];
          // console.log(con.from, con.to);
          // shapes.map((shape) => {
          //   if (con.from === shape.id) from = shape;
          // });
          // shapes.map((shape) => {
          //   if (con.to === shape.id) to = shape;
          // });
          // console.log(from.currentx, from.currenty);
          // console.log(to.currentx, to.currenty);
          return (
            <Line
              key={con.id}
              // points={[from.currentx, from.currenty, to.currentx, to.currenty]}
              stroke="black"
            />
          );
        })}
        {shapes.map((shape) => (
          <Group
            id={shape.id}
            draggable={!makeLine}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Rect
              x={shape.rectx}
              y={shape.recty}
              currentx={shape.currentx}
              currenty={shape.currenty}
              width={200}
              height={200}
              fill={'blue'}
            />
            <Circle
              // id={shape.id}
              x={shape.circle1x}
              y={shape.circle1y}
              currentx={shape.currentx}
              currenty={shape.currenty}
              width={20}
              height={20}
              radius={10}
              fill={'red'}
              onMouseDown={makeLineStart}
              onMouseUp={makeLineEnd}
            />
            <Circle
              id={shape.id}
              x={shape.circle2x}
              y={shape.circle2y}
              currentx={shape.currentx}
              currenty={shape.currenty}
              width={20}
              height={20}
              radius={10}
              fill={'red'}
              onMouseDown={makeLineStart}
              onMouseUp={makeLineEnd}
            />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};

export default App;

// <Circle
//   x={shape.initialx}
//   y={shape.initialy}
//   key={shape.id}
//   fill={fromShapeId === shape.id ? 'red' : 'green'}
//   radius={20}
//   draggable
//   shadowBlur={10}
//   onDragStart={handleDragStart}
//   onDragEnd={handleDragEnd}
// onClick={() => {
//   if (fromShapeId) {
//     const newConnector = {
//       from: fromShapeId,
//       to: shape.id,
//       id: connectors.length,
//     };
//     setConnectors(connectors.concat([newConnector]));
//     setFromShapeId(null);
//   } else {
//     setFromShapeId(shape.id);
//   }
// }}

{
  /* {shapes.map((shape, i) => (
          
            <Rect
              id={shape.id}
              x={shape.initialx}
              y={shape.initialy}
              width={200}
              height={200}
              fill={'black'}
            />
            <Circle
              id={shape.id}
              x={shape.initialx}
              y={shape.initialy}
              width={10}
              height={10}
              fill={fromShapeId === shape.id ? 'red' : 'green'}
            />
        ))} */
}
