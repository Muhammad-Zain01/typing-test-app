'use client'
import React, { useState, useEffect } from 'react';
import {
    CheckOutlined,
    CloseOutlined,
    SettingOutlined,
    FontSizeOutlined,
    BgColorsOutlined,
    SoundOutlined,
    ClockCircleOutlined,
    BulbOutlined,
    HighlightOutlined,
    ControlOutlined,
    SettingFilled,
    CloseCircleOutlined
} from '@ant-design/icons'
import classes from './setting.module.css'
import { Modal, Select, Switch, Slider, Divider, Tabs, Radio, Button } from 'antd';
import useTypingContext from '@/hooks/useTypingContext';
import { useTheme } from '@/context/theme-context';
import { loadSettings, saveSettings, AppSettings, defaultSettings, applySettings } from '@/utils/localStorage';

type ComponentProps = {
    reset: () => void
}

const Settings: React.FC<ComponentProps> = ({ reset }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { updateDefaultTimer, updateDefaultSound } = useTypingContext();
    const { theme, toggleTheme } = useTheme();
    const [fontSize, setFontSize] = useState(defaultSettings.fontSize);
    const [fontFamily, setFontFamily] = useState(defaultSettings.fontFamily);
    const [showWpmRealtime, setShowWpmRealtime] = useState(defaultSettings.showWpmRealtime);
    const [showAccuracyRealtime, setShowAccuracyRealtime] = useState(defaultSettings.showAccuracyRealtime);
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    useEffect(() => {
        const savedSettings = loadSettings();

        setSettings(savedSettings);
        setFontSize(savedSettings.fontSize);
        setFontFamily(savedSettings.fontFamily);
        setShowWpmRealtime(savedSettings.showWpmRealtime);
        setShowAccuracyRealtime(savedSettings.showAccuracyRealtime);

        // Apply saved settings
        applySettings(savedSettings);

        // @ts-ignore
        updateDefaultTimer(savedSettings.defaultTimer);
        if (savedSettings?.defaultSound !== undefined) {
            if (savedSettings?.defaultSound !== defaultSettings.defaultSound) {
                // @ts-ignore
                updateDefaultSound();
            }
        }
        // eslint-disable-next-line
    }, []);

    // Autosave settings whenever they change
    useEffect(() => {
        // @ts-ignore
        const updatedSettings: AppSettings = {
            fontSize,
            fontFamily,
            defaultTimer: settings.defaultTimer,
            defaultSound: settings.defaultSound,
            showWpmRealtime,
            showAccuracyRealtime,
            theme
        };

        saveSettings(updatedSettings);
    }, [fontSize, fontFamily, settings.defaultTimer, settings.defaultSound, showWpmRealtime, showAccuracyRealtime, theme]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const applyFontSize = (size: number) => {
        setFontSize(size);
        document.documentElement.style.setProperty('--typing-font-size', `${size}px`);
    };

    const applyFontFamily = (font: string) => {
        setFontFamily(font);
        let fontClass = '';

        switch (font) {
            case 'roboto-mono':
                fontClass = "'Roboto Mono', monospace";
                break;
            case 'jetbrains-mono':
                fontClass = "'JetBrains Mono', monospace";
                break;
            case 'inter':
                fontClass = "'Inter', sans-serif";
                break;
            default:
                fontClass = "'Roboto Mono', monospace";
        }

        document.documentElement.style.setProperty('--typing-font-family', fontClass);
    };

    const handleTimerChange = (value: number) => {
        // @ts-ignore
        updateDefaultTimer(value);
        setSettings(prev => ({
            ...prev,
            defaultTimer: value
        }));
        reset();
    };

    const handleSoundToggle = () => {
        // @ts-ignore
        updateDefaultSound();
        setSettings(prev => ({
            ...prev,
            defaultSound: !prev.defaultSound
        }));
    };

    const items = [
        {
            key: '1',
            label: (
                <span className={classes.tabLabel}>
                    <ClockCircleOutlined />
                    <span>Timer</span>
                </span>
            ),
            children: (
                <div className={classes.settingSection}>
                    <h3><ClockCircleOutlined /> Test Duration</h3>
                    <p>Select how long you want the typing test to last</p>
                    <Select
                        value={settings.defaultTimer}
                        style={{ width: '100%' }}
                        onChange={handleTimerChange}
                        options={[
                            { value: 30, label: '30 Seconds' },
                            { value: 60, label: '1 Minute' },
                            { value: 120, label: '2 Minutes' },
                            { value: 180, label: '3 Minutes' },
                            { value: 300, label: '5 Minutes' },
                        ]}
                    />

                    <div className={classes.settingInfo}>
                        <div className={classes.infoIcon}>i</div>
                        <p>The timer will start automatically when you begin typing.</p>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span className={classes.tabLabel}>
                    <FontSizeOutlined />
                    <span>Typography</span>
                </span>
            ),
            children: (
                <div className={classes.settingSection}>
                    <h3><FontSizeOutlined /> Font Size</h3>
                    <p>Adjust the size of the text in the typing area</p>
                    <Slider
                        min={18}
                        max={36}
                        value={fontSize}
                        onChange={applyFontSize}
                        marks={{
                            18: 'Small',
                            28: 'Medium',
                            36: 'Large'
                        }}
                    />

                    <Divider className={classes.divider} />

                    <h3><HighlightOutlined /> Font Family</h3>
                    <p>Choose a font for the typing test</p>
                    <Radio.Group
                        onChange={(e) => applyFontFamily(e.target.value)}
                        value={fontFamily}
                        className={classes.fontSelector}
                    >
                        <Radio.Button value="roboto-mono" className={classes.robotoMono}>
                            Roboto Mono
                        </Radio.Button>
                        <Radio.Button value="jetbrains-mono" className={classes.jetbrainsMono}>
                            JetBrains Mono
                        </Radio.Button>
                        <Radio.Button value="inter" className={classes.inter}>
                            Inter
                        </Radio.Button>
                    </Radio.Group>

                    <div className={classes.fontPreview} style={{ fontFamily: `var(--typing-font-family)` }}>
                        <p>The quick brown fox jumps over the lazy dog</p>
                        <p>1234567890 !@#$%^&*()</p>
                    </div>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <span className={classes.tabLabel}>
                    <SoundOutlined />
                    <span>Sound</span>
                </span>
            ),
            children: (
                <div className={classes.settingSection}>
                    <h3><SoundOutlined /> Keyboard Sounds</h3>
                    <p>Toggle keyboard typing sounds</p>
                    <div className={classes.toggleOption}>
                        <span>Typing Sound</span>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            onChange={handleSoundToggle}
                            checked={settings.defaultSound}
                            className={classes.toggleSwitch}
                        />
                    </div>

                    <div className={classes.toggleOption}>
                        <span>Error Sound</span>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={true}
                            className={classes.toggleSwitch}
                        />
                    </div>

                    <div className={classes.toggleOption}>
                        <span>Completion Sound</span>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={true}
                            className={classes.toggleSwitch}
                        />
                    </div>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <span className={classes.tabLabel}>
                    <BgColorsOutlined />
                    <span>Theme</span>
                </span>
            ),
            children: (
                <div className={classes.settingSection}>
                    <h3><BulbOutlined /> Color Theme</h3>
                    <p>Choose between light and dark mode</p>
                    <div className={classes.themeSelector}>
                        <div
                            className={`${classes.themeOption} ${theme === 'light' ? classes.activeTheme : ''}`}
                            onClick={() => theme === 'dark' && toggleTheme()}
                        >
                            <div className={classes.themePreview} data-theme="light">
                                <div className={classes.previewHeader}></div>
                                <div className={classes.previewContent}>
                                    <div className={classes.previewLine}></div>
                                    <div className={classes.previewLine}></div>
                                </div>
                            </div>
                            <span>Light</span>
                        </div>

                        <div
                            className={`${classes.themeOption} ${theme === 'dark' ? classes.activeTheme : ''}`}
                            onClick={() => theme === 'light' && toggleTheme()}
                        >
                            <div className={classes.themePreview} data-theme="dark">
                                <div className={classes.previewHeader}></div>
                                <div className={classes.previewContent}>
                                    <div className={classes.previewLine}></div>
                                    <div className={classes.previewLine}></div>
                                </div>
                            </div>
                            <span>Dark</span>
                        </div>
                    </div>

                    <Divider className={classes.divider} />

                    <h3><ControlOutlined /> Additional Controls</h3>
                    <p>Configure additional preferences</p>
                    <div className={classes.toggleOption}>
                        <span>Show WPM in Real-time</span>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={showWpmRealtime}
                            onChange={(checked) => setShowWpmRealtime(checked)}
                            className={classes.toggleSwitch}
                        />
                    </div>
                    <div className={classes.toggleOption}>
                        <span>Show Accuracy in Real-time</span>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={showAccuracyRealtime}
                            onChange={(checked) => setShowAccuracyRealtime(checked)}
                            className={classes.toggleSwitch}
                        />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className={classes['setting-container']}>
            <button className={classes['setting-button']} onClick={showModal}>
                <SettingOutlined style={{ fontSize: 20 }} />
            </button>

            <Modal
                title={
                    <div className={classes.modalTitle}>
                        <SettingFilled /> Settings
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                closeIcon={<CloseCircleOutlined />}
                footer={null}
                width={650}
                className={classes.settingsModal}
                centered
            >
                <div className={classes.autoSaveIndicator}>
                    <CheckOutlined /> Settings are automatically saved
                </div>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    className={classes.settingsTabs}
                />
            </Modal>
        </div>
    )
}

export default Settings;