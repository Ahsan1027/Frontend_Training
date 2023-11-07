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
				state.error = action.payload;
			})
			.addCase(forgotUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(forgotUser.fulfilled, (state) => {
				state.loading = false;
				state.role = null;
				state.error = null;
			})
			.addCase(forgotUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
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
				state.error = action.payload;
			});
	},
});

export default LoginSlice.reducer;
export const { logout } = LoginSlice.actions;
