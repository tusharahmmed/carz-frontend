import React, { useEffect, useState } from 'react';
import { HiOutlineHome, HiOutlineUser, HiOutlineShoppingCart,HiOutlineShoppingBag } from 'react-icons/hi';
import { BiCreditCardFront } from 'react-icons/bi';
import { RiBarChartFill } from 'react-icons/ri';
import { FaTshirt, FaPlus, FaPencilAlt } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import CardItem from '../CardItem/CardItem';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AddCar from '../AddCar/AddCar';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../AdminRoute/AdminRoute';
import swal from 'sweetalert';
import ManageOrder from '../ManageOrder/ManageOrder';


const GeneralDashboar = () => {

    let { path, url } = useRouteMatch();
    const { logOut, user, isAdmin } = useAuth();

    // get products 
    const [products, setProducts] = useState({});

    useEffect(() => {
        fetch(`https://carz-server.onrender.com/car-list`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    // get my orders
    const [myorders, setMyorders] = useState({});

    useEffect(() => {
        fetch(`https://carz-server.onrender.com/my-order/${user.email}`)
            .then(res => res.json())
            .then(data => setMyorders(data));
    }, [myorders]);

   



    // delete orderd product
    const cancelOrder = id => {

        swal({
            title: "Are you sure?",
            text: "You want to cancel order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((deleteOrder) => {

                if (deleteOrder) {
                    // send data to backend
                    fetch(`https://carz-server.onrender.com/cancel-order/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            // if updated
                            if (data.deletedCount) {
                                // reset orders
                                setMyorders({})
                                // confirmation alert
                                swal("Poof! You have successfully canceled order!", {
                                    icon: "success",
                                    buttons: false,
                                    timer: 1000
                                });

                            }

                        })


                } else {
                    // if admin cancel promp
                    swal("Your order is safe!", {
                        buttons: false,
                        timer: 1000
                    });
                }
            });

    } // close delete order







    return (
        <Container>
            <MenuBar>

                <Link to={`${url}`}>
                    <MenuItem>
                        <span><HiOutlineHome size={21} /></span>
                        <p>Dashboard</p>
                    </MenuItem>
                </Link>
                <Link to={`${url}/profile`}>
                    <MenuItem>
                        <span><HiOutlineUser /></span>
                        <p>Profile Settings</p>
                    </MenuItem>
                </Link>
                <Link to={`${url}/payment`}>
                    <MenuItem>
                        <span><BiCreditCardFront /></span>
                        <p>Payment Method</p>
                    </MenuItem>
                </Link>
                {
                    isAdmin && (
                        <>
                            <Link to={`${url}/product-list`}>
                                <MenuItem>
                                    <span><HiOutlineShoppingBag /></span>
                                    <p>Product List</p>
                                </MenuItem>
                            </Link>
                            <Link to={`${url}/order-list`}>
                                <MenuItem>
                                    <span><RiBarChartFill /></span>
                                    <p>Manage Order</p>
                                </MenuItem>
                            </Link>
                        </>
                    )
                }
                <Link to={`${url}/orders`}>
                    <MenuItem>
                        <span><HiOutlineShoppingCart /></span>
                        <p>Order History</p>
                    </MenuItem>
                </Link>
                {
                    isAdmin && (
                        <>
                            <Link to={`${url}/create-admin`}>
                                <MenuItem>
                                    <span><FaPencilAlt /></span>
                                    <p>Create Admin</p>
                                </MenuItem>
                            </Link>
                            <Link to={`${url}/add-car`}>
                                <MenuItem>
                                    <span><FaPlus /></span>
                                    <p>Add New Car</p>
                                </MenuItem>
                            </Link>
                        </>
                    )
                }
                <div onClick={logOut}>
                    <MenuItem>
                        <span><MdLogout /></span>
                        <p>Sign Out</p>
                    </MenuItem>
                </div>

            </MenuBar>

            <MenuContentWrapper>

                <Switch>

                    <Route exact path={path}>
                        <Title>Dashboard</Title>
                        <MenuContent>
                            {/* <CardItem />
                            <CardItem /> */}
                            {
                                products.length && products.map((item, index) => {
                                    return (index < 2) ? <CardItem key={item._id} data={item} /> : '';
                                })
                            }
                        </MenuContent>
                    </Route>
                    <Route exact path={`${path}/payment`}>
                        <Title>Payment</Title>
                        <MenuContent>
                            {/* <CardItem />
                            <CardItem /> */}
                            <p>Comming Soon....!</p>
                        </MenuContent>
                    </Route>
                    <AdminRoute exact path={`${path}/product-list`}>
                        <Title>Product List</Title>
                        <MenuContent>

                            {
                                products.length && products.map((item, index) => <CardItem key={item._id} data={item} />)
                            }
                        </MenuContent>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/order-list`}>
                        <Title>Manage Order</Title>
                        <MenuContentFull>
                            <ManageOrder />

                            
                        </MenuContentFull>
                    </AdminRoute>
                    <Route exact path={`${path}/orders`}>
                        <Title>My Orders</Title>
                        <MenuContent>

                            {
                                myorders.length ? myorders.map(item => <CardItem
                                    key={item._id}
                                    handleCancel={cancelOrder}
                                    data={item} />) : 'No Order History Found'
                            }
                        </MenuContent>
                    </Route>
                    <AdminRoute exact path={`${path}/create-admin`}>
                        <Title>Create New Admin</Title>
                        <MenuContent>
                            <MakeAdmin />
                        </MenuContent>
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/add-car`}>
                        <Title>Add New Car</Title>
                        <MenuContentFull>
                            <AddCar />
                        </MenuContentFull>
                    </AdminRoute>

                </Switch>

            </MenuContentWrapper>
        </Container>
    );
};

export default GeneralDashboar;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin-top: 70px;
    padding: 0px 48px;

    @media (max-width: 668px) {
        margin-top: 0px;
        padding: 0px 10px;


        display: flex;
        flex-direction: column;
        align-items: center;
      }
    @media (max-width: 992px) {
        grid-template-columns: 2fr 3fr;
      }
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 3fr;
      }

`;
const MenuBar = styled.div`
    font-family: g-ssm;
    font-size: 17px;
    padding-top: 50px;

    a{
    text-decoration: none;

    }
    @media (max-width: 688px) {
        padding-top: 0px;
        padding-bottom: 20px;
      }
`;
const MenuItem = styled.div`
    margin: 20px 0px 8px;
    padding: 5px 0px;
    cursor: pointer;

    display: flex;
    align-items: center;
    p{
        margin-left: 10px;
    }
    span{
        height: 34px;
        width: 34px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
    transition: all .3s;

    }
    

    &:hover{
        span{
            backdrop-filter: blur(16px);
            background: #80808017;
        }
    }
`;
const MenuContentWrapper = styled.div`
    padding-left: 30px;
    @media (max-width: 668px) {
        padding-left: 0px;
      }
`;
const Title = styled.h2`
    font-family: g-ssm;
    font-size: 34px;
    font-weignt: 400;

    @media (max-width: 688px){
        font-size: 26px;
        text-align: center;
    }
`;
const MenuContent = styled.div`
    padding: 20px 0px;
    display: grid;
    grid-template-columns: repeat(3,1fr);

    @media (max-width: 992px) {
        grid-template-columns: repeat(1,1fr);
        grid-row-gap: 30px;
        
      }
    @media (min-width: 993px) {
        grid-template-columns: repeat(2,1fr);
        grid-row-gap: 30px;
        grid-column-gap: 30px;
      }
    @media (min-width: 1200px) {
        padding: 20px 0px;
        display: grid;
        grid-template-columns: repeat(3,1fr);
      }

`;
const MenuContentFull = styled(MenuContent)`
    grid-template-columns: repeat(1,1fr);
    
`;
const MenuContentFullWidth = styled(MenuContent)`
    grid-template-columns: repeat(1,1fr);
    
`;