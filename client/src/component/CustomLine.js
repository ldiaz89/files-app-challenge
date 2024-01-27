import React from "react";

export const CustomLine = ({ file, fileName }) => {
  return (
    <>
      {file?.map((data, index) => (
        <tr key={`${index}-{fileName}-${data.text}`}>
          <th className="data-row">{fileName}</th>
          <th className="data-row">{data.text}</th>
          <th className="data-row">{data.number}</th>
          <th className="data-row">{data.hex}</th>
        </tr>
      ))}
    </>
  );
};
