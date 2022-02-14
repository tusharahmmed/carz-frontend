import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import { Container, InputLabel, InputWraper, SubmitButto, Wraper } from '../../Logins/Login';
import swal from 'sweetalert';

const AddCar = () => {


    const [formData, setFormData] = useState({});


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

        // send to server
        fetch('https://damp-bayou-69353.herokuapp.com/add-car',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                swal("Success!", "Your Car has been Added!", "success",{
                    timer: 1000,
                    buttons: false,
                    });

                e.target.reset();
            }
        })

        
    }






    return (
        <RootContainer>

            <FormWraper>
                <form onSubmit={handleSubmit}>

                    <InputWraperWidth>
                        <InputLabel>Model</InputLabel>
                        <input onBlur={handleInput} name='model' type="text" required />
                    </InputWraperWidth>
                    
                    <InputWraperWidth>
                        <InputLabel>Image</InputLabel>
                        <input onBlur={handleInput} name="image" type="text" required />
                    </InputWraperWidth>
                    
                    <InputWraperWidth>
                        <InputLabel>Price</InputLabel>
                        <input onBlur={handleInput}  name="price" type="number" required />
                    </InputWraperWidth>
                    <InputWraperWidth>
                        <InputLabel>Range</InputLabel>
                        <input onBlur={handleInput} name="range" type="number" required />
                    </InputWraperWidth>
                    <InputWraperWidth>
                        <InputLabel>Top Speed</InputLabel>
                        <input onBlur={handleInput} name="topSpeed" type="number" required />
                    </InputWraperWidth>
                    <InputWraperWidth>
                        <InputLabel>Miles per hour(0-100)</InputLabel>
                        <input onBlur={handleInput} name="mph" required />
                    </InputWraperWidth>

                    <InputWraperWidth>
                        <SubmitButto type="submit">
                            ADD CAR
                        </SubmitButto>
                    </InputWraperWidth>

                </form>
               
            </FormWraper>
        </RootContainer>
    );
};

export default AddCar;

const RootContainer = styled(Container)`
    margin-left: 50px;
    margin-top: 20px;
    height: 100%;
    padding-bottom: 20px;

    @media (max-width:768px){
        margin-left: 0px;
        margin-top: 0px;
    }
    @media (max-width:1200px){
        margin-left: 0px;
        margin-top: 0px;
    }

`;

const InputWraperWidth = styled(InputWraper)`
    width: 332px;

    
`
const FormWraper = styled(Wraper)`
    width: 80%;
    margin-left: 0px;

    form{
        display: grid;
        grid-template-columns: 1fr 1fr;

        @media (max-width: 768px){
            display: flex;
            flex-direction: column;

        }
        @media (max-width: 1200px){
            grid-column-gap: 10px;

        }
    }

    @media (max-width: 768px){
        width: 100%;
        margin-left: 0px;
    }
    @media (max-width: 1200px){
        width: 100%;
        margin-left: 0px;
    }
`;