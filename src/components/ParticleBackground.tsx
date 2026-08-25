import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: false,
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 80, density: { enable: true } },
      color: { value: "#9b7bff" },
      opacity: { value: 0.15 },
      size: { value: { min: 1, max: 3 } },
      links: { enable: true, distance: 140, color: "#9b7bff", opacity: 0.08, width: 1 },
      move: { enable: true, speed: 0.4, direction: "none", random: false, straight: false, outModes: { default: "out" } },
    },
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false }, resize: { enable: true } },
      modes: { repulse: { distance: 80, duration: 0.4 } },
    },
    detectRetina: true,
  };

  if (!init) return null;
  return (
    <Particles
      id="tsparticles-nebula"
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
