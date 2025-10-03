import { useEffect, useRef } from "react";
import styles from "./NeuralNetworkBackground.module.css";

// Defines the structure for each node in our network.
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/**
 * A React component that renders an animated, interactive neural network background.
 */
function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    // --- Configuration ---
    // Responsive node count based on screen size
    const getNodeCount = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const area = width * height;

      // Base calculation: roughly 1 node per 6000 pixels (reduced from 4000), with min/max bounds
      let nodeCount = Math.floor(area / 10000);

      // Apply screen size specific adjustments (reduced by ~2/3)
      if (width < 768) {
        // Mobile: fewer nodes for performance
        nodeCount = Math.max(100, Math.min(nodeCount, 130));
      } else if (width < 1024) {
        // Tablet: moderate node count
        nodeCount = Math.max(130, Math.min(nodeCount, 230));
      } else if (width < 1920) {
        // Desktop: standard high node count
        nodeCount = Math.max(200, Math.min(nodeCount, 300));
      } else {
        // Large screens: maximum nodes
        nodeCount = Math.max(270, Math.min(nodeCount, 400));
      }

      return nodeCount;
    };

    const nodeRadius = 2;
    const connectionDistance = 100;
    const mouseRadius = 150;
    const nodeColor = "rgba(255, 255, 255, 0.8)";
    const lineColor = "rgba(255, 255, 255, 0.7)";

    let nodes: Node[] = [];
    const mouse = {
      x: null as number | null,
      y: null as number | null,
    };
    /** Initializes the nodes with random positions and velocities. */
    function initialize() {
      if (!canvas) {
        return;
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = [];

      // Recalculate node count for current screen size
      const currentNodeCount = getNodeCount();

      for (let i = 0; i < currentNodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          radius: nodeRadius,
        });
      }
    }

    /** Draws the animation frame by frame. */
    function animate() {
      if (!canvas || !context) {
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const node of nodes) {
        // Update node position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw the node
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = nodeColor;
        context.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            context.beginPath();
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.strokeStyle = lineColor;
            context.lineWidth = 1 - distance / connectionDistance;
            context.stroke();
          }
        }
      }

      // Cursor interaction
      if (mouse.x && mouse.y) {
        for (const node of nodes) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            context.beginPath();
            context.moveTo(mouse.x, mouse.y);
            context.lineTo(node.x, node.y);
            context.strokeStyle = lineColor;
            context.lineWidth = 0.5 * (1 - distance / mouseRadius);
            context.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // --- Event Listeners ---
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleResize = () => {
      initialize();
    };

    // We use arrow functions here to capture the correct `this` context, which
    // is a preferred pattern for event handlers. [cite: 4686]
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    initialize();
    let animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to remove listeners when the component unmounts.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return <canvas ref={canvasRef} className={styles.neuralNetworkCanvas} />;
}

export { NeuralNetworkBackground };
