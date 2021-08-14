import React, { useContext } from 'react';
import { cartItemContext } from '../App';
import ProductDisplay from './ProductDisplay';

const Container = () => {
    const { item, subTotal, totalDiscount, totalQty, totalAmount, checkPincode, enteredPincode } = useContext(cartItemContext);
    return (
        <main>
            <header>
                <p>Shop for $5000 or more and get 10% discount on your order</p>
            </header>
            <div className='shoopingCartDiv'>
                <img src="./Images/arrow.png" alt="arrow" className="arrow-icon mobile-disp" />
                <h1>Shopping cart</h1>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='productText'>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        item.map((product) => {
                            const { id, gift } = product;
                            return gift ?
                                <>
                                    <ProductDisplay {...product} />
                                    <div className='triangle-up'></div>
                                    <tr key={id + 'f'} className='gift'>
                                        <td className='productDetails'>
                                            <div className='productImg'>
                                                <img src={gift.link} alt="earphone" />
                                            </div>
                                            <div className='productDesc'>
                                                <li className='giftKeyword'>GIFT</li>
                                                <li className='productName'>{gift.name}</li>
                                                <pre className='productFeature'>{gift.desc}</pre>
                                                <li className='mobile-disp'>Qty: 1</li>
                                                <li className='width15 mobile-disp'>{gift.price}</li>
                                            </div>
                                        </td>
                                        <td className='width15 mobile-disp-none'>{gift.price}</td>
                                        <td className='mobile-disp-none'>
                                            <div className='plusminusdiv'>
                                                <input name='quantity' type='number' placeholder='1' />
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </>
                                :
                                <ProductDisplay {...product} />
                        })
                    }
                </tbody>
            </table>
            <section>
                <div className="lowerSection">
                    <div className='deliveryDetails'>
                        <p id='deliveryAvailabilityText'>Delivery Availability</p>
                        <div className='deliveryInput'>
                            <img src="./icon/LOCATION.png" alt="" />
                            <input type="number" name="pincode" id="pincode" value={enteredPincode.value} onChange={checkPincode} />
                            <span className='blueFontColor'>CHANGE</span>
                        </div>
                        <div className='deliveryCheck'>
                            <div className='check'>
                                <img src="./icon/check.png" alt="checkIcon" className={`${enteredPincode.deliveryPrice > 0 || enteredPincode.deliveryPrice === undefined ? ' hidden ' : ''}`} />
                                <span>Free Delivery</span>
                            </div>
                            <div className='check'>
                                <img src="./icon/check.png" alt="checkIcon" className={`${enteredPincode.cashOnDelivery ? '' : ' hidden'}`} />
                                <span>Cash on delivery</span>
                            </div>
                            <div className='check'>
                                <img src="./icon/check.png" alt="checkIcon" />
                                <span>Estimate deliver time is {enteredPincode.estimatedDays.min}-{enteredPincode.estimatedDays.max} days</span>
                            </div>
                        </div>
                    </div>
                    <div className='orderSummary'>
                        <p className='orderSummaryText'>Order Summary ({totalQty} items)</p>
                        <div className='orderSummaryInnerDiv'>
                            <label htmlFor="">Subtotal</label>
                            <span>{subTotal}</span>
                        </div>
                        <div className='orderSummaryInnerDiv'>
                            <label htmlFor="">Total Discount</label>
                            <span>{totalDiscount}</span>
                        </div>
                        <div className='orderSummaryInnerDiv'>
                            <label htmlFor="">Standard Shipping</label>
                            <span>{enteredPincode.deliveryPrice}</span>
                        </div>
                        <div className='orderSummaryInnerDiv'>
                            <label htmlFor="">Order Total</label>
                            <span id='totalAmount'>{totalAmount}</span>
                        </div>
                        <div className='orderSummaryInnerDiv' id='checkout'>
                            <label htmlFor="" className='blueFontColor'>CONTINUE SHOPPING</label>
                            <button className={`checkoutBtn ${totalQty && enteredPincode.validPincode ? '' : ' disable'}`}>CHECKOUT</button>
                        </div>
                    </div>
                    <div className=' display-none mobileCheckout'>
                        <button className={`checkoutBtn ${totalQty && enteredPincode.validPincode ? '' : ' disable'}`}>CHECKOUT</button>
                        <p className='blueFontColor'>CONTINUE SHOPPING</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Container