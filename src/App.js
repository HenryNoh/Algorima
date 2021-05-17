import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Circle, Group, Text } from 'react-konva';

const INITIAL_STATE = () => {
  const shapes = [];
  for (var i = 0; i < 3; i++) {
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
      isFill1 : false,
      isFill2 : false,
    });
  }
  return shapes;
};

const App = () => {
  const [shapes, setShapes] = useState(INITIAL_STATE);
  const [connectors, setConnectors] = useState([]);
  const [virtuals, setVirtuals] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [virtualDrawing, setVirtualDrawing] = useState(false);

  const [toX,setToX] = useState(0);
  const [toY,setToY] = useState(0);
  const [fromId, setFromId] = useState(null);
  const [toId, setToId] = useState(null);
  const [cursor,setCursor] = useState();
  const [fill, setFill] = useState();

  const handleDragStart = (e) => {};

  const handleDragMove = (e) =>{
    var temp = [...shapes];
    temp[e.target.id()].currentx = e.target.x();
    temp[e.target.id()].currenty = e.target.y();
    setShapes(temp);
  }

  const handleDragEnd = (e) => {
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
      setVirtualDrawing(true);
      setCursor("move");
    }
  };
  const handleMouseMove = (e) => {
    if (drawing) {
      setToId(e.target.id());
    }
    if(cursor === "move"){
      const container = e.target.getStage().container();
      container.style.cursor = 'move';
    }
    setToX(e.evt.clientX);
    setToY(e.evt.clientY);
    // x,y ÁÂÇ¥ Ã£±â
    if(virtualDrawing){
      const newvirtual = {
        from : fromId,
        tox: toX,
        toy: toY,
      }
      setVirtuals(virtuals.concat([newvirtual]));
      setVirtualDrawing(false);
    }
  };
  const handleMouseUp = (e) => {
    if (drawing) {
      setToId(e.target.id());
    }
    setCursor('default');
    const container = e.target.getStage().container();
    container.style.cursor = 'default';
    if (fromId + '' && toId) {
      const newConnector = {
        from: fromId,
        to: toId,
      };
      setConnectors(connectors.concat([newConnector]));
      setFromId();
      setToId();
      setVirtuals([]);
      setToX();
      setToY();
      if (virtualDrawing){
        setVirtualDrawing(false);
      }
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
        {
          virtuals.map((v)=>{
            var from = [];
            shapes.map((shape)=>{
              if (Math.floor(v.from / 2) === shape.id) {
                if (v.from % 2 === 0) {
                  from = {
                    x: shape.circle1x + shape.currentx,
                    y: shape.circle1y + shape.currenty,
                  };
                }
                else {
                  from = {
                    x: shape.circle2x + shape.currentx,
                    y: shape.circle2y + shape.currenty,
                  };
                }
              }
            })
            return(
              <>
              <Line
              key = {v.id}
              points = {[from.x, from.y, toX, toY]}
              stroke = "#BFFF00"
              strokeWidth = {2}
              lineCap = "round"
              dash = {[5,5]}
              dashEnabled
              />
              <Circle
              key={v.id}
              x={toX}
              y={toY}
              width={10}
              height={10}
              radius={5}
              fill = {'#BFFF00'}
              />
              </>
            )
          })
        }
        {connectors.map((con) => {
          var from = [];
          var to = [];
          shapes.map((shape) => {
            if (Math.floor(con.from / 2) === shape.id) {
              if (con.from % 2 === 0) {
                from = {
                  x: shape.circle1x + shape.currentx,
                  y: shape.circle1y + shape.currenty,
                };
              }
              else {
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
              else {
                to = {
                  x: shape.circle2x + shape.currentx,
                  y: shape.circle2y + shape.currenty,
                };
              }
            }
          });
          console.log(from,to);
          return (
            <Line
              key={con.id}
              points={[from.x, from.y, to.x, to.y]}
              stroke="#222222"
              strokeWidth = {2}
            />
          );
        })}
        {shapes.map((shape) => (
          <Group
            id={shape.id}
            draggable={!drawing}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <Rect
              x={shape.rectx}
              y={shape.recty}
              width={200}
              height={200}
              fill={'#555555'}
              cornerRadius={5}
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
              stroke={'white'}
              fill={shape.isFill1 ? '#BFFF00' : '#555555'}
              onMouseEnter={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'pointer';
                const id = e.target.id();
                setShapes(
                  shapes.map((shape)=>{
                      return({
                        ...shape,
                        isFill1 : shape.id === Math.floor(id / 2),
                      })
                    }
                ))
              }}
              onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'default';
                const id = e.target.id();
                setShapes(
                  shapes.map((shape)=>{
                      return({
                        ...shape,
                        isFill1 : false,
                      })
                  })
                )
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
              stroke={'white'}
              fill={shape.isFill2? '#BFFF00' : '#555555'}
              onMouseEnter={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'pointer';
                const id = e.target.id();
                setShapes(
                  shapes.map((shape)=>{
                      return({
                        ...shape,
                        isFill2 : shape.id === Math.floor(id / 2),
                      })
                  })
                )
              }}
              onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'default';
                const id = e.target.id();
                setShapes(
                  shapes.map((shape)=>{
                      return({
                        ...shape,
                        isFill2 : false,
                      })
                  })
                )
              }}
              onMouseOver={preventDragStart}
              onMouseOut={preventDragEnd}
            />
          </Group>
        ))}
      <Text
        x=  {0}
        y = {0}
        text = {`x: ${toX} y: ${toY}`}
        />
      </Layer>
    </Stage>

  );
};

export default App;