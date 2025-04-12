// Utility functions for handling localStorage operations

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Settings interface
export interface AppSettings {
  fontSize: number;
  fontFamily: string;
  timerDuration: number;
  sound: boolean;
  showWpmRealtime: boolean;
  showAccuracyRealtime: boolean;
  theme?: string;
  defaultTimer?: any;
  defaultSound?: any;
}

// Default settings
export const defaultSettings: AppSettings = {
  fontSize: 28,
  fontFamily: "roboto-mono",
  timerDuration: 60,
  sound: true,
  defaultSound: true,
  theme: 'light',
  showWpmRealtime: true,
  showAccuracyRealtime: true,
};

// Save settings to localStorage
export const saveSettings = (settings: AppSettings): void => {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem("typingTestSettings", JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings to localStorage:", error);
  }
};

// Load settings from localStorage
export const loadSettings = (): AppSettings => {
  if (!isLocalStorageAvailable()) return defaultSettings;

  try {
    const savedSettings = localStorage.getItem("typingTestSettings");
    if (savedSettings) {
      // Handle property name changes for backward compatibility
      const parsedSettings = JSON.parse(savedSettings);

      // Map old property names to new ones if they exist
      if (
        parsedSettings.defaultTimer !== undefined &&
        parsedSettings.timerDuration === undefined
      ) {
        parsedSettings.timerDuration = parsedSettings.defaultTimer;
        delete parsedSettings.defaultTimer;
      }

      if (
        parsedSettings.defaultSound !== undefined &&
        parsedSettings.sound === undefined
      ) {
        parsedSettings.sound = parsedSettings.defaultSound;
        delete parsedSettings.defaultSound;
      }

      return { ...defaultSettings, ...parsedSettings };
    }
  } catch (error) {
    console.error("Error loading settings from localStorage:", error);
  }

  return defaultSettings;
};

// Update a single setting
export const updateSetting = <K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
): void => {
  if (!isLocalStorageAvailable()) return;

  try {
    const currentSettings = loadSettings();
    const updatedSettings = { ...currentSettings, [key]: value };

    saveSettings(updatedSettings);
  } catch (error) {
    console.error(`Error updating setting ${key}:`, error);
  }
};

// Apply saved settings to the DOM
export const applySettings = (settings: AppSettings): void => {
  // Apply font size
  document.documentElement.style.setProperty(
    "--typing-font-size",
    `${settings.fontSize}px`
  );

  // Apply font family
  let fontClass = "";
  switch (settings.fontFamily) {
    case "roboto-mono":
      fontClass = "'Roboto Mono', monospace";
      break;
    case "jetbrains-mono":
      fontClass = "'JetBrains Mono', monospace";
      break;
    case "inter":
      fontClass = "'Inter', sans-serif";
      break;
    default:
      fontClass = "'Roboto Mono', monospace";
  }
  document.documentElement.style.setProperty("--typing-font-family", fontClass);

  // Apply theme if it exists
  if (settings.theme) {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }
};
