import { createContext, useContext, useState } from "react";

// Create the context
const LoadingContext = createContext();

// Context Provider Component
export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ prompt, setPrompt] = useState('javascript');


    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, prompt, setPrompt }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook to use the context
export const useLoading = () => useContext(LoadingContext);
