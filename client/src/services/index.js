import axiosInstance from "../../axiosConfig";

export const getFileList = async () => {
  
  const list = await axiosInstance.get("list");
  return list;
};

export const getFiles = async () =>{
  const files = await axiosInstance.get("data");
  return files.data
}

export const getFilesByName = async (fileName) =>{
  try{

  const file = await axiosInstance.get(`data?fileName=${fileName}`)
  console.log("file services", file)
  return file
  }catch(err){
    throw new Error(err)
  }
}