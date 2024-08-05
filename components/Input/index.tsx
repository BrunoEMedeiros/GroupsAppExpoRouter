import { TextInputProps } from "react-native";
import styled from "styled-components/native";

/*
    {...rest}: O operador spread é usado novamente para aplicar todas as propriedades 
    recebidas pelo componente Input ao TextInput subjacente. 
    Isso significa que qualquer propriedade adicional passada para Input será passada 
    para meu campo de texto.
*/

export default function Input({...rest}: TextInputProps){
    return(
        <Container 
            placeholderTextColor={'#999'}
            {...rest}
        />
    )
}

const Container = styled.TextInput`
    flex: 1;
    min-height: 56px;
    max-height: 56px;

    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    color: ${({theme}) => theme.COLORS.WHITE};

    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;

    border-radius: 6px;
    padding: 16px;
`