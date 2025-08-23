import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    login, getUsers, getDashboard, getCoupons, getCities, createCoupon, getPromoCode, getCouponInfo, deleteCoupons, updateUserStatusinfo, getUserInfo,
    getUpdatedCities, getCountries, getStates, getCitiesCustom, addUpdateCustomCity, getContent, getUserSubscriptions, getPackages
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

export const fetchCouponInfo = createAsyncThunk(
    "user/fetchCouponInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getCouponInfo(reqPayload);
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

export const deleteCoupon = createAsyncThunk(
    "user/deleteCoupon",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deleteCoupons(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const updateUserStatus = createAsyncThunk(
    "user/updateUserStatus",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await updateUserStatusinfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchUserInfo = createAsyncThunk(
    "user/fetchUserInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getUserInfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchUpdatedCities = createAsyncThunk(
    "user/fetchUpdatedCities",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getUpdatedCities(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchCountries = createAsyncThunk(
    "user/fetchCountries",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getCountries(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchStates = createAsyncThunk(
    "user/fetchStates",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getStates(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchCitiesCustom = createAsyncThunk(
    "user/fetchCitiesCustom",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getCitiesCustom(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const addUpdateCity = createAsyncThunk(
    "user/addUpdateCity",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await addUpdateCustomCity(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchContent = createAsyncThunk(
    "user/fetchContent",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getContent(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchUserSubscriptions = createAsyncThunk(
    "user/fetchUserSubscriptions",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getUserSubscriptions(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchPackages = createAsyncThunk(
    "user/fetchPackages",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getPackages(reqPayload);
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
        allSubscribeList: [],
        packagesList: [],
        status: "start",
        error: null,
        currentPage: 1,
        perPage: 10,
        totalPages: 0,
        lastUpdated: "",
        message: null,
        couponInfo: null,
        userDetailInfo: null,
        updatedCitiesList: [],
        countriesList: [],
        statesList: [],
        citiesList: [],
        contentInfo: null,
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
            })
            .addCase(fetchCouponInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCouponInfo.fulfilled, (state, action) => {
                state.couponInfo = action.payload?.data || {};
                state.status = "succeeded";
            })
            .addCase(fetchCouponInfo.rejected, (state) => {
                state.couponInfo = {};
                state.status = 'failed';
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.couponsList = state.couponsList.filter(coupon => !action.payload?.data?.includes(coupon._id));
                state.status = "succeeded";
            })
            .addCase(deleteCoupon.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userDetailInfo = action.payload?.data || {};
                state.status = "succeeded";
            })
            .addCase(fetchUserInfo.rejected, (state) => {
                state.userDetailInfo = {};
                state.status = 'failed';
            })
            .addCase(fetchUpdatedCities.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUpdatedCities.fulfilled, (state, action) => {
                state.updatedCitiesList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchUpdatedCities.rejected, (state) => {
                state.updatedCitiesList = [];
                state.status = 'failed';
            })
            .addCase(fetchCountries.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countriesList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchCountries.rejected, (state) => {
                state.countriesList = [];
                state.status = 'failed';
            })
            .addCase(fetchStates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.statesList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchStates.rejected, (state) => {
                state.statesList = [];
                state.status = 'failed';
            })
            .addCase(fetchCitiesCustom.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCitiesCustom.fulfilled, (state, action) => {
                state.citiesList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchCitiesCustom.rejected, (state) => {
                state.citiesList = [];
                state.status = 'failed';
            })
            .addCase(addUpdateCity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addUpdateCity.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(addUpdateCity.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchUserSubscriptions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
                state.allSubscribeList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchUserSubscriptions.rejected, (state) => {
                state.allSubscribeList = [];
                state.status = 'failed';
            })
            .addCase(fetchPackages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPackages.fulfilled, (state, action) => {
                state.packagesList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchPackages.rejected, (state) => {
                state.packagesList = [];
                state.status = 'failed';
            });

    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

