'use client'
import React from "react"
import { createContext, useReducer } from "react"

const TYPES = {
    paragraph: "SET_PARAGRAPH",
    index: "SET_INDEX",
    indexIncrement: "INCREMENT_INDEX",
    wpm: "SET_WPM",
    cpm: "SET_CPM",
    accuracy: "SET_ACCURACY",
    status: "SET_STATUS",
    timer: "SET_TIMER",
    timerIncrement: "INCREMENT_TIMER",
    resultModal: "SET_RESULT_MODAL"
}

type ContextState = {
    currentParagraph: string[] | [];
    currentIndex: number;
    wpm: number;
    cpm: number;
    accuracy: number;
    currentStatus: number;
    currentTimer: number;
    resultModal: false;
    setCurrentParagraph?: (value: string[] | []) => void,
    setCurrentIndex?: (value: number) => void,
    setWpm?: (value: number) => void,
    setCpm?: (value: number) => void,
    setAccuracy?: (value: number) => void,
    setCurrentStatus?: (value: number) => void,
    setCurrentTimer?: (value: number) => void,
    setResultModal?: (value: boolean) => void,
}

const initialState: ContextState = {
    currentParagraph: [],
    currentIndex: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    currentStatus: 0,
    currentTimer: 0,
    resultModal: false,
}

const defaultValue = {
    ...initialState,
    setCurrentParagraph: (value: string[] | []) => { },
    setCurrentIndex: (value: number) => { },
    setWpm: (value: number) => { },
    setCpm: (value: number) => { },
    setAccuracy: (value: number) => { },
    setCurrentStatus: (value: number) => { },
    setCurrentTimer: (value: number) => { },
    setResultModal: (value: boolean) => { },
    incrementIndex: () => { },
    incrementTimer: () => { },
}

const createAction = (type: string, payload: any) => ({ type, payload })
const TypingReducer = (state, action) => {
    switch (action.type) {
        case TYPES.paragraph:
            return {
                ...state,
                currentParagraph: action.payload
            }
        case TYPES.index:
            return {
                ...state,
                currentIndex: action.payload
            }
        case TYPES.indexIncrement:
            return {
                ...state,
                currentIndex: state.currentIndex + 1
            }
        case TYPES.wpm:
            return {
                ...state,
                wpm: action.payload
            }
        case TYPES.cpm:
            return {
                ...state,
                cpm: action.payload
            }
        case TYPES.accuracy:
            return {
                ...state,
                accuracy: action.payload
            }
        case TYPES.status:
            return {
                ...state,
                currentStatus: action.payload
            }
        case TYPES.timer:
            return {
                ...state,
                currentTimer: action.payload
            }
        case TYPES.timerIncrement:
            return {
                ...state,
                currentTimer: state.currentTimer + 1
            }
        case TYPES.resultModal:
            return {
                ...state,
                resultModal: action.payload
            }
    }
}

export const TypingContext = createContext(defaultValue);
export const TypingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TypingReducer, defaultValue);

    const setCurrentParagraph = (value) => { dispatch(createAction(TYPES.paragraph, value)) }
    const setCurrentIndex = (value: number) => { dispatch(createAction(TYPES.index, value)) }
    const setWpm = (value: number) => { dispatch(createAction(TYPES.wpm, value)) }
    const setCpm = (value: number) => { dispatch(createAction(TYPES.cpm, value)) }
    const setAccuracy = (value: number) => { dispatch(createAction(TYPES.accuracy, value)) }
    const setCurrentStatus = (value: number) => { dispatch(createAction(TYPES.status, value)) }
    const setCurrentTimer = (value: number) => { dispatch(createAction(TYPES.timer, value)) }
    const setResultModal = (value: boolean) => { dispatch(createAction(TYPES.resultModal, value)) }
    const incrementIndex = () => { dispatch(createAction(TYPES.indexIncrement, null)) }
    const incrementTimer = () => { dispatch(createAction(TYPES.timerIncrement, null)) }

    const value = {
        ...state,
        setCurrentParagraph,
        setCurrentIndex,
        setWpm,
        setCpm,
        setAccuracy,
        setCurrentStatus,
        setCurrentTimer,
        setResultModal,
        incrementIndex,
        incrementTimer
    }
    return (
        <TypingContext.Provider value={value}>
            {children}
        </TypingContext.Provider>
    )
}