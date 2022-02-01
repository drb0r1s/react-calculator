import React from "react";
import ParticlesBg from "react-tsparticles";
import { particlesData } from "./particlesData";

const Particles = () => {
    return(
        <ParticlesBg
            options={particlesData}
            canvasClassName="particles-canvas"
        />
    );
}

export default Particles;