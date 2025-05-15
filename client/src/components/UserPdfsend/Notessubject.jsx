 import React, { useState } from 'react';
import axios from "axios";

const Notessubject = () => {
  const [FileNampdfuser, setfilename] = useState("");
  const [arrayset, setBackarray] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (FileNampdfuser) {
        const datagetback = await axios.post("/user/pdf/get/filename/pdf", {
          FileNampdfuser
        }, { withCredentials: true });

        if (datagetback && datagetback.status === 200) {
          alert(datagetback.data.message);
          setBackarray(datagetback.data.finddata);
        }
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 400) {
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
      link.setAttribute("download", pdfName); // Use the file name for download
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
        <h2 className="text-2xl font-bold mb-4 text-center">Search Notes by Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject Name:</label>
            <input
              onChange={(e) => setfilename(e.target.value)}
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter subject name"
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

      {arrayset.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md h-[400px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Available Notes</h3>
          {arrayset.map((value, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
              <p><span className="font-semibold">Student Name:</span> {value.Student_Name}</p>
              <p><span className="font-semibold">File Name:</span> {value.FileNampdfuser}</p>
              <p><span className="font-semibold">Branch:</span> {value.branch}</p>
              <p><span className="font-semibold">Department:</span> {value.department}</p>
              <p><span className="font-semibold">Year:</span> {value.year}</p>

              {value.pdfFile && (
                <button
                  onClick={() => handleDownload(value.FileNampdfuser)} // Trigger download when clicked
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-green-700"
                >
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

export default Notessubject;

