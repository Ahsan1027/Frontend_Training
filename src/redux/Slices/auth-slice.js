import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
	'login/loginUser',
	async (data, thunkAPI) => {
		try {
			const {
				email,
				password,
			} = data;
			const response = await axios.post('http://localhost:4000/api/auth/login', {
				email,
				password,
			});
			return {
				token: response.data.token,
				id: response.data.id,
				username: response.data.username,
				email: response.data.email,
				role: response.data.role,
				customerId: response.data.stripeId,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const SignupUser = createAsyncThunk(
	'login/SignupUser',
	async (data, thunkAPI) => {
		try {
			const {
				name,
				email,
				password,
				mobile,
			} = data;
			const response = await axios.post('http://localhost:4000/api/auth/signup', {
				name,
				email,
				password,
				mobile,
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const forgotUser = createAsyncThunk(
	'login/forgotUser',
	async (data, thunkAPI) => {
		try {
			const {
				email,
			} = data;
			const response = await axios.post('http://localhost:4000/api/auth/forgot-password', {
				email,
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const newPassword = createAsyncThunk(
	'login/newPassword',
	async (data, thunkAPI) => {
		try {
			const {
				password,
				confirmPassword,
				token
			} = data;
			if (password === confirmPassword) {
				const response = await axios.post('http://localhost:4000/api/auth/new-password', {
					password
				},
					{
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					}
				);
				return response.data;
			}
			else {
				return thunkAPI.rejectWithValue('Passwords do not match.');
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const verifyUser = createAsyncThunk(
	'login/verifyUser',
	async (data, thunkAPI) => {
		try {
			const {
				token
			} = data;
			const response = await axios.put('http://localhost:4000/api/auth/user-verifying', {},
				{
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const LoginSlice = createSlice({
	name: 'logins',
	initialState: {
		token: null,
		loading: false,
		error: null,
		role: null,
	},
	reducers: {
		logout: (state) => {
			state.token = null;
			state.loading = false;
			state.email = null;
			state.id = null;
			state.username = null;
			state.error = null;
			state.role = null;
		},
		updateCustomerId: (state, action) => {
			const { custId } = action.payload;
			state.customerId = custId;
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token;
				state.id = action.payload.id;
				state.username = action.payload.username;
				state.email = action.payload.email;
				state.role = action.payload.role;
				state.customerId = action.payload.customerId;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(SignupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(SignupUser.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(SignupUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(forgotUser.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(forgotUser.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
				state.role = null;
				state.error = null;
			})
			.addCase(forgotUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(verifyUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.isVerified = null;
			})
			.addCase(verifyUser.fulfilled, (state, action) => {
				state.loading = false;
				state.isVerified = action.payload.message;
				state.error = null;
			})
			.addCase(verifyUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
				state.isVerified = null;
			})
			.addCase(newPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(newPassword.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(newPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			});
	},
});

export default LoginSlice.reducer;
export const { logout, updateCustomerId } = LoginSlice.actions;
