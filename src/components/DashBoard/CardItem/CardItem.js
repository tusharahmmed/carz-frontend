import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';

const CardItem = (props) => {

    const phone = props?.data?.phone;
    const {handleCancel} = props;

    if (phone) {
        var { image, model, price } = props?.data?.product;
        var { _id } = props?.data;
        var idLink = props?.data?.product._id;
    } else {

        var { image, model, price, _id } = props?.data;
        var idLink = props?.data._id;
    }

    

    return (
        <Container>
            <Thumb img={image}>

            </Thumb>
            <Description>
                <div>
                    <p>{model}</p>
                    <span>{price}</span>
                </div>
                <br />
                <ActionContiner>
                    <Link to={`../overview/${idLink}`}>
                        <ViewLink>
                            {phone ? 'View Details' : 'Shop Now'}
                        </ViewLink>
                    </Link>
                    {phone && <span onClick={()=>{handleCancel(_id)}}>
                        <MdDelete size={19} />
                    </span>}
                </ActionContiner>
            </Description>
        </Container>
    );
};

export default CardItem;

const Container = styled.div`
    width: 316px;
    border: 2px solid #D0D1D2;
    border-radius: 18px;
    font-family: g-ssm;
    font-size: 12px;
    font-weight: 500;
   
`;
const Description = styled.div`
    padding: 20px;
    
    p{
        margin: 5px 0px;
        font-weight: 600;
    }
`;
const ViewLink = styled.span`
    border-bottom: 2px solid black;
    margin-top: 10px;
`;
const Thumb = styled.div`
    background-image: url(${(props) => props.img});
    height: 120px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    margin: -1px;

`;

const ActionContiner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a{
        text-decoration: none;
    }

    span{
        cursor: pointer;
    }
`;