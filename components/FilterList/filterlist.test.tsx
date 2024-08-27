import { fireEvent, render, screen } from '@testing-library/react-native';
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

    O componente FilterList espera dois parametros, que é uma lista de Teams[] e uma
    função que será disparada toda vez que o card for clicado.
    Para testar eu criei a lista 'fake' abaixo e uma função vazia qualquer.
*/
describe('Component: FilterList',()=>{
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

        // Após renderizar o componente na tela eu testo se determinado card esta visivel
        // com o texto 'time a'
        const selectedTeam = screen.getByText('time a')
        expect(selectedTeam).toBeTruthy();
    });

    test('should return a team with a specific letter',()=>{
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

        /*
            Regex, abreviação de "Regular Expressions" (Expressões Regulares), 
            é uma sequência de caracteres que forma um padrão de pesquisa. 
            Esse padrão pode ser usado para realizar buscas, substituições e validações 
            em textos de forma eficiente. Regex é uma ferramenta poderosa em várias 
            linguagens de programação, como JavaScript, Python, Java, entre outras.

            Eu posso testar se determinado caractere, palavra ou texto esta presente em algum lugar
            Usamos muito isso para palavras ou termos que não queremos que o campo aceite
            ou em caso de senhas ou outras validações para saber se determinado caractere invalido foi usado
        */

        // Essa validação testa se em qualquer lugar do card de players existe a letra 'a' não importando
        // o que vem antes ou depois dessa palavra, desde que ela apareça
        const selectedTeam = screen.getByText(/a/i)
        console.log(selectedTeam)
    })

    test('should fire the card event',()=>{
        /*
            Um teste simples porem muito eficiente é testar se determinado elemento que
            deveria ser clicavel ou pressionavel, estão executando essa ação
            entao eu uso o fireEvent e digo qual evento eu quero testar
        */
       
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

        const selectedTeam = screen.getByText(/a/i)
        fireEvent.press(selectedTeam)
    })

    
})
