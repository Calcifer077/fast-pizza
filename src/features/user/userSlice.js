import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

/* 
async function fetchAddress() {
// 1) We get the user's geolocation position
const positionObj = await getPosition();
const position = {
  latitude: positionObj.coords.latitude,
  longitude: positionObj.coords.longitude,
};

// 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
const addressObj = await getAddress(position);
const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

// 3) Then we return an object with the data that we are interested in
return { position, address };
}
*/

// Below is a way of creating a async function using 'Thunk' which recieves two arguments
// action name, an async function that will return the payload for reducer
// this 'acton name' will not be used by us but is required by redux. the async function is the code that will be executed as soon the action is dispatched.
// createAsyncThunk will produce three additional action types:
// 1. Depending promise state
// 2. Fulfilled state
// 3. Rejected state
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // Payload of the Fulfilled state
    return { position, address };
  },
);
const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // action.payload comes from the above function of fetchAddress.
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        // Whenever there is a error 'rejected' a error string is attached to the action object.
        state.status = 'error';
        // state.error = action.error.message;
        state.error =
          'There was a problem getting your address. Make sure to fill this field';
      }),
});
export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state) => state.user.username;
