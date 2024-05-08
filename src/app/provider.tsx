"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer position="top-right" theme="light" autoClose={2000} />
      {children}
    </>
  );
};

export default Provider;
