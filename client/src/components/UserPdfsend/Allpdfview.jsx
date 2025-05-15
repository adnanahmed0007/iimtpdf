  import React, { useState } from 'react';
import axios from "axios";

const Allpdfview = () => {
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [FileNampdfuser, setFilenameUSEr] = useState("");
  const [array, setArray] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(department && branch && year && FileNampdfuser) {
        const datagetback = await axios.post("/user/pdf/get/departemnt/branch/year/pdf", {
          department: department.trim().toLowerCase(),
          branch: branch.trim().toLowerCase(),
          year,
          FileNampdfuser: FileNampdfuser.trim().toLowerCase(),
        }, { withCredentials: true });

        if (datagetback && datagetback.status === 200) {
          alert(datagetback.data.message);
          setArray(datagetback.data.dataget);
        }
      } else if (department && FileNampdfuser) {
        const datagetback = await axios.post("/user/pdf/get/departemnt/branch/year/pdf", {
          department: department.trim().toLowerCase(),
          FileNampdfuser: FileNampdfuser.trim().toLowerCase(),
        }, { withCredentials: true });

        if (datagetback && datagetback.status === 200) {
          alert(datagetback.data.message);
          setArray(datagetback.data.databackget);
        }
      } else if (department && branch && FileNampdfuser) {
        const datagetback = await axios.post("/user/pdf/get/departemnt/branch/year/pdf", {
          department: department.trim().toLowerCase(),
          FileNampdfuser: FileNampdfuser.trim().toLowerCase(),
          branch: branch.trim().toLowerCase(),
        }, { withCredentials: true });

        if (datagetback && datagetback.status === 200) {
          alert(datagetback.data.message);
          setArray(datagetback.data.datagetback);
        }
      } else {
        alert("Enter all the credentials");
      }
    } catch (e) {
      alert("No PDF is there");
      console.log(e);
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
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Search PDFs by Department, File Name (Optional: Branch & Year)
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-red-600">Department*</label>
            <input
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              required
              placeholder="e.g., Science"
              className="p-2 border border-red-400 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Branch (optional)</label>
            <input
              onChange={(e) => setBranch(e.target.value)}
              type="text"
              placeholder="e.g., Biology"
              className="p-2 border border-gray-300 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Year (optional)</label>
            <input
              onChange={(e) => setYear(e.target.value)}
              type="number"
              placeholder="e.g., 2025"
              className="p-2 border border-gray-300 rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-blue-600">File Name*</label>
            <input
              onChange={(e) => setFilenameUSEr(e.target.value)}
              type="text"
              required
              placeholder="e.g., Lecture1.pdf"
              className="p-2 border border-blue-400 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-6"
          >
            Submit
          </button>
        </form>
      </div>

      {array.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md h-[400px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Matching PDF Records</h3>
          {array.map((value, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
              <p><span className="font-semibold">Student Name:</span> {value.Student_Name}</p>
              <p><span className="font-semibold">File Name:</span> {value.FileNampdfuser}</p>
              <p><span className="font-semibold">Branch:</span> {value.branch}</p>
              <p><span className="font-semibold">Department:</span> {value.department}</p>
              <p><span className="font-semibold">Year:</span> {value.year}</p>

              {value.pdfFile && (
                <button onClick={() => handledownload(value.FileNampdfuser)} className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Download PDF ⬇️
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allpdfview;
