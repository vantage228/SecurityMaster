import axios from 'axios';

export const initialState = {
    equityData: [],
    isLoading: false,
    error: null,
    active: true,
    isModalOpen: false,
    editData: {
        securityId: "",
        securityName: "",
        securityDescription: "",
        isActive: "",
        pricingCurrency: "",
        totalSharesOutstanding: "",
        openPrice: "",
        closePrice: "",
        dividendDeclaredDate: "",
        pfCreditRating: "",
        YtdReturn:""
    }
};

// Actions
const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const EDIT_EQUITY = 'EDIT_EQUITY';
const DELETE_EQUITY = 'DELETE_EQUITY';
const SET_ACTIVE = 'SET_ACTIVE';
const SET_MODAL_OPEN = 'SET_MODAL_OPEN';
const SET_MODAL_CLOSE = 'SET_MODAL_CLOSE';
const UPDATE_EDIT_DATA = 'UPDATE_EDIT_DATA';

// Reducer
export const equityReducer = (state, action) => {
    switch (action.type) {
        case FETCH_START:
            return { ...state, isLoading: true, error: null };
        case FETCH_SUCCESS:
            return { ...state, isLoading: false, equityData: action.payload };
        case FETCH_FAILURE:
            return { ...state, isLoading: false, error: action.error };
            case EDIT_EQUITY:
                return {
                    ...state,
                    equityData: state.equityData.map((equity) =>
                        equity.securityID === action.payload.securityID ? { ...equity, ...action.payload } : equity
                    ),
                    isModalOpen: false,
                    editData: { ...initialState.editData }, // Reset edit data after update
                };
        case DELETE_EQUITY:
            return {
                ...state,
                equityData: state.equityData.map(equity =>
                    equity.securityID === action.payload ? { ...equity, isActive: false } : equity
                ),
            };
        case SET_ACTIVE:
            return { ...state, active: action.payload };
        case SET_MODAL_OPEN:
            return { ...state, isModalOpen: true, editData: action.payload };
        case SET_MODAL_CLOSE:
            return { ...state, isModalOpen: false, editData: initialState.editData };
        case UPDATE_EDIT_DATA:
            return { ...state, editData: { ...state.editData, [action.payload.name]: action.payload.value } };
        default:
            return state;
    }
};

// Action Creators with Axios calls
export const fetchEquities = async (dispatch) => {
    dispatch({ type: FETCH_START });
    try {
        const response = await axios.get("https://localhost:7298/api/Equity");
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_FAILURE, error: error.message });
    }
};

export const editEquity = async (dispatch, editData) => {
    try {
        const response = await axios.put("https://localhost:7298/api/equity/edit", editData);
        if (response.status === 200) {
            dispatch({ type: EDIT_EQUITY, payload: editData });
            alert('Data Edited Successfully');
        }
    } catch (error) {
        alert("Error submitting data:", error);
    }
};

export const deleteEquity = async (dispatch, id) => {
    const confirmDelete = window.confirm('Do you want to set Equity as Inactive?');
    if (confirmDelete) {
        try {
            const response = await axios.delete(`https://localhost:7298/api/equity/${id}`);
            if (response.status === 200) {
                dispatch({ type: DELETE_EQUITY, payload: id });
                alert("Equity marked as Inactive");
            }
        } catch (error) {
            alert("Error:", error);
        }
    }
};

export const setActive = (dispatch, isActive) => {
    dispatch({ type: SET_ACTIVE, payload: isActive });
};

export const openModal = (dispatch, rowData) => {
    dispatch({ type: SET_MODAL_OPEN, payload: rowData });
};

export const closeModal = (dispatch) => {
    dispatch({ type: SET_MODAL_CLOSE });
};

export const updateEditData = (dispatch, name, value) => {
    dispatch({ type: UPDATE_EDIT_DATA, payload: { name, value } });
};
