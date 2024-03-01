import * as pdfjsLib from 'pdfjs-dist';
import PdfTracker from './PdfTracker';

import type { ResolvedTextItem } from './PdfTracker';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

export async function highlight(url: string, searchText: string): Promise<Map<string, ResolvedTextItem> | null> {
  const loadingTask = pdfjsLib.getDocument({ url });
  const pdf = await loadingTask.promise;

  const numPages = pdf.numPages;
  const pages = Array.from({ length: numPages }, (_, i) => i + 1); // 从 1 开始

  const tracker = new PdfTracker();

  /**
   * 算法说明:
   *  目前算法是逐页查找, 累加被查找的文本, 从目前需求来看 这个算法是可以优化的. 可以每2页进行一次查找
   */
  for (const pageNumber of pages) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    tracker.add(textContent.items as Array<TextItem>, pageNumber - 1); // 注意这里的 pageNumber 是从 1 开始的, 而 tracker 中的 page 是从 0 开始的
    const found = tracker.highlight(searchText);
    if (found) {
      return tracker.highlighTextItemMap;
    }
  }

  return null;
}
