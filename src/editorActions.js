import { Editor, Text, Transforms } from "slate";

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });
    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { mathc: (n) => Editor.isBlock(editor, n) }
    );
  },

  insertText(editor, text) {
    Transforms.insertText(editor, text);
  },

  splitNode(editor) {
    Transforms.splitNodes(editor);
  },

  insertGoogleLink(editor) {
    const url = "www.google.com";
    const googleLinkElement = {
      type: "link",
      url,
      children: [{ text: url }],
    };

    Transforms.insertNodes(editor, googleLinkElement);
  },

  insertMathInput(editor) {
    const emptyMathElement = {
      type: "math",
      children: [{ text: "" }],
    };

    Transforms.insertNodes(editor, emptyMathElement);
  },
};

export default CustomEditor;
