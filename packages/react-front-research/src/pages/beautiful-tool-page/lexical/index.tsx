import React, {FC} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';

const Lexical: FC = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    onError: console.log,
  };
  return <>
    <section>一个非常牛的工具：https://lexical.dev/docs/getting-started/react</section>
    <div className={'relative'}>
      <LexicalComposer initialConfig={initialConfig}>
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
