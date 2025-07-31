import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../services/ui/uiServices.js'
import { Button } from '../../components/ui/button'
import { Sun, Moon, MonitorSmartphone } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'

function ThemeSelector({ type = "select" }) {
    const { darkMode } = useSelector(state => state.ui)
    const dispatch = useDispatch();

    const handleThemeChange = (value) => {
        let isDarkMode;
        if (value === "light") {
            isDarkMode = false;
        } else if (value === "dark") {
            isDarkMode = true;
        } else if (value === "system") {
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        dispatch(toggleDarkMode(isDarkMode));
    }

    const handleButtonClick = () => {
        const newValue = darkMode ? "light" : "dark";
        handleThemeChange(newValue);
    }

    if (type === 'button') {
        return (
            <Button variant="ghost" onClick={handleButtonClick}>
                {darkMode ? <Moon /> : <Sun />}
            </Button>
        )
    }

    return (
        <div>
            <Select
                name='Theme'
                defaultValue='light'
                onValueChange={handleThemeChange}
            // value={darkMode ? 'dark' : 'light'}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value='light'><Sun /> Light</SelectItem>
                    <SelectItem value='dark'><Moon /> Dark</SelectItem>
                    <SelectItem value='system'><MonitorSmartphone /> System Mode</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default ThemeSelector