import styled from "styled-components/native"
import Input from "../Input"
import ButtonIcon from "../ButtonIcon"
import { Controller, useForm } from "react-hook-form";
import { apiConfig } from "@/api/axios";
import { Alert, KeyboardAvoidingView } from "react-native";
import { Players, Teams } from "@/app/(players)";

type Props = {
    team: Teams
    atualizar: Function
}

export default function InputNewPlayer({team, atualizar}: Props){

    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Players>({ defaultValues: { nome: "" }})  

    const onSubmit = async (data: Players) => {
       try {
            const res = await apiConfig.post(`/teams/players/${team.id}`,{
                nome: data.nome
            })
            if(res.status == 200){
                atualizar(team);
                reset();
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
       } catch (error) {
            console.error('error to add team ', error)
       }
    }
    
    return(
        <KeyboardAvoidingView>
        <Container>
            <Form>
            <Controller 
                    name="nome"
                    control={control}
                    rules={{required: true, maxLength: 10,
                        validate: (value)=>{
                            //Uso o método trim() para tirar espaços em branco
                            const trimmedValue = value.trim();
                            return trimmedValue !== "" || "class name cannot be empty";
                        }
                    }}
                    render={({ field: { onChange, onBlur, value }}) => (
                        <Input       
                            placeholder="Coloque um jogador"
                            autoCorrect={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />  
                    )}
            />
            <ButtonIcon 
                icon="add"
                onPress={handleSubmit(onSubmit)}
            />
        </Form>
        {errors.nome?.type == "required" || errors.nome?.message ? (
            <ErrorMessage>Campo obrigatório</ErrorMessage>
        )
        : errors.nome?.type == "maxLength" && (
            <ErrorMessage>Maximo de 10 caracteres</ErrorMessage>
        )}

        </Container>
        </KeyboardAvoidingView>
    )
}

const Container = styled.View`
    width: 100%;
    //margin: 40px 0px;
    gap: 8px;
`
const Form = styled.View`
    width: 100%;

    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    flex-direction: row;
    justify-content: center;

    border-radius: 6px;
`
const ErrorMessage = styled.Text`
    width: 100%;
    color: ${({theme}) => theme.COLORS.RED};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`