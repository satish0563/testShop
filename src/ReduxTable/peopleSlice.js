import { createSlice } from "@reduxjs/toolkit";

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    list: [
     
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
      { name: "New Email Recived", text: "New Email Recived",date:"April 13-12:05PM", id: nextID() },
    ],
    loading: false,
  },
  reducers: {
    add: (state, action) => {
     state.list.push(action.payload);
    },
    remove: (state, action) => {
      const removedIds = action.payload;
      state.list = state.list.filter((person) => {
        return !removedIds.includes(person.id);
      });
    },
    update: (state, action) => {
      state.list = state.list.map((person) => {
        if (person.id === action.payload.id) {
          return action.payload;
        }
        return person;
      });
    },
  },
});

export const { add, remove, update } = peopleSlice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    //dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectPeople = (state) => state.people.list;
export const selectLoading = (state) => state.people.loading;

export default peopleSlice.reducer;
