import { SettingOutlined } from '@ant-design/icons'
import classes from './setting.module.css'
import { Popover } from 'antd';
const Settings = () => {
    const settigns = (
        <div>
            Settings
        </div>
    )
    return (
        <div className={classes['setting-container']}>
            <Popover
                className='test'
                placement="topLeft"
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