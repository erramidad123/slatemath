import React, { useCallback, useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { initialValue } from "./editorInitialValue";
import CustomEditor from "./editorActions";
import {
  CodeElement,
  DefaultElement,
  Leaf,
  LinkElement,
  MathElement,
} from "./customElements";

import MathInput from "./MathInput";

// with this custom hook we  display links elements as inline element.
// We could modify this to use any type we want, as math types elements.
const withInline = (editor) => {
  const { isInline } = editor;
  const inLineElements = ["link", "math"];
  const shouldBeInline = (element) => inLineElements.includes(element.type);

  editor.isInline = (element) => {
    return shouldBeInline(element) ? true : isInline(element);
  };

  return editor;
};

const withSettings = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "math" ? true : isVoid(element);
  return editor;
};

export default function App() {
  //We want the editor to be stable across renders, so we use the useMemo hook
  const editor = useMemo(
    () => withSettings(withInline(withReact(createEditor()))),
    []
  );
  const [editorValue, setEditorValue] = useState(initialValue);

  const handleChangeValue = (newValue) => {
    console.log("Children editor", editor.children);
    console.log("Children selection", editor.selection);
    console.log("Children operations", editor.operations);
    console.log("Children marks", editor.marks);

    setEditorValue(newValue);
    // save the value to LocalStoreage so we can retrieve when page is refreshed
    // localStorage.setItem("editorContent", JSON.stringify(newValue));
  };

  const handleKeyDown = (event) => {
    const { key, ctrlKey } = event;

    // execute only if ctrl+(key)
    if (!ctrlKey) {
      return;
    }

    // toggle code block if ctrl+`+` is pressed
    switch (key) {
      case "+": {
        event.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
        break;
      }
      // When "B" is pressed, bold the text in the selection.
      case "b": {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
      default:
        break;
    }
  };

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    // return a component depending on the type of the element
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "link":
        return <LinkElement {...props} />;
      case "math":
        return <MathElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div>
      <Slate editor={editor} value={editorValue} onChange={handleChangeValue}>
        <div>
          <button onClick={() => CustomEditor.toggleBoldMark(editor)}>
            Bold
          </button>
          <button onClick={() => CustomEditor.toggleCodeBlock(editor)}>
            Code block
          </button>
          <button
            onClick={() => CustomEditor.insertText(editor, "My new text")}
          >
            Insert text
          </button>
          <button onClick={() => CustomEditor.splitNode(editor)}>
            Split node
          </button>
          <button onClick={() => CustomEditor.insertGoogleLink(editor)}>
            Insert link to Google
          </button>
          <button onClick={() => CustomEditor.insertMathInput(editor)}>
            Insert math input
          </button>
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
}
