 import React, { useState } from 'react';
import axios from 'axios';

const Departmentpdf = () => {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState(0);
  const [arraydata, arraysetdata] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const databackget = await axios.post("/user/pdf/get/department/pdf", {
        department:department.trim().toLowerCase(),
        year,
      }, { withCredentials: true });

      if (databackget && databackget.status === 200) {
        alert(databackget.data.message);
        console.log(databackget.data.finddata)
        arraysetdata(databackget.data.finddata);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      }
    }
  }
  async function handledownload(pdfName) {
  try {
    
    const encodedPdfName = encodeURIComponent(pdfName);

   
    const response = await axios.get(
      `/user/pdf/get/downloadpdf/${encodedPdfName}`,
      {
        withCredentials: true,
        responseType: "blob",  
      }
    );

  
    const contentType = response.headers['content-type'];
    if (contentType !== 'application/pdf') {
      throw new Error("The file is not a valid PDF.");
    }

 
    const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));

    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", pdfName);  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

 
    window.URL.revokeObjectURL(url);

    console.log("Download successful", response);
  } catch (error) {
    console.error("Download failed", error);
    alert("Failed to download PDF. Please try again.");
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Search PDFs by Department & Year</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="department" className="block font-medium text-gray-700">Department:</label>
            <input
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter the department"
              required
            />
          </div>
          

          <div>
            <label htmlFor="year" className="block font-medium text-gray-700">Year:</label>
            <input
              onChange={(e) => setYear(e.target.value)}
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter the year"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {arraydata.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md h-[400px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Available Documents</h3>
          {arraydata.map((value, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                     <p><span className="font-semibold">Stuendt name:</span> {value.Student_Name}</p>
              <p><span className="font-semibold">File Name:</span> {value.FileNampdfuser}</p>
              <p><span className="font-semibold">Branch:</span> {value.branch}</p>
              <p><span className="font-semibold">Department:</span> {value.department}</p>
              <p><span className="font-semibold">Year:</span> {value.year}</p>
         

              {value.pdfFile && (
                 <button onClick={()=>handledownload(value.FileNampdfuser)} className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                     Download pdf  ⬇️ 
                 </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Departmentpdf;
