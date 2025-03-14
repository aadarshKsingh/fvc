"use client";
import { useEffect, useState } from "react";
import { File, Files } from "@/types/file";
import { motion } from "framer-motion";
import { VT323 } from "next/font/google";


const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const formatUploadTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const encodeUrl = (url: string) => {
  return btoa(encodeURIComponent(url)); // Proper encoding
};


export default function Home() {
  const [files, setFiles] = useState<Files>({ files: [], account_id: "" });
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_GET_FILES}${process.env.NEXT_PUBLIC_ACCOUNT_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }, []);

  const filteredFiles = files.files.filter((file) =>
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.h1
    className={vt323.className}
    style={{
      fontSize: "5rem",
      fontWeight: "bolder",
      color: "red",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    }}
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    FVC Index
    <div className="flex justify-center w-full mt-5">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "50%",
            padding: "10px 15px",
            fontSize: "1.2rem",
            border: "1px solid gray",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "white",
            textAlign: "center",
            outline: "none",
            transition: "border-color 0.3s ease-in-out",
          }}
          onClick={(e) => (e.currentTarget.style.borderColor = "#ff0000")}
        />
      </div>
  </motion.h1>

  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
  }}
>
  <div style={{ width: "80%", maxWidth: "900px" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "2px solid white",
        backgroundColor: "#222",
        color: "white",
        marginTop: "-45vh"
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#333", borderBottom: "2px solid white" }}>
          <th style={{ padding: "5px", border: "1px solid gray", textAlign: "center" }}>
            Filename
          </th>
          <th style={{ padding: "5px", border: "1px solid gray", textAlign: "center" }}>
            Upload Time
          </th>
          <th style={{ padding: "5px", border: "1px solid gray", textAlign: "center" }}>
            File Size
          </th>
        </tr>
      </thead>
      <tbody>
      {filteredFiles.map((file: File, index: number) => (
  <motion.tr
    key={index}
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    style={{
      backgroundColor: "#1a1a1a",
      borderBottom: "1px solid gray",
      transition: "background 0.3s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
  >
    {/* Filename as clickable link */}
    <td style={{ padding: "5px", textAlign: "center", border: "1px solid gray" }}>
      <a
        href={`${process.env.NEXT_PUBLIC_WORKERS_URL}/${encodeUrl(file.file_url)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "#FFFFFF",
          padding: "10px 20px",
          display: "inline-block",
          borderRadius: "5px",
          transition: "color 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}
      >
        {file.filename}
      </a>
    </td>

    {/* Upload Time */}
    <td style={{ padding: "12px", border: "1px solid gray", textAlign: "center" }}>
      {formatUploadTime(file.upload_time)}
    </td>

    {/* File Size */}
    <td style={{ padding: "12px", border: "1px solid gray", textAlign: "center" }}>
      {(file.file_size / 1024 / 1024).toFixed(2)} MB
    </td>
  </motion.tr>
))}

      </tbody>
    </table>
  </div>
</div>








    </div>
  );
}
