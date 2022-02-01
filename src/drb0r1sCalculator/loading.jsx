import React, { useEffect, useRef, useMemo } from "react";

/* eslint no-eval: 0 */

const Loading = () => {
    const loaderStrong = useRef(null);

    const operations = useMemo(() => {
        return ["+", "-", "*", "/"];
    }, []);

    useEffect(() => {
        const min = 1;
        const max = 50;
        
        const calcString = `${Math.floor(Math.random() * (max - min) + min)} ${operations[Math.floor(Math.random() * operations.length)]} ${Math.floor(Math.random() * (max - min) + min)}`
        const isInt = eval(calcString) % 1 === 0;
        loaderStrong.current.innerHTML = `${calcString} = ${isInt ? eval(calcString) : eval(calcString).toFixed(2)}`;
    }, [operations]);
    
    return(
        <div className="loading">
            <div className="loader"></div>
            <strong ref={loaderStrong}></strong>
        </div>
    );
}

export default Loading;