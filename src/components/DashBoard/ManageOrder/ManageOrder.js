import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ManageOrder = () => {


    // get all orders
    const [allOrders, setAllOrders] = useState({});

    useEffect(() => {
        fetch(`https://carz-server.onrender.com/all-order`)
            .then(res => res.json())
            .then(data => setAllOrders(data));
    }, [allOrders]);

    console.log(allOrders)


    return (
        <Container>

            <Table>
                <Tr>
                    <Th>Img</Th>
                    <Th>Model</Th>
                    <Th>Price</Th>
                    {/* <Th>Uid</Th> */}
                    <Th>User</Th>
                    <Th>email</Th>
                </Tr>
                {
                  allOrders.length?  allOrders.map(item => (
                        <>
                            <Tr>
                                <Td>
                                    <Img src={item.product.image}></Img>
                                </Td>
                                <Td>{item.product.model}</Td>
                                <Td>{item.product.price}</Td>
                                {/* <Td>{item.product._id}</Td> */}
                                <Td>{item.userName}</Td>
                                <Td>{item.email}</Td>
                            </Tr>
                        </>
                    )) : ''
                } 
            </Table>

        </Container>
    );
};

export default ManageOrder;

const Container = styled.div`

`;
const Table = styled.table`
    width: 100%;
`;
const Tr = styled.tr`
    margin: 10px 0px;
`;
const Th = styled.th`
    font-family: g-medium;
`;
const Td = styled.td`
    text-align: center;
    font-family: g-ssm;
    font-size: 14px;
    
`;
const Img = styled.img`
    width: 50px;
`;