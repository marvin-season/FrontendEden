import {Comp1} from "@/pages/CompReRender/Comp1.tsx";
import React, {useState} from "react";
import {Comp2} from "@/pages/CompReRender/Comp2.tsx";

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
