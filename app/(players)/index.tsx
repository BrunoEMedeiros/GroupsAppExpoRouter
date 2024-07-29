import ButtonIcon from "@/components/ButtonIcon";
import Filter from "@/components/Filter";
import HighLight from "@/components/HighLight";
import Input from "@/components/Input";
import theme from "@/theme";
import { useLocalSearchParams } from "expo-router";
import styled, { ThemeProvider } from "styled-components/native";

export default function Players(){
    
    // Aqui eu uso o método do expo-router pra pegar os parametros que vem da rota
    const {id, title} = useLocalSearchParams()

    return(
        <ThemeProvider theme={theme}>
            <Container>
            <HighLight 
                title={title?.toString()}
                subtitle="Adicione a galera do time!"
            />
            <Form>
                <Input placeholder="Nome do jogador..." autoCorrect={false} />
                <ButtonIcon icon="home"/>
            </Form>
            <Filter title="Time A"/>
            </Container>
        </ThemeProvider>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};

    padding: 24px;
`

const Form = styled.View`
    width: 100%;

    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    flex-direction: row;
    justify-content: center;

    border-radius: 6px;
`