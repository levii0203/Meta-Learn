import { configureStore } from "@reduxjs/toolkit"
import { Action, ThunkAction } from "@reduxjs/toolkit"
import walletReducer from './slice/wallet'
import UserReducer from './slice/user'
import metaReducer from './slice/meta'
import componentReducer from './slice/component'
import notificationReducer from './slice/notification'


const store = configureStore({
    reducer: {
        wallet: walletReducer,
        user:UserReducer,
        meta:metaReducer,
        component:componentReducer,
        notification:notificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default store;