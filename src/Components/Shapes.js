import React from 'react';
import { Rect, Circle, Group } from 'react-konva';

const Shapes = (props) => {
  const handleDragStart = (e) => {};

  const handleDragMove = (e) => {
    var temp = [...props.shapes];
    temp[e.target.id()].currentx = e.target.x();
    temp[e.target.id()].currenty = e.target.y();
    props.setShapes(temp);
  };

  const handleDragEnd = (e) => {
    var temp = [...props.shapes];
    temp[e.target.id()].currentx = e.target.x();
    temp[e.target.id()].currenty = e.target.y();
    props.setShapes(temp);
  };

  const handleMouseEnter1 = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'pointer';
    const id = e.target.id();
    props.setShapes(
      props.shapes.map((shape) => {
        return {
          ...shape,
          isFill1: shape.id === Math.floor(id / 2),
        };
      })
    );
  };

  const handleMouseEnter2 = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'pointer';
    const id = e.target.id();
    props.setShapes(
      props.shapes.map((shape) => {
        return {
          ...shape,
          isFill2: shape.id === Math.floor(id / 2),
        };
      })
    );
  };

  const handleMouseLeave = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'default';
    props.setToId();
    props.setShapes(
      props.shapes.map((shape) => {
        return {
          ...shape,
          isFill1: false,
          isFill2: false,
        };
      })
    );
  };

  const preventDragStart = (e) => {
    if (!props.drawing) {
      props.setDrawing(true);
    }
  };
  const preventDragEnd = (e) => {
    if (props.drawing) {
      props.setDrawing(false);
    }
  };
  return (
    <>
      {props.shapes.map((shape) => (
        <Group
          key={shape.id}
          id={shape.id}
          draggable={!props.drawing}
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
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave}
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
            fill={shape.isFill2 ? '#BFFF00' : '#555555'}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave}
            onMouseOver={preventDragStart}
            onMouseOut={preventDragEnd}
          />
        </Group>
      ))}
    </>
  );
};

export default Shapes;
