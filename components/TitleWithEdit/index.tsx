import styled, { css } from "styled-components/native"
import ButtonIcon from "../ButtonIcon"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert } from "react-native"
import { router } from "expo-router"
import { apiConfig } from "@/api/axios"

export type TextInputStyleProp = {
    isActive?: boolean
}

type EditGroup = {
    className: string
}

type Props = TextInputStyleProp & {
    groupId: number
    title: string
}

export default function TitleWithEdit({ isActive=false, groupId, title}: Props){

    const [onEditMode, setOnEditMode] = useState(isActive)

    const { 
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditGroup>({ defaultValues: { className: title }})  

    const onSubmit = async (data: EditGroup) => {
        try 
        {
            const res = await apiConfig.put(`/groups/${groupId}`,{
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
        <Container>
            <TitleBox>
            <Controller 
                    name="className"
                    control={control}
                    rules={{
                        required: true, maxLength: 15,
                        validate: (value)=>{
                            const trimmedValue = value.trim();
                            return trimmedValue !== "" || "class name cannot be empty";
                        }}}
                    render={({ field: { onChange, onBlur, value}}) => (
                        <Input 
                            isActive={onEditMode}  
                            editable={onEditMode}    
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />  
                    )}
                />
                {
                    onEditMode 
                    ? 
                    <ButtonIcon 
                        icon="save"
                        onPress={handleSubmit(onSubmit)}
                    />
                    : 
                    <ButtonIcon 
                        icon="edit"
                        onPress={()=>setOnEditMode(!onEditMode)}
                    />
                }
                {
                    onEditMode && <ButtonIcon 
                                    icon="cancel"
                                    onPress={()=>{
                                        reset()
                                        setOnEditMode(!onEditMode)
                                    }}
                                    type="SECONDARY"
                                    />
                }
            </TitleBox>
            { onEditMode ? 
                errors.className?.type == "required" || errors.className?.message ? (
                    <ErrorMessage>Campo obrigatório</ErrorMessage>
                )
                : errors.className?.type == "maxLength" && (
                    <ErrorMessage>Maximo de 20 caracteres</ErrorMessage>
                ) 
                : 
                <SubTitle>Adicione a galera do time!</SubTitle>
            }
        </Container>
    )
}

const Container = styled.View`
    width: 100%;
    margin: 32px 0px;
    gap: 8px;
`
const TitleBox = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Input = styled.TextInput<TextInputStyleProp>`

    height: 56px;

    ${({theme, isActive}) => isActive && css`
        background-color: ${({ theme }) => 
        isActive ? theme.COLORS.GRAY_500 : theme.COLORS.GREEN_700};
        width: ${isActive ? '200px' : 'auto'};
    `};

    color: ${({theme}) => theme.COLORS.WHITE};

    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;

    border-radius: 6px;
    padding: 16px;
`
const SubTitle = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    color: ${({ theme }) => theme.COLORS.GRAY_300};
`

const ErrorMessage = styled.Text`
    width: 100%;
    text-align: center;
    color: ${({theme}) => theme.COLORS.RED};
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    margin: 10px 0px;
`