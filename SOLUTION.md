## **Components**

#### 1. Shapes.js
영상의 두 원과 한개의 사각형을 Group으로 묶어놓은 Component입니다.  
1개의 Shpae에는 id, rectx, recty, circle1x, circle1y, circle2x, circle2y, currentx, currenty, isFill1, isFill2의 속성값을 가지고 있습니다.  
컴포넌트의 rectx, recty, circle1x, circle1y, circle2x, circle2y는 초기 생성되는 위치값이며  
React-Konva의 draggble 속성으로 인한 drag 이벤트 발생 시 해당 컴포넌트가 렌더링 된 x,y의 값을 직접 바꿔줘서는 안됩니다.  
따라서 실시간으로 바뀌는 위치의 x,y값을 저장하기 위하여 각 컴포넌트는 currentx와 currenty를 가집니다.  
isFill1과 isFill2는 각각 왼쪽 원과 오른쪽 원의 hover값을 변경하기 위한 속성입니다.  

#### 2. Virtuals.js
드래그 도중 선의 위치를 실시간으로 보여주기 위한 Component입니다.  
시작지점의 위치를 받아오는 from.x, from.y  
선을 긋는 이벤트 발생시 현재 마우스 커서의 좌표를 받아오는 toX, toY  
가 props의 속성값으로 주어집니다.  

#### 3. Connectors.js
드래그가 완료 됐을 때 선을 보여주기 위한 Component입니다.  
시작지점의 위치를 받아오는 from.x, from.y  
도착지점의 위치를 받아오는 to.x, to.y  
가 props의 속성값으로 주어집니다.  

#### 4. Button.js
Button은 2개로 사용됩니다.  
  
화면의 랜덤한 위치에 shape를 생성하는 create Button  
현재 화면에서 동작하는 행위를 보여주기 위한 debug Button  
  
해당 Button의 강조를 위한 onMouseEnter, onMouseLeave를 사용하며  
Rect와 Text를 사용하여 구성하였습니다.  

#### 5. function.js
한개의 shape 그룹은 circle1과 circle2를 동시에 가지기 때문에 fromId와 toId를 계산해주는 과정이 필요합니다.  
따라서 calfrom과 calto를 사용하여 왼쪽 원인지 오른쪽 원인지를 계산한 후 해당 객체를 담아서 선을 보여주는 Virtuals와 Connectors로 넘겨줍니다.  
  
또한 초기 상태를 생성하는 INITIAL_STATE 새로운 shape를 생성하는 makeShape 함수가 있습니다.  


## **Logic**

#### 1.
- shape의 실시간 좌표값을 저장하기 위하여 shape가 drag될 때 shape의 currentx, currenty값을 계속해서 변경해줍니다.  
- shape의 circle로 cursor가 들어오며 나갈때 drawing 변수를 true로 바꾸어 draggable을 방지해줍니다. (onMouseOver , onMouseOut)  
- shape의 circle로 cursor가 들어와있거나 나가있을 때 circle의 fill 값을 변경해줍니다. (onMouseEnter, onMouseLeave)  
  
#### 2.
- Stage에서 Mousedown이 될 때 drawing이 true일 경우 선을 긋기 시작합니다. (onMouseDown)  
  - 원에 들어 왔을 경우 FromId를 해당 원의 id로 정해줍니다.  
  
- Stage에서 MouseMove일 경우 cursor를 'move'로 바꾸어줍니다.  
  - FromID와 toX와 toY를 이용하여 virtuals를 생성해줍니다.  
  - virtuals는 1번만 그립니다.  
  
- Stage에서 MouseUp이 될 때 cursor를 'default'로 바꾸어줍니다.  
  - 원에 들어 왔을 경우 ToId를 해당 원의 id로 정해줍니다.  
  - FromId와 ToId를 이용하여 Connectors를 생성해줍니다.  
  
#### 3.
- handleOnClick 함수는 Create 버튼 클릭 시 shape를 생성하기 위한 함수입니다.  
- changeDebug 함수는 debug 버튼 on/off를 위한 함수입니다.  
