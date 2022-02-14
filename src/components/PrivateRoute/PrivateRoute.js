import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {

    const { user, isLoading } = useAuth();



    if (isLoading) {
        return (
            <Lodding>
                Loading...
            </Lodding>
        );
    }


    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

const Lodding = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: g-ssm;
    font-size: 14px;
`;