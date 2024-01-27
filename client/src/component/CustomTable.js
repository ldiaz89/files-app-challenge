import React, { useEffect } from "react";
import { CustomLine } from "./CustomLine";
import { useSelector, useDispatch } from "react-redux";
import { getFileList, getFiles } from "../services";
import { setFiles, setFilesList, setIsLoadingFiles } from "../store/filesSlice";
import FilterDropdown from "./FilterDropdown";
import { FILE_HEXA_HEADER, FILE_NAME_HEADER, FILE_NUMBER_HEADER, FILE_TEXT_HEADER } from "../utils";

export const CustomTable = () => {
  const { filesList, files, isLoadingFiles } = useSelector(
    (state) => state.files
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getFileList().then((resp) => dispatch(setFilesList(resp.data.files)));
    getFiles().then((resp) => dispatch(setFiles(resp.data)));
  }, []);

  useEffect(() => {
    if (files && files.length === 0) {
      dispatch(setIsLoadingFiles(true));
    } else {
      dispatch(setIsLoadingFiles(false));
    }
  }, [files]);
  const showLoadingIndicator = () => {
  if (isLoadingFiles) {
    return <div>Loading....</div>;
  }
  return null;
};

  return (
    <div>
      <FilterDropdown data={filesList} />
      <div id="table-container" className="table-container">
        {showLoadingIndicator()}
        <table className="custom-table">
          <thead>
            <tr id="table-header" className="header-row">
              <th className="left-aligned">{FILE_NAME_HEADER}</th>
              <th className="left-aligned">{FILE_TEXT_HEADER}</th>
              <th className="left-aligned">{FILE_NUMBER_HEADER}</th>
              <th className="left-aligned">{FILE_HEXA_HEADER}</th>
            </tr>
          </thead>
          <tbody>
            {files?.map((file,index) => {
              return <CustomLine file={file.lines} fileName={file.file} key={`${index}-${file.file}`}/>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
