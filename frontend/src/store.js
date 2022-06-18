import React from 'react'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {  productReducer,productDetail,createReviews} from './reducers/productReducer'
import { loginReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
const reducers=combineReducers({
     products:productReducer,
     productDetail,
     createReviews,
     user:loginReducer,
     cart:cartReducer
})


let initialState={
     cart:{
          cartItems: localStorage.getItem("cartProducts")
      ? JSON.parse(localStorage.getItem("cartProducts"))
      : [],
      shippingInfo: localStorage.getItem("shippingDetailsUser")
      ? JSON.parse(localStorage.getItem("shippingDetailsUser"))
      : [],
     }
}

const store=createStore(reducers,initialState,composeWithDevTools(applyMiddleware(thunk)))

export default store