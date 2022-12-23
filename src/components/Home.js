import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from './Section';

const Home = () => {

    const [cars,setCars] = useState({});

    // get data
    useEffect(() => {
        fetch(`https://carz-server.onrender.com/car-list`)
            .then(res => res.json())
            .then(data => setCars(data))
    }, []);


    return (
        <Container>
            {
                cars.length && cars.map((item, index) => (<Section key={item._id} data={item} index={index} />) )
            }
        </Container>
    );
};

export default Home;

// styled components

const Container = styled.div`
    height: 100vh;

    scroll-snap-type: y mandatory;
    overflow: auto;

`;