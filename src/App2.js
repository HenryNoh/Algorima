import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, Group } from 'react-konva';

const INITIAL_STATE = () => {
  const shapes = [];
  for (var i = 0; i < 3; i++) {
    shapes.push({
      id: i,
      initialx: i * 200,
      initialy: 0,
      currentx: 0,
      currenty: 0,
    });
  }
  return shapes;
};

const App = () => {
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState(INITIAL_STATE);

  const [fromShapeId, setFromShapeId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const handleDragStart = (e) => {};

  const handleDragEnd = (e) => {};

  const onChangeMove = () => {
    setIsMoving(true);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* {lines.map((line, i) => {
          const from = shapes.find((s) => s.id === line.from);
          const to = shapes.find((s) => s.id === line.to);
          return (
            <Line
              key={line.id}
              points={[
                from.currentx + from.initialx,
                from.currenty + from.initialy,
                to.currentx + to.initialx,
                to.currenty + to.initialy,
              ]}
              stroke="black"
            />
          );
        })} */}
        {shapes.map((shape, i) => {
          return (
            <Group
              id={i}
              key={i}
              draggable={!isDrawing}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
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
              {/* <Circle
                id={shape.id}
                x={shape.initialx}
                y={shape.initialy}
                width={10}
                height={10}
                fill={fromShapeId === shape.id ? 'red' : 'green'}
                onMouseDown={() => {
                  setFromShapeId(shape.id);
                  setIsDrawing(true);
                }}
                onMouseMove={() => {
                  if (fromShapeId) {
                    setIsDrawing(true);
                  }
                }}
                onMouseUp={() => {
                  if (fromShapeId) {
                    const newLine = {
                      from: fromShapeId,
                      to: shape.id,
                      id: lines.length,
                    };
                    setLines(lines.concat([newLine]));
                    setFromShapeId(null);
                    setIsDrawing(false);
                  }
                }}
              /> */}
            </Group>
          );
        })}

        {/* <Group draggable width={200} height={200} onDragEnd={handleDragEnd}>
          {rects.map((rect, i) => (
            <Rect
              key={i}
              id={rect.id}
              x={rect.initialx}
              y={rect.initialy}
              width={200}
              height={200}
              fill={'black'}
              onDragEnd={handleDragEnd}
            />
          ))}
          {shapes.map((shape, i) => (
            <Circle
              key={shape.id}
              id={shape.id}
              x={shape.initialx}
              y={shape.initialy}
              width={10}
              height={10}
              fill={fromShapeId === shape.id ? 'red' : 'green'}
              onclick={() => {
                if (fromShapeId) {
                  const newLine = {
                    from: fromShapeId,
                    to: shape.id,
                    id: lines.length,
                  };
                  setLines(lines.concat([newLine]));
                  setFromShapeId(null);
                } else {
                  setFromShapeId(shape.id);
                }
              }}
            />
          ))}
        </Group> */}
      </Layer>
    </Stage>
  );
};

export default App;
