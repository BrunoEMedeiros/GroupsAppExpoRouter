import { apiConfig } from "@/api/axios";
import Button from "@/components/Button";
import HighLight from "@/components/HighLight";
import Input from "@/components/Input";
import theme from "@/theme";
import { router } from "expo-router";
import { UsersThree } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";

/*
    Como padronização para uma melhor estruturação de código, nós criamos tipos
    e passamos eles para funções, metodos e componentes.
    Exatamente a mesma lógica que nós aprendemos em POO com Classes e Objetos,
    porem no React Native isso é feita de forma muito mais suave, servindo apenas
    como assistente de marcação na hora de montar seus códigos.
*/
type NewGroup = {
    className: string
}

export default function NewGroup()
{
    // Métodos e constantes que vem da lib react-hook-form
    const { 
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewGroup>({ defaultValues: { className: "" }})  
    
    /*
        A função handleSubmit que vem da lib react-hook-form ja vem com uma validação
        interna, somente executando caso não haja nenhum erro nas rules dos campos
        por tanto não é necessario nenhuma validação adicional
    */
    const onSubmit = async (data: NewGroup) => {
        // Try catch sempre
        try 
        {
            const res = await apiConfig.post('/groups/new',{
                nome: data.className
            });

            // Se a inserção der certo, volta para a tela anterior
            if(res.status == 200){
                router.back()
            }
            else{
                return Alert.alert('Ops...','Algo deu errado, tente mais tarde',
                    [
                        {
                            text: 'Ok'
                        }
                    ]
                )
            }
        } 
        catch (error) {
            console.error(error)
            return Alert.alert('Ops...','Algo deu errado, tente mais tarde',
                [
                    {
                        text: 'Ok'
                    }
                ]
            ) 
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <Container>
                <Icon />
                <HighLight 
                    title="Nova turma"
                    subtitle="De o nome para a turma"
                />
                {/* 
                    LEIA ------------- IMPORTANTE ------------------ LEIA

                    Para usar a lib react-hook-form no React Native, ela segue
                    um padrão, envolva o campo de texto no component <Controller />
                    que vem própria biblioteca e passa os parametros obrigatórios.
                    Caso queira mais ou menos validações, va colocando em rules.
                    Todos os erros de validação são jogados pra dentro de errors
                    use essa variavel para efeitos visuais caso queira.
                */}
                <Controller 
                    name="className"
                    control={control}
                    rules={{required: true, maxLength: 10}}
                    render={({ field: { onChange, onBlur, value }}) => (
                        <Input       
                            placeholder="Nome da turma"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />  
                    )}
                />
                {errors.className?.type == "required" ? (
                    <ErrorMessage>Campo obrigatório</ErrorMessage>
                )
                : errors.className?.type == "maxLength" && (
                    <ErrorMessage>Maximo de 10 caracteres</ErrorMessage>
                )}

                {/* 
                    LEIA ------------- IMPORTANTE ------------------ LEIA

                    Sempre siga o padrao chamando sua função dentro de
                    handleSubmit, que vem da lib react-hook-forms, assim
                    sua função só vai disparar obrigatóriamente se as
                    validações forem satisfeitas.
                */}
                <Button 
                    style={{marginTop: 30}}
                    title="Criar nova turma"
                    onPress={handleSubmit(onSubmit)}
                />
            </Container>
        </ThemeProvider>
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
    padding: 26px;
`

// Éssa é a forma de acessar as propriedades internas de um component que vem de uma
// biblioteca externa
const Icon = styled(UsersThree).attrs(({theme}) => ({
    size: 56,
    color: theme.COLORS.GREEN_700
}))`
    align-self: center;
`

const ErrorMessage = styled.Text`
    color: ${({theme}) => theme.COLORS.RED};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    margin: 10px 0px;
`