import { Teams } from "@/app/(players)"
import { FlatList } from "react-native"
import Filter from "../Filter"
import styled from "styled-components/native"

type Props = {
    teams: Teams[],
    isActiveTeam?: Teams | null,
    cardFuncion: Function
}

export default function FilterList({teams, isActiveTeam, cardFuncion}: Props){
    return(
        <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({item}) =>{
            return(
            <Filter 
                title={item.nome} 
                isActive={item === isActiveTeam}
                onPress={()=> cardFuncion(item)}
            />)
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={null}
        ItemSeparatorComponent={()=> (
            <GenericSeparatorElement></GenericSeparatorElement>
        )}
    />
    )
}

const GenericSeparatorElement = styled.View`
    height: 10px;
    width: 10px;
`