import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';

export const getTheme = theme => {
    if(theme === 'light') return createTheme({
        palette: {
            mode: 'light',
            header: '#FAFAFA',
            bgcolor: '#F5F5F5',
            primary: red,
            status: {
                error: '#f44336',
                warning: '#ffa726',
                info: '#29b6f6',
                success: '#66bb6a',
                disabled: '#9E9E9E',
            },
            other: {
                yellow: '#F9A825'
            }

        },
    });
    return createTheme({
        palette: {
            mode: 'dark',
            status: {
                error: '#d32f2f',
                warning: '#ed6c02',
                info: '#0288d1',
                success: '#2e7d32',
                disabled: '#757575'
            },
            other: {
                yellow: '#FDD835'
            }
        },
    });
}