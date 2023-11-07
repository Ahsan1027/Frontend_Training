import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchDashboardStats',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:4000/api/dashboard/stat', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const productsData = response.data;
      return productsData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
);

const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: [],
    productsData: [],
    loading: false,
    totalSold: 0,
    totalUnsold: 0,
    totalOrders: [],
    totalAmount: [],
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalSold = action.payload[0].totalSold;
        state.totalUnsold = action.payload[0].totalUnsold;
        state.totalOrders = action.payload[0].totalOrders;
        state.totalAmount = action.payload[0].totalAmount;
        state.productsData = action.payload[0].topSellingProducts;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default DashboardSlice.reducer;
