import { useRef, useEffect, useState } from "react";

interface CanvasProps {
  color: string;
  bgColor: string;
  fontSize: number;
}

const CanvasComponent: React.FC<CanvasProps> = ({
  color,
  bgColor,
  fontSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [prevPosition, setPrevPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDrawing(true);
      setPrevPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing || !prevPosition) return;
      const { x: startX, y: startY } = prevPosition;
      const { clientX: endX, clientY: endY } = e;

      context.strokeStyle = color; // Use the color prop for stroke color
      context.lineWidth = fontSize;
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
      setPrevPosition({ x: endX, y: endY });
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      setPrevPosition(null);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [color, isDrawing, prevPosition]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "canvas_image.png";
    a.click();
  };

  return (
    <div id="drawingBoard">
      <canvas
        ref={canvasRef}
        width={1086}
        height={450}
        style={{ border: "2px solid #000000", background: bgColor || "white" }} // Black border
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <div className="btnDiv">
        <button className="clear btn" onClick={clearCanvas}>
          Clear
        </button>
        <button className="save btn" onClick={downloadCanvas}>
          Save and Download
        </button>
        <button className="retrive btn">Retrieve Saved Signature</button>
      </div>
    </div>
  );
};

export default CanvasComponent;
