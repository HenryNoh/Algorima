export const calfrom = (con, shape) => {
  var from = [];
  if (con.from % 2 === 0) {
    from = {
      x: shape.circle1x + shape.currentx,
      y: shape.circle1y + shape.currenty,
    };
  } else {
    from = {
      x: shape.circle2x + shape.currentx,
      y: shape.circle2y + shape.currenty,
    };
  }
  return from;
};

export const calto = (con, shape) => {
  var to = [];
  if (con.to % 2 === 0) {
    to = {
      x: shape.circle1x + shape.currentx,
      y: shape.circle1y + shape.currenty,
    };
  } else {
    to = {
      x: shape.circle2x + shape.currentx,
      y: shape.circle2y + shape.currenty,
    };
  }
  return to;
};

export const INITIAL_STATE = () => {
  const shapes = [];
  for (var i = 0; i < 2; i++) {
    shapes.push({
      id: i,
      rectx: i * 220 + 20,
      recty: 100,
      circle1x: i * 220 + 40,
      circle1y: 120,
      circle2x: i * 220 + 200,
      circle2y: 120,
      currentx: 0,
      currenty: 0,
      isFill1: false,
      isFill2: false,
    });
  }
  return shapes;
};

export const makeShape = (nextId) => {
  const randomx = Math.random();
  const randomy = Math.random();
  const shape = {
    id: nextId.current,
    rectx: randomx * window.innerWidth,
    recty: randomy * window.innerWidth,
    circle1x: randomx * window.innerWidth + 20,
    circle1y: randomy * window.innerWidth + 20,
    circle2x: randomx * window.innerWidth + 180,
    circle2y: randomy * window.innerWidth + 20,
    currentx: 0,
    currenty: 0,
    isFill1: false,
    isFill2: false,
  };
  return shape;
};
