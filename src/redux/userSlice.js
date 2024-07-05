import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk('user/login', async({email, password}) => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;

        const userData = {
            token,
            user: user,
        }

        await AsyncStorage.setItem("userToken", token)

        return userData

    } catch (error) {
        console.log("userSlice 21 line: ", error)
        throw error
    }
})


// Kullanıcı otommatik giriş işlemleri
export const autoLogin = createAsyncThunk('user/autoLogin', async() => {
    try {
        const token = await AsyncStorage.getItem("userToken")
        
        if (token) {
            return token
        } else {
            throw new Error("User Not Found!")
        }
    } catch (error) {
        throw error
    }
})


// Kullanıcı çıkış işlemleri
export const logout = createAsyncThunk('user/logout', async() => {
    try {
        const auth = getAuth()
        await signOut(auth)
        await AsyncStorage.removeItem("userToken")
        return null;
    } catch (error) {
        throw error
    }
})


// Kullanıcı kayıt işlemleri
export const signIn = createAsyncThunk('user/signIn', async({email, password})=> {
    try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user
        const token = user.stsTokenManager.accessToken

        await sendEmailVerification(user)

        await AsyncStorage.setItem("userToken", token)

        return token;

    } catch (error) {
        throw error
    }
})

const initialState = {
    isLoading: false,
    isAuth: false,
    token: null,
    user: null,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    
        setEmail: (state, action) => {
            const lowerCaseEmail = action.payload.toLowerCase()
            state.email = lowerCaseEmail
        },

        setPassword: (state, action) => {
            state.password = action.payload
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },

        /* setEmailin çağırılması bir aksiyondur, aksiyon içerisinde veri gönderdiyse bunun adına payload denir.*/
        /* setEmail in içinde yazan state aslında initalState */

        // setLogin: (state) => {
        //     if((state.email === state.users.userEmail) 
        //         && (state.password === state.users.userPassword)) {
        //         console.log(true)
        //         state.isAuth = true
        //     } else {
        //         console.log(false)
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder
            // Login İşemleri İçin;
            .addCase(login.pending, (state)=>{
                state.isLoading = true;
                state.isAuth = false;
            }) // yükleniyor
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            }) // yüklendi / başarılı
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.error.message;
            }) // yüklenmedi / hata

            // AutoLogin İşlemleri İçin;
            .addCase(autoLogin.pending, (state)=> {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(autoLogin.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.isAuth = true;
                state.token = action.payload;
            })
            .addCase(autoLogin.rejected, (state, action)=> {
                state.isLoading = false;
                state.isAuth = false;
                state.token = null;
            })

            // Logout işlemleri
            .addCase(logout.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) =>{
                state.isLoading = false;
                state.isAuth = false;
                state.token = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) =>{
                state.isLoading = false;
                state.error = action.payload;
            })

            // Sign In işlemleri
            .addCase(signIn.pending, (state) =>{
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(signIn.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isAuth = true;
                state.token = action.payload;
            })
            .addCase(signIn.rejected, (state, action) =>{
                state.isLoading = false;
                state.isAuth = false;
                state.error = "Invalid Email and Password!"
            })
    }
})

export const {setEmail, setPassword, setIsLoading} = userSlice.actions
export default userSlice.reducer;