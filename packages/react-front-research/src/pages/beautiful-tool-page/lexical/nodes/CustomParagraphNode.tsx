import {EditorThemeClasses, ParagraphNode} from "lexical";

export class CustomParagraphNode extends ParagraphNode {
  static getType() {
    return "custom-paragraph";
  }

  static clone(node: { __key: string | undefined; }) {
    return new CustomParagraphNode(node.__key);
  }

  createDOM(config: { disableEvents: boolean | undefined; namespace: string; theme: EditorThemeClasses; }) {
    const dom = super.createDOM(config);
    // @ts-ignore
    dom.style = "background: green";
    return dom;
  }
}
