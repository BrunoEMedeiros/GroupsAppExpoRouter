import { render } from '@testing-library/react-native';
import Button from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '@/theme';

/*
    Aqui eu crio um teste um pouco mais elaborado, pois ao invés de uma função qualquer
    eu preciso testar se um determinado componente esta carregando corretamente na tela.
    Alem de simplesmente abrir na tela, tambem devo testar as estilizações e outras
    funções atribuidas a ele.
    Elemento de UI ou seja, elementos que tem uma interação direta com o usuario,
    como botões, campos de texto, campos de seleção, listagens e outros, são especialmente
    dificeis tanto de escrever os testes quanto adaptar os componentes a diferentes cenarios
    Um bom desenvolvedor deve entender que se seu component não passar em um ou mais testes
    não significa que o código esta ruim ou mal feito, apenas que em determinado cenario
    ele não esta se adaptando corretamente.
*/

describe('Component: Button',()=>{
    /*
        Com a extensão Jest Runner habilitada vão aparecer sempre duas opções de execução
        em cada teste: Run|Debug    
        Para 'debugar' corretamente um componente use a sintaxe abaixo e clique com o
        mouse na opção Degub em cima dele.
    */
    test('should be render with PRIMARY style',()=>{

        // Aqui apenas vou deixar pré configurado o exemplo de um teste com debug
        const {debug} = render(
        <ThemeProvider theme={theme}>
            <Button title='test'/>
        </ThemeProvider>
        )
        debug();
    });

    test('should be render with SECONDARY style', ()=>{
        // testando se o botão carrega corretamente com o estilo secundario
        render(<ThemeProvider theme={theme}>
            <Button title='test' type='SECONDARY' />
        </ThemeProvider>)
    });

    test('should be render a text label', ()=>{
        // Testando se o botao renderiza com o texto que que eu passo
        const { getByText } = render(<ThemeProvider theme={theme}>
            <Button title='meu botao'/>
        </ThemeProvider>);

        const textLabel = getByText('meu botao');
        expect(textLabel).toBeTruthy();
    });
})