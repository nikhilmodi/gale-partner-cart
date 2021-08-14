import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import React, { useEffect, useReducer, createContext } from 'react'
import { products } from './components/Products';
import { discount } from './components/Discount';
import { pincode } from './components/Pincode';
import { reducer } from './components/Reducer';
import Footer from './components/Footer';
export const cartItemContext = createContext();

function App() {
  const initialState = {
    item: products,
    discount: discount,
    subTotal: 0,
    totalDiscount: 0,
    totalQty: 0,
    totalAmount: 0,
    pincode: pincode,
    totalShipping: 0,
    enteredPincode: {
      deliveryPrice: 100,
      cashOnDelivery: false,
      estimatedDays: {
        min: 3,
        max: 5,
      },
      validPincode: false,
      value: '',
    },
  };

  let initialData = JSON.parse(localStorage.getItem('state')) || initialState;
  const [state, dispatch] = useReducer(reducer, initialData);

  const incrementQty = (id) => {
    return dispatch({
      type: 'INCREMENT_QUANTITY',
      payload: id,
    })
  }
  const decrementQty = (id) => {
    return dispatch({
      type: 'DECREMENT_QUANTITY',
      payload: id,
    })
  }
  const deleteProduct = (id) => {
    return dispatch({
      type: 'DELETE_PRODUCT',
      payload: id,
    })
  }
  const checkPincode = (e) => {
    return dispatch({
      type: 'CHECK_PINCODE',
      payload: e.currentTarget.value
    })
  }

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.item, state.enteredPincode.deliveryPrice]);

  useEffect(() => {
    window.localStorage.setItem('state', JSON.stringify(state));
  })

  return (
    <cartItemContext.Provider value={{ ...state, incrementQty, decrementQty, deleteProduct, checkPincode }}>
      <div className="App">
        <Header />
        <Container />
        <Footer />
      </div>
    </cartItemContext.Provider>
  );
}

export default App;