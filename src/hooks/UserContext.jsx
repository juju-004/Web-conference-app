"use client";

import React, { useState } from "react";
import { createContext } from "react";

const Context = createContext(null);

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

export { Context };
