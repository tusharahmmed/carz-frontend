import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, InputLabel, InputWraper, OR, SubmitButto, Wraper } from '../../Logins/Login';
import { RegisterBtn } from '../../Logins/Register';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

const MakeAdmin = () => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {

        // alert for confimation
        swal({
            title: "Are you sure?",
            text: "Once created, all access will given to him!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((makeAdmin) => {

                if (makeAdmin) {
                    // send data to backend
                    fetch('https://carz-server.onrender.com/create-new-admin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(success => {
                            // if updated
                            if (success.modifiedCount) {
                                // confirmation alert
                                swal("Poof! You have successfully created new admin!.", {
                                    icon: "success",
                                    buttons: false,
                                    timer: 1000
                                });
                                // reset form
                                reset();

                            }
                            
                        })


                } else {
                    // if admin cancel promp
                    swal("Your website is safe!", {
                        buttons: false,
                        timer: 1000
                    });
                }
            });

    };


    return (
        <RootContainer>
            <Wraper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputWraper>
                        <InputLabel>Email Address</InputLabel>
                        <input {...register("email", { required: true })} type="email" />
                    </InputWraper>

                    <RegisterBtn type="submit">
                        CREATE ADMIN
                    </RegisterBtn>
                </form>
            </Wraper>
        </RootContainer>
    );
};

export default MakeAdmin;

export const RootContainer = styled(Container)`
    margin-left: 50px;
    margin-top: 20px;

    @media (max-width: 688px){
        margin-left: 0px;
        
    }
`