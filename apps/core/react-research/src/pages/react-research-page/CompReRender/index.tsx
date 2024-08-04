import {Comp1} from "./Comp1.tsx";
import React, {useState} from "react";

const CompReRender = () => {
  const [showComp, setShowComp] = useState(false)
  return <>
    {
      showComp && <Comp1/>
    }

    {/*<Comp2/>*/}
    <button onClick={() => {
      setShowComp(!showComp)
    }}>toggle</button>
  </>
}

export default CompReRender
