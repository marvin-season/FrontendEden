import React, {FC} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {ParagraphNode} from 'lexical';
import {ColoredNode} from './nodes/ColoredNode.tsx';
import {CustomParagraphNode} from './nodes/CustomParagraphNode.tsx';

const Lexical: FC = () => {
  return <>
    <section>一个非常牛的工具：https://lexical.dev/docs/getting-started/react</section>
    <div className={'relative'}>
      <LexicalComposer initialConfig={{
        namespace: 'MyEditor',
        onError: console.log,
        nodes: [
          ColoredNode,
          CustomParagraphNode,
          {
            replace: ParagraphNode,
            with: (node) => {
              return new CustomParagraphNode();
            }
          }
        ]
      }}>
        <PlainTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className={'h-20 border-2 rounded-md px-2 py-1'}/>}
          placeholder={<div className={'absolute top-2 left-2 text-sm text-gray-500'}>Enter some text...</div>}
        />
        <HistoryPlugin/>
        <OnChangePlugin onChange={console.log}/>

      </LexicalComposer>
    </div>

  </>
}
export default Lexical
