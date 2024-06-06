**调用示例**

```js
const useHighlightInfoMD = (mdArr: string[], t: string) => {
    return [0, 0]
}
```

### text-to-image
**介绍**

[simple_demo](simple-demo).

[Kuiper belt](https://en.wikipedia.org/wiki/Kuiper_belt).
## 我们支持哪些任务？

### split-video

**介绍**

入参为视频或音频，输出为台词内容以及起止时间段的json schema

*参数列表*

| pipline args | required | type | remarks                                   |
| ------------ | -------- | ---- | ----------------------------------------- |
| task         | true     | str  | 任务名称                                  |
| model        | false    | str  | 模型本地地址或仓库地址（用户名/仓库名称） |
| device       | false    | str  | cpu / gpu                                 |

**调用示例**

计划安排

+ 吃饭
+ 睡觉
+ 打豆豆
    - 小企鹅
    - 小猫咪
