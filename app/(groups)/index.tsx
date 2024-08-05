import theme from "@/theme";
import styled, { ThemeProvider } from "styled-components/native";
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { router, SplashScreen, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StatusBar, FlatList, View } from "react-native";
import HighLight from "@/components/HighLight";
import GroupCard from "@/components/GroupCard";
import { apiConfig } from "@/api/axios";
import ListEmpty from "@/components/ListEmpty";
import Button from "@/components/Button";

/*
    LEIA ------------- IMPORTANTE ------------------ LEIA
    
    Nesse projeto vou começar a trabalhar conceitos mais avançados de navegação,
    ANTES de usar o código entenda os conceitos abaixo.
    
    * Pilha de Navegação: 
        Imagine uma pilha de cartões onde cada cartão representa uma tela do aplicativo. 
        Quando você navega para uma nova tela, essa tela é empilhada em cima da tela atual. 
        A tela anterior fica abaixo da nova, e você pode voltar a ela 
        removendo a tela atual do topo da pilha. 
        É igual a uma pilha de pratos onde você adiciona um prato em cima e 
        remove o prato do topo para tirar os que estão abaixo.
*/

/*
    Usando o componente SplashScreen do expo-router, uma SplashPage generica 
    será exibida para o usuario enquanto a pagina carrega
    A SplashScreen basica da biblioteca vem em branco, não é um visual muito agradavel
    para mudar faça os ajuste no arquivo app.json na raiz do projeto.
*/
SplashScreen.preventAutoHideAsync();

/*
    Interface no TS é diferente do conceito no POO tradicional, aqui ela tem apenas um
    cunho de "marcação", para facilitar a manutenção e confecção do código, usamos
    interfaces em funções e métodos para tipa-los, oque ajuda o desenvolvedor e
    previne certos erros.
*/
interface Groups{
    id: number,
    nome: string,
    _status: number
}

export default function Groups()
{
    /* 
        O hook useFonts vem do expo em junção com as libs de fontes (cuidado ao usar fontes
        não licenciadas pelo expo) ele serve exclusivamente para carregar fontes em componentes
    */
    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium,
        Inter_700Bold,
      });
    
    // state usado para guardar a lista de gruoups que vem da rota da API
    const [groups, setGroups] = useState<Groups[]>([]);

    // Nessa pagina eu uso o useEffect apenas para carregar as fontes e remover a SplahScreen quando
    // elas terminarem de carregar
    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    
    /*
        LEIA ------------- IMPORTANTE ------------------ LEIA

        Nessa tela eu quero mostrar um tipo de ação mais avançada. 
        A ideia é que: quando o usuario cadastrar um novo grupo na tela 
        /(groups)/newGroup.tsx ele será redirecionado de volta para cá, 
        ao fazer isso a tela deve ser atualizada de forma automatica 
        refazendo a requisição que trás a lista de groups da API 
        pra isso eu vou usar o hook useFocusEffect que dispara toda vez 
        que o componente onde ele esta entra "em foco", ou seja, 
        quando o componente for visivel para o usuario, nesse caso 
        quando essa tela for aberta.
        Vou deixar de exemplo tambem o hook useCallback que é usado para
        momoização de funções no React, para melhorar a performace e evitar
        gastos desnecessarios e re-renderizações.
    */

    const loadData = useCallback(async (controller: AbortController) => {
        try {
            const response = await apiConfig.get('/groups',{
                signal: controller.signal
            });
            setGroups(response.data);
        } 
        catch (error) {
            console.error('Failed to load groups:', error);
        }
    }, []);
    
    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            loadData(controller);
        
            return () => {
            // Aborta a requisição axios quando o componente for desmontado
            controller.abort(); 
            console.log('Cleaning up...');
        }
        }, [loadData])
    );

    //Caso a fonte não tenha carregado por completo ainda ou haja erro, nada será exibir para o usuario
    if (!fontsLoaded && !fontError) {
        return null;
    }

    //Se o código chegar nesse ponto, significa que a fonte carregou corretamente e a splash page ja foi retirada
    return(
        <ThemeProvider theme={theme}>   
            <StatusBar 
                barStyle={"light-content"}
                backgroundColor={"transparent"}
                translucent
            />
            <Container>
                <HighLight 
                    title="Turmas"
                    subtitle="jogue com sua turma"
                />
                <FlatList 
                        style={{marginBottom: 12}}
                        data={groups}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) =>{
                            return <GroupCard groupId={item.id} title={item.nome} /> 
                        }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={groups.length === 0 && {flex: 1}}
                        ListEmptyComponent={()=> 
                            <ListEmpty 
                                message="Que tal cadastrar a primeira turma?"
                            />
                        }
                        ItemSeparatorComponent={()=> (
                            <View style={{height: 8}}></View>
                        )}
                />
                <Button  
                    title="Criar nova turma"
                    onPress={()=>{
                        router.push('/(groups)/newGroup')
                    }}
                />
            </Container> 
        </ThemeProvider>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
    padding: 16px;
`