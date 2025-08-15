import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    login, getUsers, getDashboard, getCoupons, getCities, createCoupon, getPromoCode
} from "../services/main";

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await login(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getUsers(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchDashboard = createAsyncThunk(
    "user/fetchDashboard",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getDashboard();
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchCoupons = createAsyncThunk(
    "user/fetchCoupons",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getCoupons(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchCities = createAsyncThunk(
    "user/fetchCities",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getCities(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const addCoupon = createAsyncThunk(
    "user/addCoupon",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await createCoupon(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchPromoCode = createAsyncThunk(
    "user/fetchPromoCode",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getPromoCode(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        isLoggedIn: false,
        usersList: [],
        couponsList: [],
        allowCitiesList: [],
        promoCodeList: [],
        status: "start",
        error: null,
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        lastUpdated: "",
        message: null,
        dashboardInfo: {
            "totalUsers": 0,
            "totalCoupons": 0,
            "totalPackages": 0,
            "totalSubscriptions": 0,
            "totalAmount": 0,
            "totalPromoCodes": 0,
            "totalCities": 0,
            "totalFeedbacks": 0
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userInfo = action.payload?.data;
                state.isLoggedIn = true;
                state.status = 'success';
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.userInfo = null;
                state.isLoggedIn = false;
                state.status = 'failed';
            })
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.usersList = [];
                state.status = 'failed';
            })
            .addCase(fetchDashboard.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.dashboardInfo = action.payload?.data || {};
                state.status = "succeeded";
            })
            .addCase(fetchDashboard.rejected, (state) => {
                state.dashboardInfo = {};
                state.status = 'failed';
            })
            .addCase(fetchCoupons.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.couponsList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchCoupons.rejected, (state) => {
                state.couponsList = [];
                state.status = 'failed';
            })
            .addCase(fetchCities.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.allowCitiesList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchCities.rejected, (state) => {
                state.allowCitiesList = [];
                state.status = 'failed';
            })
            .addCase(addCoupon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                // state.couponsList.push(action.payload?.data);
                state.status = "succeeded";
            })
            .addCase(addCoupon.rejected, (state) => {
                // state.couponsList = [];
                state.status = 'failed';
            })
            .addCase(fetchPromoCode.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPromoCode.fulfilled, (state, action) => {
                state.promoCodeList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchPromoCode.rejected, (state) => {
                state.promoCodeList = [];
                state.status = 'failed';
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

