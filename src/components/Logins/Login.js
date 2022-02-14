import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BsGlobe2 } from 'react-icons/bs'
import useAuth from '../../hooks/useAuth';
import { Logo } from '../Header';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const Login = () => {

    const { handleLogin,user } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    let location = useLocation();
    let history = useHistory();


    const onSubmit = data => {

        if (data.password.length <= 5) {
            swal(
                "Warning!",
                "Password should be at least 6 digits.",
                 "warning",
                
                 
              )
        } else {

            const { email, password } = data;
            handleLogin(email, password, location, history);


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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormTitle>
                        <h2>Sign In</h2>
                    </FormTitle>
                    <InputWraper>
                        <InputLabel>Email Adress</InputLabel>

                        <input {...register("email", { required: true })} type="email" required />
                    </InputWraper>
                    <InputWraper>
                        <InputLabel>Password</InputLabel>
                        <input {...register("password", { required: true })} type="password" required />
                    </InputWraper>
                    <SubmitButto type="submit">
                        SIGN IN
                    </SubmitButto>
                </form>
                <OR>
                    {/* <span></span> */}
                    <p>OR</p>
                    {/* <span></span> */}
                </OR>
                <Link to="/register">
                    <Register>
                        CREAT NEW ACCOUNT
                    </Register>
                </Link>
            </Wraper>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    font-family: g-ssm;
    height: 100vh;

`;
const LoginHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    height: 54px;
    font-size: 18px;

    span{
        margin-top: 2px;
    }

    div{

        a{
            font-size: 14px;
            text-decoration: none;
        }
        
    }
    
`;
const Form = styled.form`
    
`;
const FormTitle = styled.div`
    padding: 32px 0px 8px;
    margin-bottom: 16px;
    
    color: #181b21;
    
    h2{
        font-size: 32px;
        font-weight: 500;
    }
`;
const InputWraper = styled.div`
    font-size: 14px;
    color: #5c5d61;
    display: flex;
    flex-direction: column;
    margin: .6rem 0rem;
    input{
        margin: 4px 0px;
        height: 38px;
        border: none;
        background: #F5F5F5;
        border-radius: 999px;
        padding: 0px 20px;
        font-size: 14px;
        font-weight: 800px;

        &:focus{
            outline: 1px solid gray;
        }
    }
`;
const InputLabel = styled.label`
    margin: 10px 20px 5px;

`;
const SubmitButto = styled.button`
    width: 100%;
    height: 38px;
    background: #3d69e1;
    text-align: center;
    color: white;
    border: none;
    font-size: 12px;
    font-weight: 600;
    border-radius: 999px;
    margin-top: 10px;
    cursor: pointer;

`;

const OR = styled.div`
    
    margin: 40px 0px;
  p{
    text-align: center;
  }
`;
const Wraper = styled.div`
margin: 0 auto;
width: 332px;
`;
const Register = styled(SubmitButto)`
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

export { Container, LoginHeader, FormTitle, InputWraper, InputLabel, SubmitButto, OR, Wraper, Register };