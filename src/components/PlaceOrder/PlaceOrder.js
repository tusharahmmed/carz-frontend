import React, { useEffect, useState } from 'react';
import { Container, FormTitle, InputLabel, InputWraper, LoginHeader, OR, Register, SubmitButto, Wraper } from '../Logins/Login';
import { BsGlobe2 } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import swal from 'sweetalert';
import { Logo } from '../Header';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


const PlaceOrder = () => {



    // user
    const { user } = useAuth();
    // get single item
    const [item, setItem] = useState({});
    // get data data
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://damp-bayou-69353.herokuapp.com/car/${id}`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, []);

    // form data
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const history = useHistory();


    const onSubmit = data => {

        // add product info
        data.product = item;

        // send to backend
        fetch('https://damp-bayou-69353.herokuapp.com/place-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal("Ordered Success!", "Your Order has been Placed!", "success", {
                        timer: 1000,
                        buttons: false,
                    });

                    reset();
                    history.push('/')
                }
            })


    };


   



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
                        <h2>Place Order</h2>
                    </FormTitle>

                    <InputWraper>
                        <InputLabel>User Name</InputLabel>
                        <input {...register("userName", { required: true })} defaultValue={user?.displayName} type="text"  />
                    </InputWraper>

                    <InputWraper>
                        <InputLabel>Email Adress</InputLabel>
                        <input {...register("email", { required: true })} value={user?.email} type="email"  />
                    </InputWraper>

                    <InputWraper>
                        <InputLabel>Address Line 1</InputLabel>
                        <input {...register("addressLine1", { required: true })} type="text"  />
                    </InputWraper>

                    <InputWraper>
                        <InputLabel>Address Line 2</InputLabel>
                        <input {...register("addressLine2")}  type="text" />
                    </InputWraper>

                    <InputWraper>
                        <InputLabel>Phone Number</InputLabel>
                        <input {...register("phone", { required: true })} type="text"  />
                    </InputWraper>

                    <SubmitButto type="submit">
                        ORDER
                    </SubmitButto>
                </form>
            </Wraper>
        </Container>
    )
}


export default PlaceOrder;