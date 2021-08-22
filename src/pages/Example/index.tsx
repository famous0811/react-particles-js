import React from "react";
import UseStore from "@store/index";
import { observer } from "mobx-react";

import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Example() {
  const { Tstore } = UseStore();
  return (
    <Wrap>
      <div>{Tstore.number}</div>
      <button onClick={() => Tstore.increase()}>+1</button>
    </Wrap>
  );
}

export default observer(Example);
/* observer로 감싸줌으로써 이 Counter 
클래스는 mobx가 @observable로 지정된 state를 적절히 rerendering 시켜주는 역할을 하게된다.*/

