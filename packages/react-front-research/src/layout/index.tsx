import {Outlet, useNavigate} from "react-router-dom";
import styled from 'styled-components'
import {useState} from "react";

const LayoutContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  gap: 10px;
`

const NavItem = styled.div<{ activated: boolean }>`
  cursor: pointer;
  width: 200px;
  padding: 4px;
  border-radius: 8px;
  font-size: 16px;

  color: ${({activated}) => activated ? 'blue' : 'black'};
`

const Nav = styled.div`
  padding: 10px;
  border-right: 1px solid #aaa;
`

const Layout = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0)
    const navs = [
        {
            label: '首页',
            onClick: () => {
                navigate('/index');
            }
        },
        {
            label: 'PDF搜索',
            onClick: () => {
                navigate('/pdf-search');
            }
        }
    ]

    return <>
        <LayoutContainer>
            <Nav>
                {
                    navs.map(({onClick, label}, index) =>
                        <NavItem
                            key={index}
                            activated={currentIndex == index}
                            onClick={() => {
                                setCurrentIndex(index)
                                onClick()
                            }}>{label}
                        </NavItem>)
                }
            </Nav>
            <div style={{flex: 1}}>
                <Outlet/>
            </div>
        </LayoutContainer>
    </>
}

export default Layout
