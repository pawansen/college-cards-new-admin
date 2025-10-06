import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    login, getUsers, getDashboard, getCoupons, getCities, createCoupon, getPromoCode, getCouponInfo, deleteCoupons, updateUserStatusinfo, getUserInfo,
    getUpdatedCities, getCountries, getStates, getCitiesCustom, addUpdateCustomCity, getContent, getUserSubscriptions, getPackages, createPackage, getPackageInfo, updatePackageInfo, deletePackageInfo, addPromoCode, getPromoCodeInfo, updatePromoCode, deletePromoCode, getNotifications, deleteNotifications, getFeedback, deleteFeedbacks, getReplayFeedbackInfo, addReplayOnFeedback, createContent, getVersion, updateVersionAll, deletedUsersInfo, getRestaurentsLogo,
    deleteRestaurantLogoSingle, createRestaurentsLogo, findRestaurentsLogoInfo
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

export const fetchRestaurentsLogo = createAsyncThunk(
    "user/fetchRestaurentsLogo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getRestaurentsLogo(reqPayload);
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

export const deletedUsers = createAsyncThunk(
    "user/deletedUsers",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deletedUsersInfo(reqPayload);
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


export const addContent = createAsyncThunk(
    "user/addContent",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await createContent(reqPayload);
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

export const addPackage = createAsyncThunk(
    "user/addPackage",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await createPackage(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchPackageInfo = createAsyncThunk(
    "user/fetchPackageInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getPackageInfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const updatePackage = createAsyncThunk(
    "user/updatePackage",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await updatePackageInfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const deletePackage = createAsyncThunk(
    "user/deletePackage",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deletePackageInfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const createPromoCode = createAsyncThunk(
    "user/createPromoCode",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await addPromoCode(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchPromoCodeInfo = createAsyncThunk(
    "user/fetchPromoCodeInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getPromoCodeInfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const updatePromoCodeInfo = createAsyncThunk(
    "user/updatePromoCodeInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await updatePromoCode(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const deletePromoCodeInfo = createAsyncThunk(
    "user/deletePromoCodeInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deletePromoCode(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchNotifications = createAsyncThunk(
    "user/fetchNotifications",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getNotifications(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const deleteNotification = createAsyncThunk(
    "user/deleteNotification",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deleteNotifications(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchFeedback = createAsyncThunk(
    "user/fetchFeedback",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getFeedback(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    "user/deleteFeedback",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deleteFeedbacks(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchReplayFeedbackInfo = createAsyncThunk(
    "user/fetchReplayFeedbackInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getReplayFeedbackInfo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const sentReplayOnFeedback = createAsyncThunk(
    "user/sentReplayOnFeedback",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await addReplayOnFeedback(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const fetchVersion = createAsyncThunk(
    "user/fetchVersion",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await getVersion(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);
export const updateVersion = createAsyncThunk(
    "user/updateVersion",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await updateVersionAll(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const deleteRestaurantLogo = createAsyncThunk(
    "user/deleteRestaurantLogo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await deleteRestaurantLogoSingle(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const addRestaurentsLogo = createAsyncThunk(
    "user/addRestaurentsLogo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await createRestaurentsLogo(reqPayload);
            return response?.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
            });
        }
    }
);

export const getRestaurentsLogoInfo = createAsyncThunk(
    "user/getRestaurentsLogoInfo",
    async (reqPayload, { rejectWithValue }) => {
        try {
            const response = await findRestaurentsLogoInfo(reqPayload);
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
        restaurentsLogoList: [],
        allSubscribeList: [],
        packagesList: [],
        notificationsList: [],
        feedbackList: [],
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
        packageInfo: null,
        promoCodeInfo: null,
        feedbackInfo: null,
        versionInfo: null,
        getRestaurentsLogoInfoResponse: null,
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
            })
            .addCase(addPackage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addPackage.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(addPackage.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchPackageInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPackageInfo.fulfilled, (state, action) => {
                state.packageInfo = action.payload?.data || null;
                state.status = "succeeded";
            })
            .addCase(fetchPackageInfo.rejected, (state) => {
                state.packageInfo = null;
                state.status = 'failed';
            })
            .addCase(updatePackage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePackage.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updatePackage.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deletePackage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePackage.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deletePackage.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createPromoCode.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPromoCode.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(createPromoCode.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchPromoCodeInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPromoCodeInfo.fulfilled, (state, action) => {
                state.promoCodeInfo = action.payload?.data || null;
                state.status = "succeeded";
            })
            .addCase(fetchPromoCodeInfo.rejected, (state) => {
                state.promoCodeInfo = null;
                state.status = 'failed';
            })
            .addCase(updatePromoCodeInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePromoCodeInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updatePromoCodeInfo.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deletePromoCodeInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePromoCodeInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deletePromoCodeInfo.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchNotifications.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notificationsList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchNotifications.rejected, (state) => {
                state.notificationsList = [];
                state.status = 'failed';
            })
            .addCase(fetchFeedback.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.feedbackList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchFeedback.rejected, (state) => {
                state.feedbackList = [];
                state.status = 'failed';
            })
            .addCase(fetchReplayFeedbackInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReplayFeedbackInfo.fulfilled, (state, action) => {
                state.feedbackInfo = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchReplayFeedbackInfo.rejected, (state) => {
                state.feedbackInfo = null;
                state.status = 'failed';
            })
            .addCase(sentReplayOnFeedback.pending, (state) => {
                state.status = "loading";
            })
            .addCase(sentReplayOnFeedback.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(sentReplayOnFeedback.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteNotification.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deleteNotification.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addContent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addContent.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(addContent.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchVersion.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVersion.fulfilled, (state, action) => {
                state.versionInfo = action.payload?.data || null;
                state.status = "succeeded";
            })
            .addCase(fetchVersion.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateVersion.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateVersion.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateVersion.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchRestaurentsLogo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRestaurentsLogo.fulfilled, (state, action) => {
                state.restaurentsLogoList = action.payload?.data || [];
                state.status = "succeeded";
            })
            .addCase(fetchRestaurentsLogo.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getRestaurentsLogoInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getRestaurentsLogoInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.getRestaurentsLogoInfoResponse = action.payload?.data || null;
            })
            .addCase(getRestaurentsLogoInfo.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

