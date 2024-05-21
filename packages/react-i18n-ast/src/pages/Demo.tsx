import {Input} from 'antd';

export default function Demo() {
    const name = '咕咕鸡';
    const habit = '跑步';
    const description = `${name} 是个boy`;
    return (
        <>
            <h2>关于</h2>
            <p>
                 {`我的名字：${name}`}, 我的兴趣： {habit + '网球'}
            </p>
            <p>{description}</p>
            <Input placeholder='请输入你的年龄'/>
        </>
    );
}
