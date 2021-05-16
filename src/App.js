import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle, Group } from 'react-konva';

const INITIAL_STATE = () => {
  const shapes = [];
  for (var i = 0; i < 2; i++) {
    shapes.push({
      id: i,
      rectx: i * 220,
      recty: 0,
      circle1x: i * 220 + 20,
      circle1y: 20,
      circle2x: i * 220 + 180,
      circle2y: 20,
      currentx: 0,
      currenty: 0,
    });
  }
  return shapes;
};

const App = () => {
  const [shapes, setShapes] = useState(INITIAL_STATE);
  const [connectors, setConnectors] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const [fromId, setFromId] = useState(0);
  const [toId, setToId] = useState(0);

  const handleDragStart = (e) => {};

  const handleDragEnd = (e) => {
    console.log(e.target);
    var temp = [...shapes];
    temp[e.target.id()].currentx = e.target.x();
    temp[e.target.id()].currenty = e.target.y();
    setShapes(temp);
  };

  const preventDragStart = (e) => {
    if (!drawing) {
      setDrawing(true);
    }
  };
  const preventDragEnd = (e) => {
    if (drawing) {
      setDrawing(false);
    }
  };

  const handleMouseDown = (e) => {
    if (drawing) {
      setFromId(e.target.id());
    }
  };
  const handleMouseMove = (e) => {
    if (drawing) {
      setToId(e.target.id());
    }
  };
  const handleMouseUp = (e) => {
    if (drawing) {
      setToId(e.target.id());
    }
    if (fromId && toId) {
      const newConnector = {
        from: fromId,
        to: toId,
      };
      setConnectors(connectors.concat([newConnector]));
      setFromId();
      setToId();
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {connectors.map((con) => {
          // console.log(con.from / 2);
          var from = [];
          var to = [];
          console.log(con.from / 2, con.to / 2);
          shapes.map((shape) => {
            if (Math.floor(con.from / 2) === shape.id) {
              if (con.from % 2 === 0) {
                from = {
                  x: shape.circle1x + shape.currentx,
                  y: shape.circle1y + shape.currenty,
                };
              }
              if (con.from % 2 === 1) {
                from = {
                  x: shape.circle2x + shape.currentx,
                  y: shape.circle2y + shape.currenty,
                };
              }
            }
            if (Math.floor(con.to / 2) === shape.id) {
              if (con.to % 2 === 0) {
                to = {
                  x: shape.circle1x + shape.currentx,
                  y: shape.circle1y + shape.currenty,
                };
              }
              if (con.to % 2 === 1) {
                to = {
                  x: shape.circle2x + shape.currentx,
                  y: shape.circle2y + shape.currenty,
                };
              }
            }
          });
          // shapes.map((shape) => {
          // });
          console.log(from, to);
          return (
            <Line
              key={con.id}
              points={[from.x, from.y, to.x, to.y]}
              stroke="black"
            />
          );
        })}
        {shapes.map((shape) => (
          <Group
            id={shape.id}
            draggable={!drawing}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Rect
              x={shape.rectx}
              y={shape.recty}
              width={200}
              height={200}
              fill={'#333333'}
            />
            <Circle
              id={shape.id * 2}
              x={shape.circle1x}
              y={shape.circle1y}
              currentx={shape.currentx}
              currenty={shape.currenty}
              width={10}
              height={10}
              radius={5}
              fill={'#000000'}
              onMouseEnter={(e) => {
                // style stage container:
                const container = e.target.getStage().container();
                container.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'default';
              }}
              onMouseOver={preventDragStart}
              onMouseOut={preventDragEnd}
            />
            <Circle
              id={shape.id * 2 + 1}
              x={shape.circle2x}
              y={shape.circle2y}
              currentx={shape.currentx}
              currenty={shape.currenty}
              width={10}
              height={10}
              radius={5}
              fill={'#000000'}
              onMouseEnter={(e) => {
                // style stage container:
                const container = e.target.getStage().container();
                container.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'default';
              }}
              onMouseOver={preventDragStart}
              onMouseOut={preventDragEnd}
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
