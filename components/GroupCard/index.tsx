import { Link } from "expo-router"
import { UsersThree } from "phosphor-react-native"
import { PressableProps } from "react-native"
import styled from "styled-components/native"

//O truque aqui é tranformar o component todo em um objeto clicavel/pressionavel
//naturalmente isso não ocorre, por isso quando pedimos parametros para ele,
//no caso o "title", ele não vem com eventos.
//Pra resolver de um jeito simples nos colocamos o tipo TouchableOpacityProps 
//junto as os nossos parametros e o React entende que esse component terá eventos

type Props = PressableProps & {
    title: string
}

// Aqui alem de um "title" que é um parametro string normal, eu uso o
// ...rest(spread operator) que significa: qualquer outro parametro que venha do tipo
// PressableProps vai estar contido dentro dele
export default function GroupCard({ title, ...rest }: Props){
    return(
        <Link href={{
            pathname: '/(players)/',
            params: {id: 1, title: title}
        }} asChild>
            <Container>
                <Icon />
                <Title>{title}</Title>
            </Container>
        </Link>
    )
}

const Container = styled.Pressable`
    width: 100%;
    height: 90px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_500};
    
    border-radius: 6px;
    
    padding: 24px;
    margin-bottom: 12px;

    flex-direction: row;
    align-items: center;
`
const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.GRAY_200};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
const Icon = styled(UsersThree).attrs(({theme}) => ({
    size: 36,
    color: theme.COLORS.GREEN_700,
    weight: 'fill'
}))`
    margin-right: 10px;
`