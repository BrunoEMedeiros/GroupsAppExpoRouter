import { Players } from "@/app/(players)"
import { FlatList } from "react-native"
import PlayerCard from "../PlayerCard"
import styled from "styled-components/native"

type Props = {
    players: Players[],
    cardFuncao: Function
}

export default function PlayersList({players, cardFuncao}: Props){
    return(
        <FlatList
            style={{ flex: 1, marginBottom: 16, marginTop: 10}} 
            data={players}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
                return(<PlayerCard 
                    player={item}
                    funcao={cardFuncao}
                />)
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <EmptyListView>
                    <EmptyListText>Escolha um time e coloque os jogadores!</EmptyListText>
                </EmptyListView>}
            ItemSeparatorComponent={()=> (
                <GenericSeparatorElement></GenericSeparatorElement>
            )}
        />  
    )
}

const EmptyListView = styled.View`
    flex: 1;

    height: 100px;

    justify-content: center;
    align-items: center;
`
const EmptyListText = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.GRAY_300};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`

const GenericSeparatorElement = styled.View`
    height: 10px;
    width: 10px;
`