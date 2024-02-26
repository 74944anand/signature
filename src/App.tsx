import { useState } from "react";
import "./App.css";
import CanvasComponent from "./CanvasComponent";
import ColorPicker from "./ColorPicker";
import Background from "./Background";
import FontSize from "./FontSize";

function App() {
  const [color, setColor] = useState("black");
  const [bgColor, setBgColor] = useState("white");
  const [fontSize, setFontSize] = useState(1);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleBgColor = (newColor: string) => {
    setBgColor(newColor);
  };
  const fontSizeChnange = (newFont: number) => {
    setFontSize(newFont);
  };
  return (
    <>
      <div className="container">
        <div className="btnDiv">
          <ColorPicker color={color} handleColorChange={handleColorChange} />
          <Background bgColor={bgColor} handleBgColor={handleBgColor} />
          <FontSize fontSizeChnange={fontSizeChnange} />
        </div>
        <CanvasComponent color={color} bgColor={bgColor} fontSize={fontSize} />
      </div>{" "}
    </>
  );
}

export default App;
