import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getFiles, getFilesByName } from "../services";
import { setFiles } from "../store/filesSlice";
import { FILTER_BY_NAME_LABEL, SELECT_FILE_PLACEHOLDER } from "../utils";

const FilterDropdown = ({ data = [], onSelectionChange = () => {} }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectionChange = async (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All Files") {
    setSelectedOption(selectedValue);
      await getFiles().then((resp) => dispatch(setFiles(resp.data)));
      return
      
    }
    await getFilesByName(selectedValue).then((resp) => {
     if(resp.data.error){
        return alert(resp.data.error)
     }
      dispatch(setFiles([resp.data]));
       setSelectedOption(selectedValue);
    });

    onSelectionChange(selectedValue);
  };

  return (
    <div className="dropdown-wrapper">
      <label htmlFor="dropdown">{FILTER_BY_NAME_LABEL}</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectionChange}
      >
        <option value="">{SELECT_FILE_PLACEHOLDER}</option>
        {["All Files", ...data]?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
