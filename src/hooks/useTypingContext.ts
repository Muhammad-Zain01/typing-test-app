import { useContext } from "react";
import { TypingContext } from "@/context/typing-context";
const useTypingContext = () => useContext(TypingContext)
export default useTypingContext;