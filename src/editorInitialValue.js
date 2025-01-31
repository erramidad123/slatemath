/*export const initialValue = JSON.parse(
  localStorage.getItem("editorContent")
) || [
  {
    type: "paragraph",
    children: [
      { text: "A line of text in a paragraph." },
      {
        type: "link",
        url: "www.google.com",
        children: [{ text: "Google!" }]
      }
    ]
  }
];*/

export const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "A line of text in a paragraph." },
      {
        type: "link",
        url: "www.google.com",
        children: [{ text: "Google!" }]
      }
    ]
  }
];
