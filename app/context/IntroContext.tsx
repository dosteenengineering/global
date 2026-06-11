"use client";
import { createContext, useContext } from "react";

export const IntroContext = createContext(false);
export const useIntroComplete = () => useContext(IntroContext);