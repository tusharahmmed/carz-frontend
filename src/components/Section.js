import React from 'react';
import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Section = (props) => {
    const { model, image, _id } = props.data;


    return (
        <Wrap imgUrl={image}>

            <ItemText>
                <h1>{model}</h1>
            </ItemText>

            <Buttons>
                <Fade bottom>
                    <ButtonGroup>
                        <Link to={`/overview/${_id}`}>
                            <LeftButton>ORDER NOW</LeftButton>
                        </Link>
                    </ButtonGroup>
                </Fade>
                <DownArrow src="/images/down-arrow.svg" />
            </Buttons>
        </Wrap>
    );
};

export default Section;

// styled components

const Wrap = styled.div`
    // width: 100vw;
    height: 100vh;
    background-image: url(${(props) => `${props.imgUrl}`}); 
    // background-position: center;
    background-position: 99% 1%;
    background-size: cover;
    background-repeat: no-repeat;


    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    scroll-snap-align: start;
    

`;

export const ItemText = styled.div`
    text-align: center;
    padding-top: 15vh;

    h1{
        font-size: 40px;
        color: #393c41;
        padding: 4px 0px;
        font-weight: 500;
        font-family: g-medium;

        @media (max-width: 768px){
            font-size: 27px;
        }
    }
    p{
        color: #5c5d61;
        font-size: 15px;
        font-weight: 400;
        font-family: g-book;

        @media (max-width: 768px){
            font-size: 14px;
        }
    }
`;


const ButtonGroup = styled.div`
    text-align: center;
    justify-content: center;
    display: flex;
    padding-bottom: 10px;
    font-family: g-ssm;
    font-weight: 400;
    
    a{
        text-decoration: none;
    }

    @media (max-width: 768px){
        flex-direction: column;
    }

`;

export const LeftButton = styled.div`
    
    height: 40px;
    width: 256px;
    border-radius: 100px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    
    font-size: 12px;
    line-height: 1.2rem;

    background: black;
    color: white;
    transition: all .3s;
    opacity: .8;

    &:hover{
        color: black;
        background: white;
        opacity: 1;
    }
`;

const RightButton = styled.div`
background-color: hsla(0,0%,100%,0.65);
    height: 40px;
    width: 256px;
    border-radius: 100px;
    margin: 10px;
    cursor: pointer;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #393c41;

    font-size: 12px;
    line-height: 1.2rem;
    font-weight: 600;
`;

const DownArrow = styled.img`
    height: 40px;
    margin-top: 15px;
    transform: translateY(0px)
    text-align: center;
    animation: upDown 4s infinite;


    @keyframes upDown {
        0%   {transform: translateY(0px);}
        15%   {transform: translateY(0px);}
        30%  {transform: translateY(5px);}
        50%  {transform: translateY(0px);}
        75%  {transform: translateY(3px);}
        100% {transform: translateY(0px);}
      }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
      padding-bottom: 5px;
`;