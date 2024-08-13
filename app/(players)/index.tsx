import { apiConfig } from "@/api/axios";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import InputNewPlayer from "@/components/InputNewPlayer";
import InputNewTeam from "@/components/InputNewTeam";
import PlayerCard from "@/components/PlayerCard";
import TitleWithEdit from "@/components/TitleWithEdit";
import theme from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import styled, { css, ThemeProvider } from "styled-components/native";

export type Teams = {
    id: number,
    nome: string,
    fk_turmas: number
}

export type Players = {
    id: number,
    nome: string,
    fk_time: number
}

export default function Players(){
    /*
        Aqui eu uso o método do expo-router pra pegar os parametros que vem da rota
        sempre que voce passar parametros para uma rota, não se esqueca do id 
    */
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

    const deleteTeam = useCallback( async (team: Teams)=>{
        try {
            
        } catch (error) {
            console.error('Failed to delete team:', error);
        }
    },[])

    /*  
        Nesse caso eu precisei isolar a lógica do react-hook-forms
        e suas validações dentro do componente TitleWithEdit e InputNewTeam porque 
        existem outros inputs dentro dessa pagina, e não é legal deixar 
        varias funções de submit dentro de uma mesma pagina.
        Submit é a ação de enviar um formulario geralmente para uma rota
        ou outra pagina, por si ela não é uma ação nociva ao sistema,
        mais pela natureza do "envio" ter varios em um mesmo arquivo não é bom
    */

    return(
        <ThemeProvider theme={theme}>
            <Container>
                <TitleWithEdit groupId={parseInt(groupId)} title={title?.toString()} />
                <InputNewTeam groupId={parseInt(groupId)} atualizar={getTeams}/>
            { 
                //Esse conjunto só sera visto na tela caso exista algum time cadastrado no group
                teams.length > 0 
                ?
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
                            <View style={{width: 10, height: 10}}></View>
                        )}
                    />
                    <NumberOfPlayers>{teams.length}</NumberOfPlayers>
                </TeamsView>
                :
                null
            }
            {
                //Esse conjunto só sera visto na tela caso exista algum time cadastrado no group
                teams.length > 0 
                ?
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
                        isActiveTeam ?  
                        <InputNewPlayer 
                            team={isActiveTeam}  
                            atualizar={selectTeam}
                        /> : null
                    }
                    ListHeaderComponentStyle={{marginBottom: 10}}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <EmptyListView>
                            <EmptyListText>Escolha um time e coloque os jogadores!</EmptyListText>
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
            {
                isActiveTeam
                && 
                <Button  
                    title="Excluir time"
                    type="SECONDARY"
                    onPress={()=>{
                    
                    }}
                />
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
const TeamsView = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;

    margin: 12px 0;
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