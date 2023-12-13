'use client'
import React from 'react';
import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons'
import classes from './setting.module.css'
import { Popover, Select, Switch } from 'antd';
import useTypingContext from '@/hooks/useTypingContext';

type ComponentProps = {
    reset: () => void
}
const Settings: React.FC<ComponentProps> = ({ reset }) => {
    const { updateDefaultTimer, updateDefaultSound } = useTypingContext();
    const settigns = (
        <div style={{ width: '200px', padding: '10px 0px' }}>
            <div>
                <label htmlFor='time' style={{ margin: "0px 2px" }}>
                    Time
                </label>
                <div style={{ margin: "5px 0px" }}>
                    <Select
                        id='time'
                        defaultValue={60}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                            updateDefaultTimer(e);
                            reset();
                        }}
                        options={[
                            { value: 60, label: '1 Minute' },
                            { value: 120, label: '2 Minute' },
                            { value: 180, label: '3 Minute' },
                            { value: 300, label: '5 Minute' },
                        ]}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor='time' style={{ margin: "0px 2px" }}>
                    Sound
                </label>
                <div style={{ marginTop: 5 }}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => updateDefaultSound()}
                        defaultValue={true}
                    />
                </div>
            </div>
        </div>
    )
    return (
        <div className={classes['setting-container']}>
            <Popover
                className='test'
                placement="leftTop"
                title="Settings"
                content={settigns}
                trigger="click"
            >
                <SettingOutlined style={{ fontSize: 22 }} />
            </Popover>
        </div>
    )
}

export default Settings;