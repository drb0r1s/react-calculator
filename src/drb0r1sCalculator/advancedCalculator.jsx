import React, { useState } from "react";
import { aCalcKeyboard } from "./data";
import { typeCalc } from "./calculator-components/typeCalc";

import Screen from "./calculator-components/screen";
import Signature from "./calculator-components/signature";

const AdvancedCalculator = (props) => {
    const { setRef, changeAdvanced } = props;

    const [calculation, setCalculation] = useState("");
    const [solution, setSolution] = useState("");
    const [prevInput, setPrevInput] = useState("");
    const [brackets, setBrackets] = useState({
        open: 0, close: 0
    });
    
    return(
        <section className="advanced-calculator" ref={setRef}>
            <Screen
                solution={solution}
                calculation={calculation}
            />
            
            <div className="keyboard">
                {aCalcKeyboard.map((key, index) => {
                    const isInverted = !isNaN(parseInt(key)) || key === "." || key === "A";
                    
                    return <button
                        key={index}
                        className={isInverted && key !== "1/x" ? `keyboard-${index} invert-button` : `keyboard-${index}`}
                        onClick={index === 0 ? changeAdvanced : () => typeCalc(
                            key, calculation, setCalculation,
                            solution, setSolution, prevInput,
                            setPrevInput, brackets, setBrackets
                        )}
                    >{key}</button>
                })}
            </div>

            <Signature />
        </section>
    );
}

export default AdvancedCalculator;