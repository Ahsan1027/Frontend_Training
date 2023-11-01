import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsData = createAsyncThunk(
    'fetch/fetchProductsData',
    async ({
        currentPage,
        minPrice = 0,
        maxPrice = 0,
        sortField = '',
        sortOrder = '',
        title = ''
    }, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/prod/get-prod?limit=5&skip=${(currentPage - 1) * 5}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortField=${sortField}&sortOrder=${sortOrder}&title=${title}`);
            const productsData = response.data;
            return productsData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'fetch/deleteProduct',
    async ({ productId, token }, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/prod/delete-prod/${productId}`,
                {
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

export const addProduct = createAsyncThunk(
    'fetch/addProduct',
    async (productData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:4000/api/prod/add-prod', productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${productData.token}`,
                }
            });
            const productAdded = response.data;
            return productAdded;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const importBulkProduct = createAsyncThunk(
    'fetch/importBulkProduct',
    async (productData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:4000/api/prod/import-bulk', productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${productData.token}`,
                }
            });
            const productAdded = response.data;
            return productAdded;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const editProduct = createAsyncThunk(
    'fetch/editProduct',
    async (data, thunkAPI) => {
        try {
            const {
                editedProductData,
                title,
                price,
                stock,
                rating,
                thumbnail,
                selectedSizes,
                selectedColors,
                token } = data;

            console.log('check in slice', selectedSizes, selectedColors);

            const updateFields = {};
            if (title !== '') {
                updateFields.title = title;
            }
            if (price !== '') {
                updateFields.price = price;
            }
            if (stock !== '') {
                updateFields.stock = stock;
            }
            if (rating !== '') {
                updateFields.rating = rating;
            }
            if (thumbnail !== '') {
                updateFields.thumbnail = thumbnail;
            }
            if (selectedSizes !== '') {
                updateFields.selectedSizes = selectedSizes;
            }
            if (selectedColors !== '') {
                updateFields.selectedColors = selectedColors;
            }
            const response = await axios.put(`http://localhost:4000/api/prod/edit-prod/${editedProductData}`, updateFields, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const updatedProduct = response.data;
            console.log(response.data);
            return updatedProduct;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateProductsData = createAsyncThunk(
    'fetch/updateProductsData',
    async (updatedProductsData) => {
        return updatedProductsData;
    }
);

const FetchSlice = createSlice({
    name: 'fetch',
    initialState: {
        productsData: [],
        fileErrors: [],
        fileData: '',
        fileError: '',
        rowError: '',
        fileName: '',
        loading: false,
        error: null,
        addSuccess: false,
        deleteSuccess: false,
        editSuccess: false,
        orderSuccess: false
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                state.loading = false;
                console.log('check action payload', action.payload);
                state.productsData = action.payload;
                state.orderSuccess = false;
                state.error = null;
            })
            .addCase(fetchProductsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.productsData?.products?.push(action.payload.productsData);
                state.addSuccess = true,
                    state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(importBulkProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(importBulkProduct.fulfilled, (state, action) => {
                state.loading = false;
                console.log('check slice data', action.payload);
                state.productsData?.products?.push(action.payload.productsData);
                state.fileData = action.payload.productsData.length;
                state.fileError = action.payload.total;
                state.fileName = action.payload.filename;
                // state.rowError = action.payload.rowIndex;
                state.fileErrors = action.payload.errorRows;
                state.addSuccess = true,
                    state.error = null;
            })
            .addCase(importBulkProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const productIdToDelete = action.payload.deletedProduct._id;
                state.productsData = {
                    ...state.productsData,
                    products: state.productsData.products.filter(product => product._id !== productIdToDelete)
                };
                state.deleteSuccess = true;
                state.error = null;
            })

            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.editSuccess = true;
                const updatedProduct = action.payload.updatedProduct;
                const editedProductIndex = state.productsData.products.findIndex(
                    (product) => product._id === updatedProduct._id
                );
                if (editedProductIndex !== -1) {
                    state.productsData.products[editedProductIndex] = updatedProduct;
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProductsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductsData.fulfilled, (state, action) => {
                state.productsData = action.payload;
                state.loading = false;
            })
            .addCase(updateProductsData.rejected, (state) => {
                state.loading = false;
            });
    },
});


export default FetchSlice.reducer;
