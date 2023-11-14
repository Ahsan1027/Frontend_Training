import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addPayment = createAsyncThunk(
  'payment/addPayment',
  async ({
    name,
    email,
    cardNum,
    expMonth,
    expYear,
    CVC,
    title,
    token },
    thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/cartPayment/create-customer', {
        name,
        email,
        cardNum,
        expMonth,
        expYear,
        CVC,
        title,
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPayment = createAsyncThunk(
  'payment/getPayment',
  async ({ customerId, token }, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/cartPayment/get-all-cards?customerId=${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    cards: [],
    cardId: '',
    error: null,
    status: '',
    customerId: '',
    paymentSuccess: false,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.cards = action.payload.cards;
        state.cardId = action.payload.cards;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPayment.rejected, (state, action) => {
        state.error = action.payload.message;
        state.cards = [];
        state.loading = false;
      })
      .addCase(addPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.status = 'Paid';
        state.cardId = action.payload.cardId;
        state.customerId = action.payload.customerId;
        state.paymentSuccess = true;

      })
      .addCase(addPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
