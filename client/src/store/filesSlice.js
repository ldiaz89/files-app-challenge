import { createSlice } from "@reduxjs/toolkit";
export const filesSlice = createSlice({
  name: "files",
  initialState: { filesList: [], files:[], isLoadingFiles: false },
  reducers: {
    setFilesList(state, action) {
      return {
        ...state,
        filesList: action.payload,
      };
    },
    setFiles(state, action){
      return{
        ...state,
        files: action.payload
      }
    },
    setIsLoadingFiles(state, action){
      return{
        ...state,
        isLoadingFiles: action.payload
      }
    }
  },
});

export const { setFilesList, setFiles,setIsLoadingFiles } = filesSlice.actions;
export default filesSlice.reducer;
