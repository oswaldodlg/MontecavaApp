import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useGetRole } from "../hooks/useGetRole";

export const CartContext = createContext()



export const CartContextProvider = ({ children } ) => {
    
    const [cart, setCart] = useState([])
   

    useEffect(() => {
        console.log('CartContext state:', cart)

    }, [cart])
   
    return (
        <CartContext.Provider value={{ cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}