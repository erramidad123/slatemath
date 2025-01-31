import React, { useState } from "react";
import { MathfieldComponent } from "react-mathlive";

const MathInput = ({ attributes, children }) => {
  const [latex, setLatex] = useState("\\frac{\\pi}{2}");

  return (
    <div {...attributes}>
      <MathfieldComponent
        latex={latex}
        onChange={setLatex}
      ></MathfieldComponent>
      {children}
    </div>
  );
  // return <math-field ref={inputRef} virtualKeyboardMode="auto">{mfe.value}</math-field>
};

export default MathInput;
