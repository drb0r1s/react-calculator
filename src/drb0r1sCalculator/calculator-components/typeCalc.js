/* eslint no-eval: 0 */

export function typeCalc(
    x, calculation, setCalculation,
    solution, setSolution, prevInput,
    setPrevInput, brackets, setBrackets
) { 
    const translator = {
        root: "Math.sqrt",
        crt: "Math.cbrt",
        sn: "Math.sin",
        cs: "Math.cos",
        tn: "Math.tan",
        cg: "1 / Math.tan",
        lg: "Math.log",
        lg2: "Math.log2",
        "x^2": "mySq",
        "x^3": "myCb",
        rec: "myRec",
        "|x|": "Math.abs",
        pi: "Math.PI",
        e: "Math.E"
    };

    const lastInput = calculation.substr(-1);

    const ERRORS = {
        SOLUTION_CHECK: solution || solution === 0,
        ADVANCED_OPERATOR: lastInput !== " " && calculation.substr(-1) !== "(" && calculation.length > 0
    };

    switch(x) {
        case "=":
            const NaNFalse = !calculation && calculation !== 0;
            
            if(NaNFalse || calculation === "-") return;
            if(brackets.open !== brackets.close) return;
        
            const validEnd = [")", "i", "e"];
            let isValid;

            if(
                !isNaN(parseInt(calculation.substr(-1))) ||
                validEnd.indexOf(calculation.substr(-1)) > -1
            ) isValid = calculation;
            
            else {
                let deleteInput = 0;
                
                if(isNaN(parseInt(calculation.substr(-2))) && calculation.substr(-2)[0] !== " " && calculation.substr(-2)[1] === "(") {
                    const newCalculation = calculation.substr(0, calculation.length - checkLength(calculation));
                    let newDeleteInput = 0;
                    
                    if(calculation.length - checkLength(calculation) === 0) newDeleteInput = 0;
                    else if(newCalculation.substr(-1) === "(") newDeleteInput = 4;
                    else newDeleteInput = 3;

                    deleteInput = checkLength(calculation) + newDeleteInput;
                }

                else if(calculation.substr(-1) === ".") deleteInput = 1;
                else if(calculation.substr(-1) === "(") deleteInput = 4;
                else deleteInput = 3;

                isValid = calculation.substr(0, calculation.length - deleteInput);
            }

            const translatorKeys = Object.keys(translator);
            const translatorValues = Object.values(translator);
            let translatedCalc = isValid;

            const allCalculation = isValid.split(" ");
            const translated = [];
            
            allCalculation.forEach((c) => {
                let finalC = c;

                const basicName = finalC.split("(");

                basicName.forEach((name) => {
                    const translateText = name.split(")")[0];
                    
                    if(translatorKeys.indexOf(translateText) > - 1 && translated.indexOf(translateText) === -1) {
                        translated.push(translateText);
                        translatedCalc = translatedCalc.replaceAll(translateText, translatorValues[translatorKeys.indexOf(translateText)]);
                    }
                });
            });
            
            const formatSolution = eval(translatedCalc) % 1 === 0 ? eval(translatedCalc) : eval(translatedCalc).toFixed(2);
            if(isNaN(formatSolution)) return;
            
            setSolution(formatSolution);
            setCalculation("");
            setPrevInput(translatedCalc.substr(-1));
            setBrackets({ open: 0, close: 0 });

            break;
        case "C":
            setCalculation("");
            setSolution("");
            setPrevInput("");
            setBrackets({ open: 0, close: 0 });

            break;
        case "D":
            const isSolution = solution ? solution.toString() : calculation;
            const oneDelete = [".", ")"];
            
            const bracketsArray = ["(", ")"];
            let isBracketDeleted = bracketsArray.indexOf(isSolution.substr(-1));
        
            const numberOfReturns = !isNaN(parseInt(isSolution.substr(-1))) || oneDelete.indexOf(isSolution.substr(-1)) > - 1;
            let deleteInput;

            if(isBracketDeleted > - 1) {
                const bracketsKeys = Object.keys(brackets);
                const bracketsValues = Object.values(brackets);

                setBrackets({...brackets, [bracketsKeys[isBracketDeleted]]: bracketsValues[isBracketDeleted] - 1});
            }

            if(numberOfReturns) deleteInput = 1;
            
            else {
                const normalAdvanced = isNaN(parseInt(isSolution.substr(-2))) && isSolution.substr(-2)[0] !== " " && isSolution.substr(-2)[0] !== "(" && isSolution.substr(-2)[1] === "(";
                const specialAdvanced = isSolution.substr(-1) === "i" || isSolution.substr(-1) === "e";
                
                if(normalAdvanced || specialAdvanced) deleteInput = checkLength(isSolution);
                else if(isSolution.substr(-2)[0] === " " && isSolution.substr(-2)[1] === "(") deleteInput = 4;
                else if(isSolution.substr(-2)[0] === "(" && isSolution.substr(-2)[1] === "(") {
                    deleteInput = 1;
                    setBrackets({...brackets, open: brackets.open - 1});
                }
                else deleteInput = 3;
            }
            
            const deleteLastInput = isSolution.substr(0, isSolution.length - deleteInput);
            
            setCalculation(deleteLastInput);
            setPrevInput(deleteLastInput.substr(-1));
            setSolution("");
            
            break;
        case "()":
            let isOpen;
            const validCloseBracket = [")", "i", "e"];
            
            if(!isNaN(parseInt(lastInput)) || validCloseBracket.indexOf(lastInput) > -1) isOpen = false;
            else if(lastInput === ".") isOpen = "error";
            else isOpen = true;

            if(isOpen === "error") return;

            if(isOpen) {
                if(lastInput && lastInput !== " " && lastInput !== "(") return;

                setCalculation(calculation + "(");
                setBrackets({...brackets, open: brackets.open + 1});
                setPrevInput("(");
            }

            else {
                if(brackets.close >= brackets.open) return;

                setCalculation(calculation + ")");
                setBrackets({...brackets, close: brackets.close + 1});
                setPrevInput(")");
            }

            break;
        default:
    }

    const advanced = "root crt sn cs tn cg lg lg2 x^2 x^3 rec |x| pi e";
    const advancedOperations = advanced.split(" ");
    const checkAdvanced = advancedOperations.indexOf(x);

    if(checkAdvanced > -1) {
        if(ERRORS.SOLUTION_CHECK || ERRORS.ADVANCED_OPERATOR) return;

        if(checkAdvanced > advancedOperations.length - 3) {
            setCalculation(calculation + advancedOperations[checkAdvanced]);
            setPrevInput(advancedOperations[checkAdvanced].substr(-1));
        }
        
        else {
            setCalculation(calculation + advancedOperations[checkAdvanced] + "(");
            setBrackets({...brackets, open: brackets.open + 1});
        }
    }

    const operations = ["+", "-", "*", "/", "%"];
    const validDividers = [" ", "("];
    const validOperator = [")", "i", "e"];
    const negativeNumberCase = prevInput === "(" && x === "-";
    const validInput = !isNaN(parseInt(x)) || operations.indexOf(x) !== -1 || x === ".";
    const oneOperator = !isNaN(parseInt(x)) || !isNaN(parseInt(prevInput)) || validOperator.indexOf(prevInput) > -1 || negativeNumberCase;

    if(validInput && oneOperator) {
        if((!isNaN(parseInt(x)) || x === ".") && validOperator.indexOf(lastInput) > - 1) return;
        if(x === "." && !dotFinder(calculation)) return;
        
        const zeroCase = validDividers.indexOf(calculation.substr(-2)[0]) > -1 || calculation.substr(-2)[0] === "0";
        if(prevInput === "0" && zeroCase && !isNaN(parseInt(x)) && dotFinder(calculation)) calculation += ".";
        
        let solutionValue = solution || solution === 0 ? solution.toString() : "";
        setSolution("");
        
        if(solutionValue === "0" && !isNaN(parseInt(x))) solutionValue += ".";

        const prevCalculation = solutionValue + calculation;
        
        const checkSpace = isNaN(parseInt(x)) && x !== ".";
        checkSpace ? setCalculation(prevCalculation + ` ${x} `) : setCalculation(prevCalculation + x);
        setPrevInput(x);
    }

    const fakeCall = true;
    if(!fakeCall) {
        myRec();
        mySq();
        myCb();
    }
}

function checkLength(word) {
    let findSpace = 0;
    let stopLoop = false;
                    
    for(let i = word.length - 2; i > 0; i--) {
        if(!stopLoop) {
            if(word[i] === " " || word[i] === "(") stopLoop = true;
            else findSpace++;
        }
    }
    
    if(findSpace === word.length - 2) return findSpace + 2;
    return findSpace + 1;
}

function dotFinder(string) {
    let validDot;
    let stopLoop = false;
    let positions = { dot: 0, divider: 0 };

    const validDividers = [" ", "("];
    
    for(let i = string.length - 2; i > 0; i--) {
        if(!stopLoop) {
            if(validDividers.indexOf(string[i]) > -1) {
                positions.divider = i;
                stopLoop = true;
            }

            if(string[i] === ".") {
                positions.dot = i;
                stopLoop = true;
            }
        }
    }

    validDot = positions.dot < positions.divider || positions.dot === positions.divider;
    return validDot;
}

function myRec(x) {
    return 1 / x;
}

function mySq(x) {
    return x * x;
}

function myCb(x) {
    return x * x * x;
}