import { PressableProps } from "react-native";
import styled, { css } from "styled-components/native"

export type FilterStyleProps = {
    isActive?: boolean
}

type Props = PressableProps & FilterStyleProps & {
    title: string
}

export default function Filter({title, isActive=true, ...rest}: Props){
    return(
        <Container isActive={isActive} {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}

const Container = styled.Pressable<FilterStyleProps>`
    ${({theme, isActive}) => isActive && css`
        border: 1px solid ${theme.COLORS.GRAY_700};
    `};

    border-radius: 4px;
    margin-right: 12px;

    height: 38px;
    width: 70px;

    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.WHITE}
    `}

`;