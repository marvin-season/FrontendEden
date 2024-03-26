import {Outlet, useNavigate} from "react-router-dom";
import styled from 'styled-components'
import {useState} from "react";
import {routes} from "@/router/routes.tsx";

const LayoutContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  box-sizing: border-box;
  gap: 10px;
`

const NavItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  width: 200px;
  padding: 4px;
  border-radius: 8px;
  font-size: 16px;

  color: ${({selected}) => selected ? 'blue' : 'black'};
`

const Nav = styled.div`
  width: 200px;
  padding: 10px;
  border-right: 1px solid #aaa;
`

const Layout = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0)
    const navs: { label: string | undefined; onClick: Function }[] = []
    routes.flatMap(route => route.children).forEach(item => {
        if (item) {

            navs.push({
                label: item.path,
                onClick: () => {
                    navigate(`/${item.path}`);
                }
            })
        }
    })

    return <>
        <LayoutContainer>
            <Nav>
                {
                    navs.map(({onClick, label}, index) =>
                        <NavItem
                            key={index}
                            selected={currentIndex === index}
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
