"use client";

import { useEffect, useRef } from "react";

type ShapeGridDirection = "diagonal" | "up" | "right" | "down" | "left";
type ShapeGridShape = "square" | "hexagon" | "circle" | "triangle";
type GridCell = { x: number; y: number };

interface ShapeGridProps {
  borderColor?: string;
  className?: string;
  direction?: ShapeGridDirection;
  hoverFillColor?: string;
  hoverTrailAmount?: number;
  shape?: ShapeGridShape;
  speed?: number;
  squareSize?: number;
}

export default function ShapeGrid({
  borderColor = "rgba(15, 23, 42, 0.08)",
  className = "",
  direction = "diagonal",
  hoverFillColor = "rgba(82, 39, 255, 0.08)",
  hoverTrailAmount = 0,
  shape = "square",
  speed = 1,
  squareSize = 40,
}: ShapeGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const cellOpacitiesRef = useRef(new Map<string, number>());
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const hoveredCellRef = useRef<GridCell | null>(null);
  const trailCellsRef = useRef<GridCell[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!wrapper || !canvas || !context) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const isHex = shape === "hexagon";
    const isTriangle = shape === "triangle";
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let isVisible = false;
    let reducedMotion = prefersReducedMotion.matches;
    let width = 1;
    let height = 1;
    let cellSize = squareSize;
    let animationSpeed = speed;
    let hexHorizontal = cellSize * 1.5;
    let hexVertical = cellSize * Math.sqrt(3);

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      cellSize =
        width < 640
          ? Math.min(squareSize, 44)
          : width < 1024
            ? Math.min(squareSize, 50)
            : squareSize;
      animationSpeed = width < 640 ? Math.min(speed, 0.12) : speed;
      hexHorizontal = cellSize * 1.5;
      hexVertical = cellSize * Math.sqrt(3);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawHex = (cx: number, cy: number, size: number) => {
      context.beginPath();
      for (let index = 0; index < 6; index += 1) {
        const angle = (Math.PI / 3) * index;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (index === 0) context.moveTo(vx, vy);
        else context.lineTo(vx, vy);
      }
      context.closePath();
    };

    const drawCircle = (cx: number, cy: number, size: number) => {
      context.beginPath();
      context.arc(cx, cy, size / 2, 0, Math.PI * 2);
      context.closePath();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      shouldFlip: boolean
    ) => {
      context.beginPath();

      if (shouldFlip) {
        context.moveTo(cx, cy + size / 2);
        context.lineTo(cx + size / 2, cy - size / 2);
        context.lineTo(cx - size / 2, cy - size / 2);
      } else {
        context.moveTo(cx, cy - size / 2);
        context.lineTo(cx + size / 2, cy + size / 2);
        context.lineTo(cx - size / 2, cy + size / 2);
      }

      context.closePath();
    };

    const fillHoveredCell = (cellKey: string, draw: () => void) => {
      const alpha = cellOpacitiesRef.current.get(cellKey);
      if (!alpha) return;

      context.globalAlpha = alpha;
      draw();
      context.fillStyle = hoverFillColor;
      context.fill();
      context.globalAlpha = 1;
    };

    const drawGrid = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;
      context.strokeStyle = borderColor;

      if (isHex) {
        const columnShift = Math.floor(gridOffsetRef.current.x / hexHorizontal);
        const offsetX =
          ((gridOffsetRef.current.x % hexHorizontal) + hexHorizontal) %
          hexHorizontal;
        const offsetY =
          ((gridOffsetRef.current.y % hexVertical) + hexVertical) %
          hexVertical;
        const columns = Math.ceil(width / hexHorizontal) + 3;
        const rows = Math.ceil(height / hexVertical) + 3;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = column * hexHorizontal + offsetX;
            const cy =
              row * hexVertical +
              ((column + columnShift) % 2 !== 0 ? hexVertical / 2 : 0) +
              offsetY;
            const cellKey = `${column},${row}`;

            fillHoveredCell(cellKey, () => drawHex(cx, cy, cellSize));
            drawHex(cx, cy, cellSize);
            context.stroke();
          }
        }
      } else if (isTriangle) {
        const halfWidth = cellSize / 2;
        const columnShift = Math.floor(gridOffsetRef.current.x / halfWidth);
        const rowShift = Math.floor(gridOffsetRef.current.y / cellSize);
        const offsetX =
          ((gridOffsetRef.current.x % halfWidth) + halfWidth) % halfWidth;
        const offsetY =
          ((gridOffsetRef.current.y % cellSize) + cellSize) % cellSize;
        const columns = Math.ceil(width / halfWidth) + 4;
        const rows = Math.ceil(height / cellSize) + 4;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = column * halfWidth + offsetX;
            const cy = row * cellSize + cellSize / 2 + offsetY;
            const shouldFlip =
              ((column + columnShift + row + rowShift) % 2 + 2) % 2 !== 0;
            const cellKey = `${column},${row}`;

            fillHoveredCell(cellKey, () =>
              drawTriangle(cx, cy, cellSize, shouldFlip)
            );
            drawTriangle(cx, cy, cellSize, shouldFlip);
            context.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffsetRef.current.x % cellSize) + cellSize) % cellSize;
        const offsetY =
          ((gridOffsetRef.current.y % cellSize) + cellSize) % cellSize;
        const columns = Math.ceil(width / cellSize) + 3;
        const rows = Math.ceil(height / cellSize) + 3;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = column * cellSize + cellSize / 2 + offsetX;
            const cy = row * cellSize + cellSize / 2 + offsetY;
            const cellKey = `${column},${row}`;

            fillHoveredCell(cellKey, () => drawCircle(cx, cy, cellSize));
            drawCircle(cx, cy, cellSize);
            context.stroke();
          }
        }
      } else {
        const offsetX =
          ((gridOffsetRef.current.x % cellSize) + cellSize) % cellSize;
        const offsetY =
          ((gridOffsetRef.current.y % cellSize) + cellSize) % cellSize;
        const columns = Math.ceil(width / cellSize) + 3;
        const rows = Math.ceil(height / cellSize) + 3;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const x = column * cellSize + offsetX;
            const y = row * cellSize + offsetY;
            const cellKey = `${column},${row}`;
            const alpha = cellOpacitiesRef.current.get(cellKey);

            if (alpha) {
              context.globalAlpha = alpha;
              context.fillStyle = hoverFillColor;
              context.fillRect(x, y, cellSize, cellSize);
              context.globalAlpha = 1;
            }

            context.strokeRect(x, y, cellSize, cellSize);
          }
        }
      }
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredCellRef.current) {
        targets.set(`${hoveredCellRef.current.x},${hoveredCellRef.current.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        trailCellsRef.current.forEach((cell, index) => {
          const key = `${cell.x},${cell.y}`;
          if (!targets.has(key)) {
            targets.set(
              key,
              (trailCellsRef.current.length - index) /
                (trailCellsRef.current.length + 1)
            );
          }
        });
      }

      targets.forEach((_, key) => {
        if (!cellOpacitiesRef.current.has(key)) {
          cellOpacitiesRef.current.set(key, 0);
        }
      });

      cellOpacitiesRef.current.forEach((opacity, key) => {
        const target = targets.get(key) || 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) {
          cellOpacitiesRef.current.delete(key);
        } else {
          cellOpacitiesRef.current.set(key, next);
        }
      });
    };

    const stop = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      }
    };

    const updateAnimation = () => {
      animationFrameRef.current = 0;

      if (!isVisible || reducedMotion || document.hidden) {
        return;
      }

      const effectiveSpeed = Math.max(animationSpeed, 0.08);
      const wrapX = isHex ? hexHorizontal * 2 : cellSize;
      const wrapY = isHex ? hexVertical : isTriangle ? cellSize * 2 : cellSize;

      switch (direction) {
        case "right":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffsetRef.current.x =
            (gridOffsetRef.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffsetRef.current.y =
            (gridOffsetRef.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      updateCellOpacities();
      drawGrid();
      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };

    const start = () => {
      if (
        animationFrameRef.current ||
        !isVisible ||
        reducedMotion ||
        document.hidden
      ) {
        return;
      }

      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const handleReducedMotionChange = () => {
      reducedMotion = prefersReducedMotion.matches;
      if (reducedMotion) {
        stop();
        drawGrid();
      } else {
        start();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.01 }
    );

    resizeCanvas();
    drawGrid();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      drawGrid();
    });

    resizeObserver.observe(wrapper);
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
    intersectionObserver.observe(wrapper);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      prefersReducedMotion.removeEventListener(
        "change",
        handleReducedMotionChange
      );
    };
  }, [
    borderColor,
    direction,
    hoverFillColor,
    hoverTrailAmount,
    shape,
    speed,
    squareSize,
  ]);

  return (
    <div ref={wrapperRef} className={`h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full border-0" />
    </div>
  );
}
