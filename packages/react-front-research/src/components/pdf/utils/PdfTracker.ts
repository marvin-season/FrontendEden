import { TextItem } from 'pdfjs-dist/types/src/display/api';

export type ResolvedTextItem = TextItem & {
  length: number;
  filteredStr: string;
  filteredLength: number;
  highlight: boolean;
  page: number;
  itemIndex: number;
};

export default class PdfTracker {
  private _textArray: Array<string>;
  private _resolvedTextItems: Array<ResolvedTextItem>;
  private _highlightPages: Set<number>;
  private _highlighTextItemMap: Map<string, ResolvedTextItem>;
  readonly regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;

  constructor() {
    this._textArray = [];
    this._resolvedTextItems = [];
    this._highlightPages = new Set();
    this._highlighTextItemMap = new Map();
  }

  get text(): string {
    return this._textArray.join('');
  }

  get highlighTextItemMap(): Map<string, ResolvedTextItem> {
    return this._highlighTextItemMap;
  }

  get highlightPages(): Array<number> {
    return Array.from(this._highlightPages);
  }

  public add(textItems: Array<TextItem>, page: number) {
    textItems.forEach((textItem, itemIndex) => {
      const filteredStr = textItem.str.replace(this.regex, '');
      const item = {
        ...textItem,
        length: textItem.str.length,
        filteredStr,
        filteredLength: filteredStr.length,
        highlight: false,
        page,
        itemIndex,
      };
      this._textArray.push(filteredStr);
      this._resolvedTextItems.push(item);
    });
  }

  /**
   *  PDFJS 转化 pdf 文件 中文字的部分 成为 JS 对象, 其中 textContent 属性包含 pdf 中所有的 文本信息
   *  Text Content 有一个属性 叫 textItems 每一个 textItem 代表一个或者多个字符.
   *  源文本 是指 textItems
   *  搜索文本 是指 GPT 返回的命中文本
   *
   *  1. 第一步 是否命中
   *    算法 较简单 源文本和搜索文本 去掉非中英文字符数字(只有它们语义相关)后 后文中用 (过滤后) 指代, 然后通过 String.indexOf 搜索文本
   *
   *  2. 第二步 找到源文本中的命中 textItem
   *    我们通过 indexOf 可以得到的是 搜索文本在源文本中的位置 (过滤后的位置) 我们希望通过这个位置信息 得到 源文本中 命中的 textItem
   *
   *    过滤后的位置 是派生状态, 这里我们要反推源状态, 那么我们需要 查看 源状态到派生状态的转化规则.  这个规则很简单, 就是过滤掉非中英文字符数字.
   *    只是粒度更小
   *
   *    通过遍历 textItems, 我们一步步地 去过滤, 并计算 过滤后的位置 与 当前 指针位置 的关系, 从而得到 命中的 textItem
   *
   */

  public highlight(text: string): boolean {
    const searchText = text.replace(this.regex, '');
    const sourceText = this.text;

    const foundStart = sourceText.indexOf(searchText);
    const foundLength = searchText.length;

    if (foundStart > -1) {
      // 找到 第一个命中 item
      let firstItemIndex = 0;
      let current = 0;

      while (current < sourceText.length) {
        const currentItem = this._resolvedTextItems[firstItemIndex];

        // 命中
        if (current <= foundStart && foundStart < current + currentItem.filteredLength) {
          currentItem.highlight = true;
          this._highlightPages.add(currentItem.page);
          const key = `${currentItem.page}-${currentItem.itemIndex}`;
          this._highlighTextItemMap.set(key, currentItem);
          break;
        }

        // 指针移动到下一个 item
        current += currentItem.filteredLength;
        firstItemIndex++;
      }

      // 找到 剩余命中 item
      let leftLength = foundLength;
      let nextItemIndex = firstItemIndex + 1;

      while (leftLength > 0 && nextItemIndex < this._resolvedTextItems.length) {
        const currentItem = this._resolvedTextItems[nextItemIndex];

        leftLength = leftLength - currentItem.filteredLength;
        currentItem.highlight = true;
        this._highlightPages.add(currentItem.page);
        const key = `${currentItem.page}-${currentItem.itemIndex}`;
        this._highlighTextItemMap.set(key, currentItem);
        nextItemIndex++;
      }

      return true;
    }

    return false;
  }
}
