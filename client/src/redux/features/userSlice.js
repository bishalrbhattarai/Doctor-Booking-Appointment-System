import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{}
    },
    reducers:{
          setUser:(state,action)=>{
            state.user =action.payload
          },
          removeUser:(state)=>  {
            state.user = {}
          }   
    }


  //   reducers: { 
  //     setUser: (state, action) => {
  //         state.value = action.payload
  //     },
  //     clearUser: state => {
  //         state.value = {}
  //     }
  // }








})

export const {setUser,removeUser} = userSlice.actions 