import './index.css'

const ScrollPanel = () => {
    return <div className={'flex'}>
        <div className={'container'}>
            <div>
                <div className={'page1'}>
                    <span className="item" id="item1">1</span>
                    <span className="item" id="item2">2</span>
                    <span className="item" id="item3">3</span>
                    <span className="item" id="item4">4</span>
                    <span className="item" id="item5">5</span>
                    <span className="item" id="item6">6</span>
                    <div className={'page'}></div>
                </div>
            </div>
            <div>

                <div className={'page2'}>
                    <span className="item" id="item1">1</span>
                    <span className="item" id="item2">2</span>
                    <span className="item" id="item3">3</span>
                    <span className="item" id="item4">4</span>
                    <span className="item" id="item5">5</span>
                    <span className="item" id="item6">6</span>
                    <div className={'page'}></div>
                </div>
            </div>

        </div>
        <div>
            <button onClick={() => {
                const target = document.querySelector('.page1>#item2');
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }}>skip2
            </button>
            <button onClick={() => {
                const target = document.querySelector('.page2>#item5');
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }}>skip5
            </button>

        </div>
    </div>
}
export default ScrollPanel
