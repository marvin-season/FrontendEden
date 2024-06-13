import {name} from '../utils'

export const Demo = () => {
    const address = "武汉";
    const renderFn = () => <>
        renderFn jsx
    </>

    const ele = <>ele jsx</>
    return <>
        <p>{name}</p>
        <p>{address}</p>
        <p>
            {`我的名字：${name}`}
        </p>
        <div>
            <p>{'东湖'}</p>
        </div>
        <p>{renderFn()}</p>
        <p>{ele}</p>
    </>
}
