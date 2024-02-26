import React, { useState } from "react";
interface FontSize {
  fontSizeChnange: (fontSize: number) => void;
}

const FontSize = ({ fontSizeChnange }: FontSize) => {
  const [fontSize, setFontSize] = useState<number>(1);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = parseInt(e.target.value);
    setFontSize(newFontSize);
    fontSizeChnange(newFontSize);
  };

  return (
    <div className="fontSizePicker">
      <label htmlFor="fontSize">Font Size</label>
      <select id="fontSize" value={fontSize} onChange={handleFontSizeChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
};

export default FontSize;
