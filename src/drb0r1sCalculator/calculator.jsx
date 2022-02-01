import React, { useState } from "react";
import { calcKeyboard } from "./data";
import { typeCalc } from "./calculator-components/typeCalc";

import Screen from "./calculator-components/screen";
import Signature from "./calculator-components/signature";

const Calculator = (props) => {
    const { setRef, changeAdvanced } = props;
    
    const [calculation, setCalculation] = useState("");
    const [solution, setSolution] = useState("");
    const [prevInput, setPrevInput] = useState("");
    const [brackets, setBrackets] = useState({ open: 0, close: 0 });
    
    return(
        <section className="calculator" ref={setRef}>
            <Signature />
            
            <Screen
                solution={solution}
                calculation={calculation}
            />
            
            <div className="keyboard">
                {calcKeyboard.map((key, index) => {
                    const isInverted = isNaN(parseInt(key)) && key !== "." && key !== "A";
                    
                    return <button
                        key={index} 
                        className={isInverted ? `keyboard-${index} invert-button` : `keyboard-${index}`}
                        onClick={index === 18 ? changeAdvanced : () => typeCalc(
                            key, calculation, setCalculation,
                            solution, setSolution, prevInput,
                            setPrevInput, brackets, setBrackets
                        )}
                    >{key}</button>
                })}
            </div>
        </section>
    );
}

export default Calculator;