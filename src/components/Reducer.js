export const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_QUANTITY':
            const updatedCart = state.item.map((product) => {
                if (product.id === action.payload) {
                    return { ...product, quantity: product.quantity + 1 }
                }
                return product;
            })
            return { ...state, item: updatedCart }

        case 'DECREMENT_QUANTITY':
            const updateCart = state.item.map((product) => {
                if (product.id === action.payload) {
                    let qty = product.quantity <= 0 ? 0 : product.quantity - 1
                    return { ...product, quantity: qty }
                }
                return product;
            })
            return { ...state, item: updateCart }

        case 'DELETE_PRODUCT':
            return {
                ...state,
                item: state.item.filter((product) => product.id !== action.payload)
            }

        case 'CALCULATE_TOTAL':
            let { subTotal, totalDiscount, totalQty, totalAmount } = state.item.reduce((total, product) => {
                let { quantity, price } = product;
                let { subTotal, totalDiscount, totalQty, totalAmount } = total;
                totalQty = quantity + totalQty;
                subTotal = price * quantity + subTotal;
                if (subTotal > state.discount.minTotal) {
                    totalDiscount = subTotal * (state.discount.discountPercentage / 100)
                    totalAmount = subTotal - totalDiscount;
                } else {
                    totalAmount = subTotal;
                }
                if (state.enteredPincode.deliveryPrice && totalAmount !== 0) {
                    totalAmount = totalAmount - state.enteredPincode.deliveryPrice;
                }
                return { subTotal, totalDiscount, totalQty, totalAmount };
            }, { subTotal: 0, totalDiscount: 0, totalQty: 0, totalAmount: 0 });
            return { ...state, subTotal, totalDiscount, totalQty, totalAmount }

        case 'CHECK_PINCODE':
            let pincodeLength = action.payload.length;
            let defaultPincode1 = {
                deliveryPrice: 100,
                cashOnDelivery: false,
                estimatedDays: {
                    min: 3,
                    max: 5,
                },
                validPincode: false,
                value: '',
            };
            let enteredPincode1 = {};
            if (pincodeLength < 6) {
                enteredPincode1 = defaultPincode1;
                enteredPincode1.value = action.payload;
            } else if (pincodeLength === 6) {
                for (let key of Object.keys(state.pincode)) {
                    if (key === action.payload) {
                        enteredPincode1 = state.pincode[key]
                        enteredPincode1.validPincode = true;
                    }
                }
                enteredPincode1.value = action.payload;
            } else if (pincodeLength > 6) {
                enteredPincode1.value = action.payload.slice(0, 6)
            }
            return { ...state, enteredPincode: { ...state.enteredPincode, ...enteredPincode1 } }

        default:
            return state;
    }
}