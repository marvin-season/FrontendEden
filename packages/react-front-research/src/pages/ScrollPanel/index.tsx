import './index.css'
import {useState} from "react";
import {Button} from "@root/react-ui";

const ScrollPanel = () => {
    const [count, setCount] = useState(0)

    const textLayer = <div className={'textLayer'}>
        <span className="item" id="item1">1</span>
        <span className="item" id="item2">2</span>
        <span className="item" id="item3">3</span>
        <span className="item" id="item4">4</span>
        <span className="item" id="item5">5</span>
        <span className="item" id="item6">6</span>
    </div>


    return <div className={'flex'}>
        <Button/>
        <div className={'container'}>
            <div className='page page1'>
                <div className={'canvas'}></div>
                {textLayer}
            </div>
            <div className='page page2'>
                <div className={'canvas'}></div>
                {textLayer}
            </div>

        </div>
        <div>
            <button onClick={() => {
                setCount(count + 1)
                const target = document.querySelectorAll('.page1 .textLayer .item');
                target[1].classList.add('hl')
                target[1]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }}>skip2
            </button>
            <button onClick={() => {
                setCount(count + 1)

                const target = document.querySelectorAll('.page2 .textLayer .item');
                target[4].classList.add('hl')
                target[4]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }}>skip5
            </button>

        </div>
    </div>
}
export default ScrollPanel
