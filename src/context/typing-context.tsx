'use client'
import React, { Reducer } from "react"
import { createContext, useReducer, useEffect } from "react"
import { loadSettings } from "@/utils/localStorage"

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
    resultModal: "SET_RESULT_MODAL",
    updateDefaultTimer: "SET_UPDATE_DEFAULT_TIMER",
    updateSound: "SET_UPDATE_SOUND",
}

type ContextState = {
    currentParagraph: string[];
    currentIndex: number;
    wpm: number;
    cpm: number;
    accuracy: number;
    currentStatus: number;
    currentTimer: number;
    resultModal: boolean;
    defaultTimer: number;
    defaultSound: boolean;
    setCurrentParagraph?: (value: string[]) => void;
    setCurrentIndex?: (value: number) => void;
    setWpm?: (value: number) => void;
    setCpm?: (value: number) => void;
    setAccuracy?: (value: number) => void;
    incrementIndex?: () => void;
    setCurrentStatus?: (value: number) => void;
    setCurrentTimer?: (value: number) => void;
    updateDefaultTimer?: (value: number) => void;
    updateDefaultSound?: () => void;
    setResultModal?: (value: boolean) => void;
    incrementTimer?: () => void;
}

type Action = {
    type: string;
    payload: any;
}

// Initialize with default values
const initialState: ContextState = {
    currentParagraph: [],
    currentIndex: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    currentStatus: 0,
    currentTimer: 0,
    resultModal: false,
    defaultTimer: 60,
    defaultSound: true
}

const defaultValue: ContextState = {
    ...initialState,
    setCurrentParagraph: (value: string[]) => { },
    setCurrentIndex: (value: number) => { },
    setWpm: (value: number) => { },
    setCpm: (value: number) => { },
    setAccuracy: (value: number) => { },
    setCurrentStatus: (value: number) => { },
    setCurrentTimer: (value: number) => { },
    setResultModal: (value: boolean) => { },
    incrementIndex: () => { },
    incrementTimer: () => { },
    updateDefaultTimer: (timer: number) => { },
    updateDefaultSound: () => { }
}

const createAction = (type: string, payload: any): Action => ({ type, payload })

const TypingReducer: Reducer<ContextState, Action> = (state, action) => {
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
        case TYPES.updateDefaultTimer:
            return {
                ...state,
                defaultTimer: action.payload
            }
        case TYPES.updateSound:
            return {
                ...state,
                defaultSound: !state.defaultSound
            }
        default:
            return state;
    }
}

export const TypingContext = createContext<ContextState>(defaultValue);

type Provider = {
    children: React.ReactNode
}

export const TypingProvider: React.FC<Provider> = ({ children }) => {
    const [state, dispatch] = useReducer(TypingReducer, initialState);

    // Load saved settings on initial render
    useEffect(() => {
        const savedSettings = loadSettings();
        if (savedSettings) {
            if (savedSettings.timerDuration) {
                dispatch(createAction(TYPES.updateDefaultTimer, savedSettings.timerDuration));
            }
            if (typeof savedSettings.sound !== 'undefined') {
                // Only update if the value is different from the current state
                if (savedSettings.sound !== state.defaultSound) {
                    dispatch(createAction(TYPES.updateSound, null));
                }
            }
        }
    }, [state.defaultSound]);

    const setCurrentParagraph = (value: string[]) => { dispatch(createAction(TYPES.paragraph, value)) }
    const setCurrentIndex = (value: number) => { dispatch(createAction(TYPES.index, value)) }
    const setWpm = (value: number) => { dispatch(createAction(TYPES.wpm, value)) }
    const setCpm = (value: number) => { dispatch(createAction(TYPES.cpm, value)) }
    const setAccuracy = (value: number) => { dispatch(createAction(TYPES.accuracy, value)) }
    const setCurrentStatus = (value: number) => { dispatch(createAction(TYPES.status, value)) }
    const setCurrentTimer = (value: number) => { dispatch(createAction(TYPES.timer, value)) }
    const setResultModal = (value: boolean) => { dispatch(createAction(TYPES.resultModal, value)) }
    const incrementIndex = () => { dispatch(createAction(TYPES.indexIncrement, null)) }
    const incrementTimer = () => { dispatch(createAction(TYPES.timerIncrement, null)) }
    const updateDefaultTimer = (timer: number) => { dispatch(createAction(TYPES.updateDefaultTimer, timer)) }
    const updateDefaultSound = () => { dispatch(createAction(TYPES.updateSound, null)) }
    
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
        incrementTimer,
        updateDefaultTimer,
        updateDefaultSound
    }
    
    return (
        <TypingContext.Provider value={value}>
            {children}
        </TypingContext.Provider>
    )
}