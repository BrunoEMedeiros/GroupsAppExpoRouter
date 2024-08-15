import { MaterialIcons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";
import ButtonIcon from "../ButtonIcon";
import { Players } from "@/app/(players)";

type Props = {
    player: Players,
    funcao: Function
}

export default function PlayerCard({player, funcao}: Props){
    return(<Container>
        <Icon name="person" />
        <Name>{player.nome}</Name>
        <ButtonIcon 
            icon="close"
            type="SECONDARY"
            onPress={()=>funcao(player)}
        />
    </Container>)
}

const Container = styled.View`
    width: 100%;
    height: 56px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_500};

    flex-direction: row;
    align-items: center;
`

const Name = styled.Text`
    flex: 1;
    ${({theme})=> css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `}
`
const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_200
}))`
    margin-left: 16px;
    margin-right: 4px;
`