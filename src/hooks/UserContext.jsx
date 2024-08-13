"use client";

import React, { useState } from "react";
import { createContext } from "react";

const Context = createContext();

export default function UserContext({ children }) {
  const [user, setUser] = useState();

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

export { Context };
