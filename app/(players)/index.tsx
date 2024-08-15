import { apiConfig } from "@/api/axios";
import Button from "@/components/Button";
import FilterList from "@/components/FilterList";
import InputNewPlayer from "@/components/InputNewPlayer";
import InputNewTeam from "@/components/InputNewTeam";
import PlayersList from "@/components/PlayersList";
import TitleWithEdit from "@/components/TitleWithEdit";
import theme from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
    const [isActiveTeam, setIsActiveTeam] = useState<Teams | null>() 
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

    const deleteTeam = useCallback(async (team: Teams)=>{
        try {
            const response = await apiConfig.delete(`/teams/${team.id}`)
            if(response.status == 200){
                getTeams()
            }
        } catch (error) {
            console.error('Failed to delete team:', error);
        }
    },[])

    const deletePlayer = useCallback( async (player: Players)=>{
        try {
            const response = await apiConfig.delete(`/teams/players/${player.id}`)
            if(response.status == 200){
                setPlayers(prevState => 
                    prevState.filter(players => players.id != player.id))
            }

        } catch (error) {
            console.error('Failed to delete player:', error);
        }
    },[])

    /*  
       Essa pagina é a mais completa do tanto ponto de vista de efeitos
       visuais e funções do usuario.
       Lembre-se que ela poderia ter sido feita de outra forma, porem
       eu quis experimentar focar no design single page e colocar o maior numero
       de ações e funcionalidades sem trocar de pagina.
       Eu isolei o maximo de componentes para facilitar a testagem e manutenção do código
       alem de tornar a pagina mais legivel
    */
    return(
        <ThemeProvider theme={theme}>
            <Container>
                <TitleWithEdit groupId={parseInt(groupId)} title={title?.toString()} />
                <InputNewTeam groupId={parseInt(groupId)} atualizar={getTeams}/>
            { 
                //Esse conjunto só sera visto na tela caso exista algum time cadastrado no group
                teams.length > 0 
                &&
                <TeamsView>
                    <FilterList 
                        teams={teams}
                        isActiveTeam={isActiveTeam}
                        cardFuncion={selectTeam}
                    />
                    <NumberOfPlayers>{teams.length}</NumberOfPlayers>
                </TeamsView>
            }
            {
                isActiveTeam
                && 
                <InputNewPlayer 
                    team={isActiveTeam}  
                    atualizar={selectTeam}
                />
            }
            {
                //Esse conjunto só sera visto na tela caso exista algum time cadastrado no group
                teams.length > 0 
                ?
                <PlayersList 
                    players={players}
                    cardFuncao={deletePlayer}
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
                        deleteTeam(isActiveTeam)
                        setIsActiveTeam(null)
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

    padding: 28px;
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

    height: 100px;

    justify-content: center;
    align-items: center;
`
const EmptyListText = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.GRAY_300};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`