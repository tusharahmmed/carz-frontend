import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const Header = ({ position }) => {

    // auth
    const { user } = useAuth();

    const [isBurgerMenu, setIsBurgerMenu] = useState(false);
    const [productItems, setProductItems] = useState([]);

    useEffect(() => {
        fetch('https://damp-bayou-69353.herokuapp.com/car-list')
            .then(res => res.json())
            .then(data => setProductItems(data));
    }, [])

    // menu li
    const menuItems = (id, title, isMobile) => {

        const titleArr = title.split(" ");
        const titleText = titleArr.slice(1, 3).join(" ");

        if (!isMobile) {
            return (
                <Link to={`../overview/${id}`}>
                    <span>{titleText}</span>
                </Link>
            )
        } else {
            return (
                <li><Link to={`../overview/${id}`}>{titleText}</Link></li>
            )
        }

    }






    return (
        <Container position={position}>
            <Logo><Link to="../">
                PORSCHE
            </Link></Logo>
            <Menu>
                {
                    productItems.length ? productItems.map((item) => menuItems(item._id, item.model)) : ' '
                }

            </Menu>
            <RightMenu>
                <RightSubMenu>

                    <Link to={user.email ? '/myaccount' : '/login'}><span>Account</span></Link>
                </RightSubMenu>
                <MenuText>
                    <a href="javascript:void(0)" onClick={() => { setIsBurgerMenu(true) }}><span>Menu</span></a>
                </MenuText>
            </RightMenu>


            <BurgerNav burgerStats={isBurgerMenu}>
                <BtnWraper>
                    <button onClick={() => { setIsBurgerMenu(false) }}><svg class="tds-icon tds-icon-close tds-modal-close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.53 17.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.748.748 0 0 1-1.06 0 .75.75 0 0 1 0-1.06L10.94 12 5.47 6.53a.75.75 0 1 1 1.06-1.06L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47z" fill="currentColor"></path></svg></button>
                </BtnWraper>
                <SideNav>

                    <MenuInBurger>
                        {
                            productItems.length ? productItems.map((item) => menuItems(item._id, item.model, true)) : ' '
                        }
                    </MenuInBurger>

                    <RightSubMenuInBurger>
                        <li><Link to={user.email ? '/myaccount' : '/login'}>Account</Link></li>
                    </RightSubMenuInBurger>

                </SideNav>
            </BurgerNav>

        </Container>
    );
};

export default Header;

// styled components

const Container = styled.div`
    min-height: 56px;
    position: ${(props) => props.position ? props.position : 'fixed'};
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    padding: 0 36px;
    font-weight: 500;
    z-index: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        height: 16px;
        width: 110px;
        margin-left: 16px;
    }
`;

export const Logo = styled.span`
    font-family: g-medium;
    font-weight: 800;
    letter-spacing: 3px;
    
    a{
        font-size: 18px;
    text-decoration: none;

    }
    
`;

const Menu = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    margin-left: 82px;

    a{
        font-family: g-ssm;
        text-decoration: none;
        font-size: 14px;
        padding: 8px 8px;

        &:hover{
            backdrop-filter: blur(16px);
            background-color: hsla(0,0%,0%,.05);
            border-radius: 8px;
            transition: all .15s linear;
        }
     }

    span{
        margin: 0 8px;
    }

    @media (max-width: 1200px) {
        display: none;
      }
`;

const MenuText = styled.span`
@media (min-width: 1200px) {
    display: none;
}
`;

const RightMenu = styled.div`

  a{
        font-family: g-ssm;
        text-decoration: none;
        font-size: 14px;
        padding: 8px 8px;

        span{
            margin: 0 8px;
        }

        &:hover{
            backdrop-filter: blur(16px);
            background-color: hsla(0,0%,0%,.05);
            border-radius: 8px;
            transition: all .15s linear;
        }
    }
`;

const RightSubMenu = styled.span`

    @media (max-width: 768px) {
        display: none;
    }
`;





const BurgerNav = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 312px;
    background: #fff;
    z-index: 2;
    padding: 0 1.8rem;
    transform: ${props => props.burgerStats ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform .3s ease-in-out;

   
`;

const BtnWraper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1.8rem 0rem 1.6rem;

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 7px;
        border-radius: 9999px;
        cursor: pointer;
        margin-right: -8px;
        margin-top: -7px;

        &:hover{
            backdrop-filter: blur(16px);
            background: #80808017;
            transition: all .15s linear;
        }

        svg{
            height: 24px;
        }
    }
`;

const SideNav = styled.div`

    height: 100%;
    overflow: auto;
    padding-bottom: 8rem;


    li{
        list-style-type: none;
        font-family: g-ssm;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 9px;
        

    }

    a{
        text-decoration: none;
        border-radius: 8px;
        padding: 8px 16px;

        display: flex;


        &:hover{
            backdrop-filter: blur(16px);
            background: #80808017;
            transition: all .15s linear;
        }

    }

   

    // @media (max-width: 768px) {
    //     padding-bottom: 8rem;
    // }
    @media (max-width: 1024px) {
    }
    
`;

const MenuInBurger = styled.span`
    display: none;

    @media (max-width: 1200px) {
        display: block;
    }
`;
const RightSubMenuInBurger = styled.span`
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`;