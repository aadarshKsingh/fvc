"use client";
import { useEffect, useState } from "react";
import { File, Files } from "@/types/file";
import { motion } from "framer-motion";
import { Inter } from 'next/font/google';
import { Moon, Search, Sun } from 'lucide-react';
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
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
  return btoa(encodeURIComponent(url));
};

export default function Home() {
  const [files, setFiles] = useState<Files>({ files: [], account_id: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Always start with dark mode
    setDarkMode(true);

    fetch(`${process.env.NEXT_PUBLIC_GET_FILES}${process.env.NEXT_PUBLIC_ACCOUNT_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }, []);

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredFiles = files.files.filter((file) =>
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${inter.className}`}>
      <motion.button
        className="theme-toggle"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <motion.div
        className="title-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="title">
          <span className="title-text">FVC</span>
          <span className="title-accent">Index</span>
        </h1>
        <div className="title-underline"></div>
      </motion.div>

      <motion.div 
        className="search-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
      </motion.div>

      <motion.div 
        className="table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="glass-card">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Upload Time</th>
                <th>File Size</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file: File, index: number) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ backgroundColor: "var(--hover-bg)" }}
                  >
                    <td>
                      <a
                        href={`${process.env.NEXT_PUBLIC_WORKERS_URL}/${encodeUrl(file.file_url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-link"
                      >
                        {file.filename}
                      </a>
                    </td>
                    <td>{formatUploadTime(file.upload_time)}</td>
                    <td>{(file.file_size / 1024 / 1024).toFixed(2)} MB</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="empty-state">
                    {searchQuery ? "No files match your search" : "No files available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
