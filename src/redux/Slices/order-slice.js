import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrdersData = createAsyncThunk(
  'order/fetchOrdersData',
  async ({
    currentPage = 1,
    email = '',
    orderId = '',
    token },
    thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/order/get-order?limit=5&skip=${(currentPage - 1) * 5}&email=${email}&orderId=${orderId}`, {
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

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async ({
    date,
    orderId,
    username,
    products,
    email,
    totalAmount,
    cardId,
    customerId,
    status,
    token }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/order/add-order', {
        date,
        orderId,
        username,
        products,
        email,
        totalAmount,
        status,
        cardId,
        customerId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const productAdded = response.data;
      return productAdded;
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('An error occurred. Please try again later.');
        }
      } else {
        alert('An error occurred. Please try again later.');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (OrderId, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/order/delete-order/${OrderId}`);
      const productsData = response.data;
      return productsData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async ({ orderId, token }, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/order/get-order-detail/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const ordersData = response.data;
      return ordersData.productDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderStats = createAsyncThunk(
  'order/fetchOrderStats',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/stat', {
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

export const updateDeliveryStatus = createAsyncThunk(
  'order/updateDeliveryStatus',
  async ({ email, orderId, token }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/order/add-delivery', { email, orderId }, {
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

export const updateOrdersData = createAsyncThunk(
  'order/updateOrdersData',
  async (updatedProductsData) => {
    return updatedProductsData;
  }
);

const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    stats: [],
    productsData: [],
    notifications: [],
    ordersData: [],
    loading: false,
    orderCheckSuccess: false,
    orderDeliverSuccess: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersData.fulfilled, (state, action) => {
        state.loading = false;
        state.productsData = action.payload;
        state.orderCheckSuccess = true,
          state.error = null;
      })
      .addCase(fetchOrdersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersData = action.payload;
        state.error = null;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        console.log('check order action payload',action.payload);
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.productsData = state.productsData.orders.filter(product => product.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrdersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrdersData.fulfilled, (state, action) => {
        state.productsData = action.payload;
        state.loading = false;
      })
      .addCase(updateOrdersData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateDeliveryStatus.pending, (state) => {
        state.loading = true;
        state.orderDeliverSuccess = false,
          state.error = null;
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        state.productsData = action.payload;
        state.orderDeliverSuccess = true,
          state.loading = false;
      })
      .addCase(updateDeliveryStatus.rejected, (state, action) => {
        state.loading = false;
        state.orderDeliverSuccess = false,
          state.error = action.payload;
      });
  },
});

export default OrderSlice.reducer;
