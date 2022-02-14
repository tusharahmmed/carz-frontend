import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BsGlobe2 } from 'react-icons/bs'
import { Container, FormTitle, InputLabel, InputWraper, LoginHeader, OR, SubmitButto, Wraper } from './Login';
import useAuth from '../../hooks/useAuth';
import { Logo } from '../Header';

const Register = () => {

    const { registerUser, user } = useAuth();

    const [formData, setFormData] = useState({});

    let location = useLocation();
    let history = useHistory();



    const handleInput = (e) => {
        // get data
        const value = e.target.value;
        const field = e.target.name;

        const currentData = formData;

        currentData[field] = value;
        // set current data
        setFormData(currentData);
    }



    const handleSubmit = (e) => {

        e.preventDefault();
        // join full Name
        const fullName = `${formData['f-name']} ${formData['l-name']}`
        formData.fullName = fullName;

        // validation

        if (formData.password.length <= 5) {
            alert('pas')
        } else {

            // create user to firebase
            const { email, password, fullName } = formData;
            registerUser(email, password, fullName, location, history);

            // create user to database
            fetch('https://damp-bayou-69353.herokuapp.com/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    // if error
                    if (!data.insertedId) {
                        alert('something went wrong!')
                    }
                });

        }
    }





    return (
        <Container>
            <LoginHeader>
                <Logo><Link to="/">
                    PORSCHE
                </Link></Logo>
                <div>
                    <Link to={user.email ? '/myaccount' : '/login'}><span>Account</span></Link>
                </div>
            </LoginHeader>
            <Wraper>
                <form onSubmit={handleSubmit}>
                    <FormTitle>
                        <h2>Creat Account</h2>
                    </FormTitle>
                    <InputWraper>
                        <InputLabel>First Name</InputLabel>
                        <input onBlur={handleInput} name="f-name" type="text" required />
                    </InputWraper>
                    <InputWraper>
                        <InputLabel>Last Name</InputLabel>
                        <input onBlur={handleInput} name="l-name" type="text" required />
                    </InputWraper>
                    <InputWraper>
                        <InputLabel>Email Adress</InputLabel>
                        <input onBlur={handleInput} name="email" type="email" required />
                    </InputWraper>
                    <InputWraper>
                        <InputLabel>Password</InputLabel>
                        <input onBlur={handleInput} name="password" type="password" required />
                    </InputWraper>
                    <SubmitButto type="submit">
                        CREATE ACCOUNT
                    </SubmitButto>
                </form>
                <OR>
                    {/* <span></span> */}
                    <p>OR</p>
                    {/* <span></span> */}
                </OR>
                <Link to="/login">
                    <RegisterBtn>
                        SIGN IN
                    </RegisterBtn>
                </Link>
            </Wraper>
        </Container>
    );
};

export default Register;

export const RegisterBtn = styled(SubmitButto)`
  border: 2px solid black;
  background: white;
  color: black;
  transition: all .3s;
  margin-bottom: 4rem;

  &:hover{
      color: white;
      background: black;
  }

`;