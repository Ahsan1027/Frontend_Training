import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async (token, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:4000/api/dashboard/top-sold', {
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

export const ordersOverviewData = createAsyncThunk(
    'dashboard/ordersOverviewData',
    async (token, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:4000/api/dashboard/overview', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return {
                totalSold: response.data.totalSold,
                totalUnsold: response.data.totalUnsold,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const ordersReportData = createAsyncThunk(
    'dashboard/ordersReportData',
    async (token, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:4000/api/dashboard/orders-report', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return {
                totalOrders: response.data.totalOrders,
                totalAmount: response.data.totalAmount,
            };
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
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.productsData = action.payload;
                state.error = null;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
                state.error = null;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ordersOverviewData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ordersOverviewData.fulfilled, (state, action) => {
                state.loading = false;
                state.totalSold = action.payload.totalSold;
                state.totalUnsold = action.payload.totalUnsold;
                state.error = null;
            })
            .addCase(ordersOverviewData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ordersReportData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ordersReportData.fulfilled, (state, action) => {
                state.loading = false;
                state.totalOrders = action.payload.totalOrders;
                state.totalAmount = action.payload.totalAmount;
                state.error = null;
            })
            .addCase(ordersReportData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default DashboardSlice.reducer;
