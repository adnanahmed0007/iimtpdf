  import React, { useState } from 'react';
import axios from 'axios';

const Sendpdf = () => {
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState(0);
  const [branch, setBranch] = useState('');
  const [FileNampdfuser, setFileNameodf] = useState('');
  const [pdfFile, setfile] = useState(null);
  const [dataBack, getDataback] = useState('');
  const [Student_Name, SetStudent_Name] = useState('');

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('department', department.trim().toLowerCase());
      formdata.append('year', year);
      formdata.append('branch', branch.trim().toLowerCase());
      formdata.append('FileNampdfuser', FileNampdfuser.trim().toLowerCase());
      formdata.append('pdfFile', pdfFile);
      formdata.append('Student_Name', Student_Name);

      const senddata = await axios.post(
        '/user/pdf/upload/user/pdf',
        formdata,
        { withCredentials: true }
      );
      console.log(senddata);
      if (senddata && senddata.status === 200) {
        alert(senddata.data.message);
        getDataback(senddata.data.savedData);
        console.log(senddata.data.savedData);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log(e);
        alert(e.response.data.message);
      }
    }
  }

  async function handleDownload(pdfName) {
    try {
      const encodedPdfName = encodeURIComponent(pdfName);

      const response = await axios.get(
        `/user/pdf/get/downloadpdf/${encodedPdfName}`,
        {
          withCredentials: true,
          responseType: "blob",  // We expect the file as a blob
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 shadow-sm flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Upload Your PDF</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student Name</label>
            <input
              onChange={(e) => SetStudent_Name(e.target.value)}
              type="text"
              name="Student_Name"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              name="department"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              onChange={(e) => setYear(e.target.value)}
              type="number"
              name="year"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              onChange={(e) => setBranch(e.target.value)}
              type="text"
              name="branch"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">File Name</label>
            <input
              onChange={(e) => setFileNameodf(e.target.value)}
              type="text"
              name="filenameuserpdf"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select PDF</label>
            <input
              onChange={(e) => setfile(e.target.files[0])}
              type="file"
              name="file"
              accept="application/pdf"
              required
              className="mt-1 w-full text-sm text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Upload PDF
          </button>
        </form>

        {dataBack && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">PDF Uploaded Successfully</h3>
            <button
              onClick={() => handleDownload(dataBack.FileNampdfuser)}
              className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg py-3 px-6 rounded-full shadow-md transition transform hover:scale-105"
            >
              Download PDF ⬇️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sendpdf;