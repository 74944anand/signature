import { useState } from "react";

interface BgColorPickerProps {
  bgColor: string;
  handleBgColor: (bgColor: string) => void;
}

const Background = ({ handleBgColor, bgColor }: BgColorPickerProps) => {
  const colors = ["red", "green", "blue", "yellow"];
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (selectedColor: string) => {
    handleBgColor(selectedColor);
    setIsOpen(false); // Close color picker after selecting a color
  };

  return (
    <div className="colorPicker">
      <div>Select a color</div>
      <div
        id="color"
        style={{
          backgroundColor: bgColor || "black",
          display: isOpen ? "none" : "block",
        }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      {isOpen && (
        <div>
          <select
            id="selector"
            value={bgColor}
            onChange={(e) => handleClick(e.target.value)}
          >
            {colors.map((c, index) => (
              <option
                className="colorOption"
                key={index}
                style={{ backgroundColor: c }}
                value={c}
              >
                {c}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Background;
