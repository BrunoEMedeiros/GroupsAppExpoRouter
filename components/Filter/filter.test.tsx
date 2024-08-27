import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import Filter from '.';
import theme from '@/theme';

describe('Component: Filter',()=>{
    test('should render title correctly',()=>{

        const { getByText } = render(<ThemeProvider theme={theme}>
            <Filter title="Test Title" />
        </ThemeProvider>)

        expect(getByText('Test Title')).toBeTruthy();
    })

    it('should have green border when is active', () => {
        const { getByTestId } = render(<ThemeProvider theme={theme}>
            <Filter title="Test Title" isActive={true} />
        </ThemeProvider>);

        const container = getByTestId('container-filter');
        expect(container.props.style).toMatchObject({
            borderColor: '#00875F'
        })
    });

    it('should`t have border when is inactive',()=>{
        const { getByTestId } = render(<ThemeProvider theme={theme}>
            <Filter title="Test Title" />
        </ThemeProvider>);

        const container = getByTestId('container-filter');
        
        // Quando inativo não deve ter borda nenhuma, por isso toBeUndefined()
        expect(container.props.style.borderColor).toBeUndefined();
    })
})