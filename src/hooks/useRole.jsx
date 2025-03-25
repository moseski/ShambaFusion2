// import { createContext, useContext, useState } from "react";

// const RoleContext = createContext();

// export function useRole() {
//     return useContext(RoleContext);
// }

// export function RoleProvider({ children }) {
//     const [role, setRole] = useState(null);

//     const changeRole = (newRole) => {
//         setRole(newRole);
//     };

//     return (
//         <RoleContext.Provider value={{ role, changeRole }}>
//             {children}
//         </RoleContext.Provider>
//     );
// }
"use client"

import { useState, createContext, useContext } from "react"

const RoleContext = createContext()

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("")

  const changeRole = (newRole) => {
    setRole(newRole)
  }

  return <RoleContext.Provider value={{ role, changeRole }}>{children}</RoleContext.Provider>
}

