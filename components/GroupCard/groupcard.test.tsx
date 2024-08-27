import { render, screen, fireEvent } from '@testing-library/react-native';
import GroupCard from '.'; // Certifique-se de que o caminho esteja correto
import { ThemeProvider } from 'styled-components/native';
import theme from '@/theme';
import { Link } from 'expo-router';

/*
  Esse componente tem muitas interações na tela, por tanto ele é passivel
  de varios tipos de problemas.
  Suas funções são:
  1 - Mostrar para o usuario o nome da Turma criada
  2 - Ao clicar nele deve levar para a pagina de detalhes do Time
  3 - Ao clicar no icone deve subir um alerta para exclui-lo

  Para testar coisas complexas e que tem interações com coisas externas a ele como:
    * APIs
    * Cliques
    * Redirecionamentos
    * Passagem de parametros

  Preciso usar o Mock, uma técnica que me permite imitar ambientes e comportamentos
  do mundo real através do Jest
*/

jest.mock('expo-router', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

describe('GroupCard Component', () => {
  const props = {
    groupId: 1,
    title: 'Test Group',
    // Uso o mock do jest para imitar o comportamento de uma função real
    funcao: jest.fn(),
  };

  test('should render the component and its elements correctly', () => {
      render(<ThemeProvider theme={theme}>
        <GroupCard {...props}/>
      </ThemeProvider>
    );
    const selectedGroupCard = screen.getByText('Test Group');
    expect(selectedGroupCard).toBeTruthy()
  });

  test('should navigate to the correct route when the link is pressed', () => {
    const { getByTestId } = render(<ThemeProvider theme={theme}>
      <GroupCard {...props} />
    </ThemeProvider>);

    // Simula o clique no Link
    const link = getByTestId('link-to-details');
    fireEvent.press(link);

    // Verifica se o Link foi renderizado com os parâmetros corretos
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: {
          pathname: "/(players)",
          params: {
            groupId: props.groupId,
            title: props.title,
          },
        },
        asChild: true,
      }),
      {}
    );
  });

});