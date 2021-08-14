import React, { useContext } from 'react';
import '../styles/index.css'
import { cartItemContext } from '../App';

const Header = () => {
    const { totalQty } = useContext(cartItemContext);
    return (
        <>
            <nav id='nav' className='d-flex-center'>
                <div id='test'>
                    <img src="./Images/logo.png" alt="logo" />
                </div>
                <div>
                    <ul className='headerItem'>
                        <li id='track'> Track Order</li>
                        <li className='vertical'><img src="./icon/search.png" alt="search" /></li>
                        <li className='vertical'><img src="./icon/user.png" alt="user" /></li>
                        <div className='cartDiv'>
                            <li className='vertical'><img src="./icon/shopping.png" alt="shoppingCart" /></li>
                            <p className='headerTotalQty'>{totalQty}</p>
                        </div>
                    </ul>
                </div>
            </nav>
            <div id='innernav' className='d-flex-center'>
                <div>
                    <div className='roundactive active'>
                        <div className='innercircle'></div>
                    </div>
                    <p className='innerHeaderText'>SHOPPING CART</p>
                </div>
                <div>
                    <div className='round nonactive'></div>
                    <p className='innerHeaderText'> ORDER DETAILS</p>
                </div>
                <div>
                    <div className='round'></div>
                    <p className='innerHeaderText'>MAKE PAYMENT</p>
                </div>
            </div>
        </>
    )
}

export default Header
