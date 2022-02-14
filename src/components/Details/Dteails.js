import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoginHeader } from '../Logins/Login';
import { BsGlobe2 } from 'react-icons/bs'
import styled from 'styled-components';
import { ItemText, LeftButton } from '../Section';
import { Logo } from '../Header';
import useAuth from '../../hooks/useAuth';


const Dteails = () => {

    const [item, setItem] = useState({});
    const {user} = useAuth();

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://damp-bayou-69353.herokuapp.com/car/${id}`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, [])



    if (item.length) {
    }
    const { model, price, image, mph, range, topSpeed } = item;

    return (
        <Container>

            <DeatailsHeader>

                <Logo><Link to="/">
                    PORSCHE
                </Link></Logo>
                <div>
                    <Link to={user.email ? '/myaccount' : '/login'}><span>Account</span></Link>
                </div>

            </DeatailsHeader>
            <Wraper>
                <Product>
                    <ProductThumb>
                        <img src={image} alt="" />
                    </ProductThumb>
                    <ProductInfo>

                        <ItemTitle>
                            <h1>{model}</h1>
                            <p>Est. Delivery: August 2022</p>
                        </ItemTitle>

                        <Features>
                            <Fitems>
                                <h6><span>{range}</span>mi</h6>
                                <p>Range (est.)</p>
                            </Fitems>
                            <Fitems>
                                <h6><span>{topSpeed}</span>mph</h6>
                                <p>Top Speed</p>
                            </Fitems>
                            <Fitems>
                                <h6><span>{mph}</span>sec</h6>
                                <p>0-100 mph</p>
                            </Fitems>
                        </Features>

                        <PriceSec>
                            {/* <p>Dual Motor All-Wheel Drive</p> */}
                            <div>
                                <span>{model}</span>
                                <span>${parseInt(price).toLocaleString()}</span>
                            </div>
                        </PriceSec>

                        <Order>
                            <Link to={`/place-order/${id}`}>
                                <OrderButton >Place Order</OrderButton>
                            </Link>
                        </Order>

                    </ProductInfo>
                </Product>
            </Wraper>
        </Container>
    );
};

export default Dteails;


const Container = styled.div`

`;

const DeatailsHeader = styled(LoginHeader)`
    div {
        margin-top: 2px;
        a{
            font-family: g-ssm;
            margin-top: 4px;
        }
        
    }
`;
const Wraper = styled.div`
   
`;
const Product = styled.div`
   display: grid;
   grid-template-columns: 3fr 1fr;
   padding-right: 48px;

   @media (max-width: 768px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 0px;
        padding: 20px;
}


`;
const ProductThumb = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15vh;

    @media (max-width: 768px){
        padding-top: 5vh;
}

    img{
        width: 86%;

        @media (max-width: 768px){
            width: 95%;
    }
        @media (max-width: 1200px){
            width: 90%;
    }
    }
`;
const ProductInfo = styled.div`
    font-family: g-medium;
    
   
`;
const ItemTitle = styled(ItemText)`
    @media (max-width: 768px){
        padding-top: 5vh;
    }
`;
const Features = styled.div`
    padding: 16px 0;
    margin: 8px 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
const Fitems = styled.div`
    font-size: 14px;
    h6{
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    h6 span{
        font-size: 24px;
    }
    p{
        color: #5c5d61;
        font-size: 14px;
        font-weight: 400;
        font-family: g-book;
    }
`;
const PriceSec = styled.div`
    font-size: 14px;
    margin: 20px 0px;

    p{
        color: #5C5E62;
        padding: 15px 0px;
    }
    div{
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #474747;
        border: 3px solid #3E6AE1;
        border-radius: 999px;
        cursor: pointer;

        span{
            padding: 10px 30px 10px 20px;
        }
    }
`;

const Order = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 50px;
    a{
        text-decoration: none;
    }
`;

const OrderButton = styled(LeftButton)`
    
    &:hover{
        background: #3D69E1;
        color: white;
    }
`;
