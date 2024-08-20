import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '@/theme';
import FilterList from '.';
import { Teams } from '@/app/(players)';

/*
    Testar listas sempre é uma coisa meio chata, tanto de testar quanto de fazer a lista
    em si.
    Uma lista por si deve seguir alguns principios basicos como: 
    1 - ser "rolavel": o evento de scroll deve funciona corretamente, seja vertical ou
    horizontal.
    2 - exibir de forma igual todos os itens da lista.
*/
describe('Component: FilterList',()=>{
    /* 
        O componente FilterList espera dois parametros, que é uma lista de Teams[] e uma
        função que será disparada toda vez que o card for clicado.
        Para testar eu criei a lista fake abaixo e uma função vazia qualquer.
    */
    test('should return a list of teams to select',()=>{
        const teams: Teams[] = 
        [
            {
                id: 1,
                nome: 'time a',
                fk_turmas: 1
            },
            {
                id: 2,
                nome: 'time b',
                fk_turmas: 1
            },
            {
                id: 3,
                nome: 'time c',
                fk_turmas: 1
            },
            {
                id: 4,
                nome: 'time d',
                fk_turmas: 1
            }
        ]

        render(
        <ThemeProvider theme={theme}>
            <FilterList 
                teams={teams}
                cardFuncion={()=>{}}
            />
        </ThemeProvider>
        )

        const selectedTeam = screen.getByText('time a')
        expect(selectedTeam).toBeTruthy();
    })
})