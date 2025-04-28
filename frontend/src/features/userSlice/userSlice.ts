import { IUser } from "@/types";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


type isLoggedResponse = {
  isLogged: boolean,
  user?: IUser
}

export const fetchUserIsLogged = createAsyncThunk<isLoggedResponse>(
  'user/isLogged',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<isLoggedResponse>(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/isLogged`);
      console.log(res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || "Error while checking is user auth")
    }
  }
)

interface IUserState {
  isLogged: boolean,
  user?: IUser | null,
  isLoading: boolean
}

const initialState:IUserState = {
  isLogged: false,
  user: null,
  isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserIsLogged.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserIsLogged.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isLogged = action.payload.isLogged;
      })
      .addCase(fetchUserIsLogged.rejected, (state) => {
        state.isLoading = false;
      })
  },
})

export const {} = userSlice.actions;
export default userSlice.reducer