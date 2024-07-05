import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
    reducer:  {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})

})

{/* useSelect initalState'i okumak için */}
{/* UseDispatch verileri göndermek anlamında, 
    setEmail, SetPassword, setIsLoading de veri göndermek için kurduğumuz yapılar için kullanılır */}