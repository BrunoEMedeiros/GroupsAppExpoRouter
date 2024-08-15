import styled from "styled-components/native"
import Input from "../Input"
import ButtonIcon from "../ButtonIcon"
import { Controller, useForm } from "react-hook-form";
import { apiConfig } from "@/api/axios";
import { Alert } from "react-native";
import { Teams } from "@/app/(players)";

type Props = {
    groupId: number
    atualizar: Function
}

export default function InputNewTeam({groupId, atualizar}: Props){

    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Teams>({ defaultValues: { nome: "" }})  

    const onSubmit = async (data: Teams) => {
       try {
            const res = await apiConfig.post(`/teams/new/${groupId}`,{
                nome: data.nome
            })
            if(res.status == 200){
                atualizar();
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
                            placeholder="Crie um novo time"
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
    )
}

const Container = styled.View`
    width: 100%;
    margin: 28px 0px;
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