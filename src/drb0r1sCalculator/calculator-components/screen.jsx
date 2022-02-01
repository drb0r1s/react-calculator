import React, { useEffect, useRef } from "react";

const Screen = (props) => {
    const {
        solution, calculation
    } = props;

    const screen = useRef(null);
    const screenP = useRef(null);

    useEffect(() => {
        const moveStart = (event) => {
            const screenValueX = screenP.current.style.left;
            const screenLeft = screenValueX.substring(0, screenValueX.length - 2);

            const screenValueY = screenP.current.style.top;
            const screenTop = screenValueY.substring(0, screenValueY.length - 2);

            const prevX = event.type === "mousedown" ? event.clientX : event.targetTouches[0].clientX;
            const prevY = event.type === "mousedown" ? event.clientY : event.targetTouches[0].clientY;
            
            const moveMove = (event) => {
                event.preventDefault();
                
                const newX = prevX - (event.type === "mousemove" ? event.clientX : event.targetTouches[0].clientX);
                const newY = prevY - (event.type === "mousemove" ? event.clientY : event.targetTouches[0].clientY);

                screenP.current.style.left = screenLeft - newX + "px";
                screenP.current.style.top = screenTop - newY + "px";
            }

            const moveUp = () => {
                window.removeEventListener("mousemove", moveMove);
                window.removeEventListener("mouseup", moveUp);

                window.removeEventListener("touchmove", moveMove);
                window.removeEventListener("touchend", moveUp);

                screenP.current.style.transition = "300ms";
                screenP.current.style.left = "0";
                screenP.current.style.top = "0";

                setTimeout(() => {
                    screenP.current.style.transition = "0ms";
                }, 300);
            }

            window.addEventListener("mousemove", moveMove);
            window.addEventListener("mouseup", moveUp);

            window.addEventListener("touchmove", moveMove, { passive: false });
            window.addEventListener("touchend", moveUp);
        }
        
        screen.current.addEventListener("mousedown", moveStart);
        screen.current.addEventListener("touchstart", moveStart);
    }, []);
    
    return(
        <div className="screen" ref={screen}>
            <p
                ref={screenP}
                style={solution || solution === 0 ? { color: "#0099ff" } : { color: "white" }}
            >{solution || solution === 0 ? solution : calculation}</p>
        </div>
    );
}

export default Screen;