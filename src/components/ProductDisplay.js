import React, { useContext } from 'react';
import { cartItemContext } from '../App';
import minusImg from './icon//minus.png';
import minusActiveImg from './icon/minus-active.png';

const ProductDisplay = ({ id, name, price, imageUrl, desc, quantity, tagline }) => {
    const { incrementQty, decrementQty, deleteProduct } = useContext(cartItemContext);
    return (
        <><tr key={id}>
            <td className='productDetails'>
                <div className='productImg'>
                    <img src={imageUrl} alt="earphone" />
                </div>
                <div className='productDesc'>
                    <li className='tagline'>{tagline}</li>
                    <li className='productName'>{name}</li>
                    <pre className='productFeature'>{desc}</pre>
                    <div className='mobile-disp'>
                        <li className='width15 font-8rem'>{price}</li>
                        <li className='width15'>
                            <div className='plusminusdiv'>
                                <button onClick={() => decrementQty(id)}>
                                    <img src={`${quantity > 0 ? minusActiveImg : minusImg} `} alt="minus" />
                                </button>
                                <input name='quantity' type='number' placeholder={quantity} />
                                <button onClick={() => incrementQty(id)}>
                                    <img src="./icon/plus.png" alt="minus" />
                                </button>
                            </div>
                        </li>
                    </div>
                </div>
            </td>
            <td className='width15 price'>{price}</td>
            <td className='width15 qty'>
                <div className='plusminusdiv'>
                    <button onClick={() => decrementQty(id)}>
                        <img src={`${quantity > 0 ? minusActiveImg : minusImg} `} alt="minus" />
                    </button>
                    <input name='quantity' type='number' placeholder={quantity} />
                    <button onClick={() => incrementQty(id)}>
                        <img src="./icon/plus.png" alt="minus" />
                    </button>
                </div>
            </td>
            <td className='subTotal'>
                <input type="text" placeholder={quantity * price} />
                <button onClick={() => deleteProduct(id)}>
                    <img src="./icon/DELETE.png" alt="delete" />
                </button>
            </td>
        </tr>
        </>
    )
}

export default ProductDisplay