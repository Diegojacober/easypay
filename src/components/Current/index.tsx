import React from 'react'
import { Div, Text } from 'react-native-magnus'
import useFetchAccount from '../queries/account';

interface ICurrentComponentProps {
    numeroConta: string
}

function Current({ numeroConta }: ICurrentComponentProps) {

    const { data } = useFetchAccount(numeroConta);

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL', 
    })

  return (
    <Div mt={5}>
        <Text color='gray500' fontSize={12}>Total balance</Text>
        <Text color='white' fontSize={22} fontWeight='600'>{formatter.format(data?.saldo)}</Text>
        <Div w={'100%'} h={1} mt={4} bg='white'></Div>
    </Div>
  )
}

export default Current