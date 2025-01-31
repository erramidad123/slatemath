///////////////////////////////////////////////////////////////
//Component that define elements (code, bold and normal text)
///////////////////////////////////////////////////////////////
import React from "react";
import MathInput from "./MathInput";

export const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export const LinkElement = (props) => {
  return (
    <a {...props.attributes} href={props.element.url}>
      {props.children}
    </a>
  );
};

export const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const MathElement = (props) => {
  return <MathInput {...props} />;
};
