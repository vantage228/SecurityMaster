// BondSlice.js
import axios from 'axios';

// Initial state for the Bond slice
export const initialState = {
  bondData: [],
  editBondData: {
    securityID: "",
    securityDescription: "",
    securityName: "",
    coupon: "",
    maturityDate: "",
    isCallable: "",
    penultimateCouponDate: "",
    formPFCreditRating: "",
    askPrice: "",
    bidPrice: "",
    isActive: ""
  },
  isModalOpen: false,
  loading: false 
};

// Action types
const FETCH_BONDS = 'FETCH_BONDS';
const SET_LOADING = 'SET_LOADING';
const SET_EDIT_BOND = 'SET_EDIT_BOND';
const CLOSE_MODAL = 'CLOSE_MODAL';

// Reducer function
export const bondReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case FETCH_BONDS:
      return { ...state, bondData: action.payload };
    case SET_EDIT_BOND:
      return { ...state, editBondData: action.payload, isModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, isModalOpen: false, editBondData: initialState.editBondData };
    default:
      return state;
  }
};

// Action creators
export const fetchBonds = async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get("https://localhost:7298/api/Bond");
    dispatch({ type: FETCH_BONDS, payload: response.data });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (error) {
    alert('Error fetching bonds: ' + error);
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const setEditBond = (dispatch, bond) => {
  dispatch({ type: SET_EDIT_BOND, payload: bond });
};

export const closeModal = (dispatch) => {
  dispatch({ type: CLOSE_MODAL });
};

export const editBond = async (dispatch, editBondData) => {
  try {
    const response = await axios.put("https://localhost:7298/api/Bond/edit", editBondData);
    if (response.status === 200 || response.status === 201) {
      alert('Data Edited Successfully');
      fetchBonds(dispatch);
      closeModal(dispatch);
    }
  } catch (error) {
    alert('Error editing bond: ' + error.message);
  }
};

export const deleteBond = async (dispatch, id) => {
  const confirmDelete = window.confirm('Do you want to set Bond as Inactive?');
  if (confirmDelete) {
    try {
      const response = await axios.delete(`https://localhost:7298/api/Bond/${id}`);
      if (response.status === 200) {
        alert("Bond marked as Inactive");
        fetchBonds(dispatch);
      }
    } catch (error) {
      alert("Error deleting bond: " + error.message);
    }
  }
};
