import React, { useState, useRef } from 'react';
import Button from './Components/Button.js';
import Shapes from './Components/Shapes.js';
import Virtuals from './Components/Virtuals.js';
import Connectors from './Components/Connectors.js';
import {
  calfrom,
  calto,
  INITIAL_STATE,
  makeShape,
} from './Components/function.js';
import { Text, Stage, Layer } from 'react-konva';

const App = () => {
  const nextId = useRef(2);
  const [shapes, setShapes] = useState(INITIAL_STATE);
  const [connectors, setConnectors] = useState([]);
  const [virtuals, setVirtuals] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [virtualDrawing, setVirtualDrawing] = useState(false);
  const [debug, setDebug] = useState(false);

  const [toX, setToX] = useState(0);
  const [toY, setToY] = useState(0);
  const [fromId, setFromId] = useState();

  const [toId, setToId] = useState();
  const [cursor, setCursor] = useState();

  // onMouseDown
  const handleMouseDown = (e) => {
    if (drawing) {
      setFromId(e.target.id());
      setVirtualDrawing(true);
      setCursor('move');
      setDragging(true);
    }
  };

  // onMouseMove
  const handleMouseMove = (e) => {
    if (drawing && dragging) {
      setToId(e.target.id());
    }
    if (cursor === 'move') {
      const container = e.target.getStage().container();
      container.style.cursor = 'move';
    }

    setToX(e.evt.clientX);
    setToY(e.evt.clientY);
    if (virtualDrawing) {
      const newvirtual = {
        from: fromId,
        tox: toX,
        toy: toY,
      };
      setVirtuals(virtuals.concat([newvirtual]));
      setVirtualDrawing(false);
    }
  };

  // onMouseUp
  const handleMouseUp = (e) => {
    if (drawing) {
      setToId(e.target.id());
      setFromId();
      setToId();
      setDrawing(false);
      setDragging(false);
    }
    setCursor('default');
    const container = e.target.getStage().container();
    container.style.cursor = 'default';
    setVirtualDrawing(false);
    if (fromId + '' && toId + '') {
      const newConnector = {
        from: fromId,
        to: toId,
      };
      setConnectors(connectors.concat([newConnector]));

      if (!virtualDrawing) {
        setVirtuals([]);
      }
    }
    setFromId();
    setToId();
    setDragging();
  };

  //onClick
  const handleOnClick = (e) => {
    const shape = makeShape(nextId);
    setShapes([...shapes, shape]);
    nextId.current += 1;
  };
  const changeDebug = (e) => {
    debug ? setDebug(false) : setDebug(true);
  };

  // rendering
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {/* Create Button */}
        <Button handleOnClick={handleOnClick} x={20} text={'create'} />
        {/* Debug Button */}
        <Button handleOnClick={changeDebug} x={320} text={'debug'} />
        {/* virtuals */}
        {virtuals.map((v, i) => {
          var from = [];
          shapes.map((shape) => {
            if (Math.floor(v.from / 2) === shape.id) {
              from = calfrom(v, shape);
            }
            return shape;
          });
          return <Virtuals key={i} id={v.id} from={from} toX={toX} toY={toY} />;
        })}
        {/* connectors */}
        {connectors.map((con, i) => {
          var from = [];
          var to = [];
          shapes.map((shape) => {
            if (Math.floor(con.from / 2) === shape.id) {
              from = calfrom(con, shape);
            }
            if (Math.floor(con.to / 2) === shape.id) {
              to = calto(con, shape);
            }
            return shape;
          });
          if (!from && !to) {
            return null;
          }
          return <Connectors key={i} id={con.id} from={from} to={to} />;
        })}
        {/* Shapes */}
        <Shapes
          drawing={drawing}
          setDrawing={setDrawing}
          shapes={shapes}
          setShapes={setShapes}
          setToId={setToId}
        />
        {/* Debug Text */}
        {debug ? (
          <Text
            x={window.innerWidth / 2}
            y={20}
            fontSize={20}
            text={`
            From.Id : ${fromId + '' ? fromId : false}
            To.Id : ${toId + '' ? toId : false}

            Mouse.X : ${toX}
            Mouse.Y : ${toY}

            Drawing Now? : ${dragging ? true : false}
            `}
          />
        ) : null}
      </Layer>
    </Stage>
  );
};

export default App;
