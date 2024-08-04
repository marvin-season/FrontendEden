# 高亮MD文件

将md文件经过**unified**编译和反编译 ***ast**，最终可以得到对应的html文件

高亮算法切氛围两个步骤：

+ 计算高亮信息
+ 根据高亮信息判断是否高亮

## 计算高亮信息

**算法描述**
s1 = "xax1xbx2xcx3x";
s2 = "xbx2xc";

找出s2在s1中的位置，其中x为不可控的单个字符，匹配过程中需要忽略x，譬如上述例子中的结果为[5,10]

核心算法设计实现如下:
+ 制定规则切分s1，包装为对象，记录分段的原始位置信息
+ 遍历累加分段信息，忽略指定字符，判断是否与s2匹配
+ 如果匹配成功，则得到结束位置，下一步开始逆向匹配寻找开始位置
+ 最终得到 [startIndex, endIndex] of 分段信息(indexOfSlice)

分段过长会导致严重的精度问题，需要在indexOfSlice中进一步查找精确信息

## 判断是否高亮

编译和反编译的中间可以自定义transform，transform中可以拿到节点的信息

[详见unified插件](../src/pages/markdown-page/plugins/remarkText.tsx)

