import { apiConfig } from "@/api/axios";
import ButtonIcon from "@/components/ButtonIcon";
import Filter from "@/components/Filter";
import HighLight from "@/components/HighLight";
import Input from "@/components/Input";
import PlayerCard from "@/components/PlayerCard";
import TitleWithEdit from "@/components/TitleWithEdit";
import theme from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled, { css, ThemeProvider } from "styled-components/native";

type Teams = {
    id: number,
    nome: string,
    fk_turmas: number
}

type Players = {
    id: number,
    nome: string,
    fk_time: number
}

export default function Players(){
    
    // Aqui eu uso o método do expo-router pra pegar os parametros que vem da rota
    // sempre que voce passar parametros para uma rota, não se esqueca do id
    const {groupId, title} = useLocalSearchParams<{groupId: string, title: string}>()
    const [teams, setTeams] = useState<Teams[]>([])
    const [isActiveTeam, setIsActiveTeam] = useState<Teams>()
    
    const [players, setPlayers] = useState<Players[]>([])

    useEffect(()=>{
        getTeams();
    },[])

    const getTeams = useCallback(async () => {
        try {
            const response = await apiConfig.get(`/teams/${groupId}`)
            if(response.status == 200)
                setTeams(response.data)
        } 
        catch (error) {
            console.error('Failed to load teams:', error);
        }
    },[])

    const selectTeam = useCallback(async (team: Teams)=>{
        try {
            const response = await apiConfig.get(`/teams/players/${team.id}`)
            if(response.status == 200)
            {
                setIsActiveTeam(team)
                setPlayers(response.data)
            }
        } 
        catch (error) {
            console.error('Failed to load players:', error);
        }
    },[])

    return(
        <ThemeProvider theme={theme}>
            <Container>
            <TitleWithEdit groupId={parseInt(groupId)} title={title?.toString()} />
            <Form>
                <Input placeholder="Crie um novo time" autoCorrect={false} />
                <ButtonIcon icon="add"/>
            </Form>
            { 
                teams.length > 0 ?
                <TeamsView>
                    <FlatList 
                        data={teams}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        renderItem={({item}) =>{
                            return(
                            <Filter 
                                title={item.nome} 
                                isActive={item === isActiveTeam}
                                onPress={()=> selectTeam(item)}
                            />)
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={null}
                        ItemSeparatorComponent={()=> (
                            <View style={{height: 10}}></View>
                        )}
                        />
                    <NumberOfPlayers>{teams.length}</NumberOfPlayers>
                </TeamsView>
                :
                null
            }
            {
            teams.length > 0 ?
                <FlatList
                style={{ flex: 1, height: '100%'}} 
                data={players}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return(<PlayerCard 
                        name={item.nome}
                    />)
                }}
                ListHeaderComponent={
                    <Form>
                        <Input placeholder="Adicionar novo jogador" autoCorrect={false} />
                        <ButtonIcon icon="add"/>
                    </Form>
                }
                ListHeaderComponentStyle={{marginBottom: 10}}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                <EmptyListView>
                    <EmptyListText>Coloque alguns jogadores!</EmptyListText>
                </EmptyListView>}
                ItemSeparatorComponent={()=> (
                    <View style={{height: 10}}></View>
                )}
                />  
            :
            <EmptyListView>
                <EmptyListText>Crie alguns times!</EmptyListText>
            </EmptyListView>
            }
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

const TeamsView = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;

    margin: 32px 0;
`

const NumberOfPlayers = styled.Text`
    ${({theme}) => css`
        color: ${theme.COLORS.WHITE};
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
    `}
`
const EmptyListView = styled.View`
    flex: 1;

    height: 100%;

    justify-content: center;
    align-items: center;
`

const EmptyListText = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`