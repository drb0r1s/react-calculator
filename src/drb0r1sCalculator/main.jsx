import React, { useState, useEffect, useRef } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import Particles from "./particles/particles";

import Loading from "./loading";
import Calculator from "./calculator";
import AdvancedCalculator from "./advancedCalculator";

import reactLogo from "./images/react-blue-logo.png";
import borisReact from "./images/boris-react-white-logo.png";

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdvanced, setIsAdvanced] = useState(false);

    const calc = useRef(null);
    const aCalc = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    function changeAdvanced() {
        if(isAdvanced) {
            aCalc.current.style.opacity = "0";

            setTimeout(() => {
                setIsAdvanced(false);
                calc.current.style.opacity = "0";
                calc.current.style.transform = "rotate(-90deg)";

                setTimeout(() => {
                    calc.current.style.opacity = "1";
                    calc.current.style.transform = "rotate(0)";
                }, 100);
            }, 500);
        }

        else {
            calc.current.style.opacity = "0";
            calc.current.style.transform = "rotate(-90deg)";

            setTimeout(() => {
                setIsAdvanced(true);

                setTimeout(() => {
                    aCalc.current.style.opacity = "1";
                }, 100);
            }, 500);
        }
    }
    
    if(isLoading) {
        return <Loading />;
    }
    
    return(
        <HelmetProvider>
            <Helmet>
                <title>React Calculator</title>

                <meta name="author" content="drb0r1s" />
                <meta name="description" content="Calculator - React Functional Components" />
                <meta name="keywords" content="Calculator, React Calculator, React, React Functional Components, JavaScript, drb0r1s" />
            </Helmet>
            
            <section className="app">
                <Particles />
            
                <div className="container">
                    <div className="row app-holder">
                        <div className="col-lg-5 logo-holder">
                            <div className="title">
                                <img src={reactLogo} alt="R E A C T" />
                                <h1>calc<span>ulator</span></h1>
                            </div>

                            <a href="https://boris.ml">
                                <img src={borisReact} alt="B O R I S" />
                            </a>
                        </div>

                        <div className="col-lg-7 calc-holder">
                            <div className="calculator-holder">
                                {isAdvanced ? <AdvancedCalculator
                                    setRef={aCalc}
                                    changeAdvanced={changeAdvanced}
                                /> : <Calculator
                                    setRef={calc}
                                    changeAdvanced={changeAdvanced}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </HelmetProvider>
    );
}

export default Main;