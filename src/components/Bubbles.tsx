import "./bubbles.scss";
import Sketch from "react-p5";
import p5Types from "p5";
import Matter, { Engine, Events, Runner, Composite, Bodies, Body, Mouse, MousePlus, MouseConstraint } from "matter-js";
import MatterAttractors from "matter-attractors";

const Bubbles = (props: { font: string, words: string[] }) => {
  let attractiveBody: Body;
  let circleBodies: Body[];
  let mouse: Mouse;
  let canvasParent: Element;

  function setup(p5: p5Types, canvasParentRef: Element) {
    canvasParent = canvasParentRef;

    const canvas = p5.createCanvas(canvasParentRef.clientWidth, canvasParentRef.clientHeight);
    canvas.parent(canvasParentRef);
    canvas.style('display', 'block');

    let engine = Engine.create();
    Matter.use(MatterAttractors);
    engine.gravity.scale = 0;

    attractiveBody = Bodies.circle(p5.width/2, p5.height/2, 0, {
      isStatic: true,
      plugin: {
        attractors: [
          function(bodyA: Body, bodyB: Body) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-4,
              y: (bodyA.position.y - bodyB.position.y) * 1e-4,
            };
          }
        ]
      }
    });
    Composite.add(engine.world, attractiveBody);
    circleBodies = [];
    for (let i = 0; i < props.words.length; i++) {
      circleBodies.push(Bodies.circle(Math.floor(Math.random()*p5.width), Math.floor(Math.random()*p5.height), 100));
    }
    Composite.add(engine.world, circleBodies);

    mouse = Mouse.create(canvasParentRef as HTMLElement);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        damping: 1,
        stiffness: 0.1
      }
    });
    mouse.element.removeEventListener("mousewheel", (mouse as MousePlus).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as MousePlus).mousewheel);
    mouse.element.removeEventListener('touchmove', (mouse as MousePlus).mousemove);
    mouse.element.removeEventListener('touchstart', (mouse as MousePlus).mousedown);
    mouse.element.removeEventListener('touchend', (mouse as MousePlus).mouseup);
    Composite.add(engine.world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    Events.on(engine, "afterUpdate", function() {
      Body.setPosition(attractiveBody, {
        x: canvasParentRef.clientWidth/2,
        y: canvasParentRef.clientHeight/2
      });
    });
  }

  function draw(p5: p5Types) {
    p5.clear();
    for (let i = 0; i < circleBodies.length; i++) {
      p5.fill('rgba(0,0,0,0)');
      p5.stroke(255);
      p5.circle(circleBodies[i].position.x, circleBodies[i].position.y, circleBodies[i].circleRadius! * 2);
      p5.textSize(32);
      p5.fill(255);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textFont(props.font);
      p5.text(props.words[i], circleBodies[i].position.x, circleBodies[i].position.y);
    }
  }

  function windowResized(p5: p5Types) {
    p5.resizeCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
  }

  function touchStarted(p5: p5Types) {
    for (let i = 0; i < circleBodies.length; i++) {
      let distance = p5.dist(p5.mouseX, p5.mouseY, circleBodies[i].position.x, circleBodies[i].position.y);
      if (distance <= circleBodies[i].circleRadius!) {
        mouse.element.addEventListener('touchmove', (mouse as MousePlus).mousemove);
        mouse.element.addEventListener('touchstart', (mouse as MousePlus).mousedown);
        mouse.element.addEventListener('touchend', (mouse as MousePlus).mouseup);
      }
    }
  }

  function touchEnded() {
    for (let i = 0; i < circleBodies.length; i++) {
      mouse.element.removeEventListener('touchmove', (mouse as MousePlus).mousemove);
      mouse.element.removeEventListener('touchstart', (mouse as MousePlus).mousedown);
      mouse.element.removeEventListener('touchend', (mouse as MousePlus).mouseup);
    }
  }

  return (
    <Sketch className="Bubbles" setup={setup} draw={draw} windowResized={windowResized} touchStarted={touchStarted} touchEnded={touchEnded} />
  );
}

export default Bubbles;