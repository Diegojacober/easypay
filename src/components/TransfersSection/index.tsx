import React from 'react'
import { Div, Text } from 'react-native-magnus'
import { Transfer } from '../queries/transfers/types'
import useAuthStore from '../../stores/useAuthStore'
import TransferCard from '../TransferCard'

interface ITransfersSectionProps {
    transfers: Transfer[]
}

function TransfersSection({ transfers }: ITransfersSectionProps) {

    const [account] = useAuthStore(
        (state) => [
            state.account,
        ]
    );

  return (
    <Div mt={25}>
        <Text color='white' fontSize={16} fontWeight='700'>Recent activity</Text>

        {(transfers?.length > 0) ? (
                <>
                    {transfers.map(transferencia => (
                        <TransferCard key={transferencia.id} transfer={{
                            id: transferencia.id,
                            type: account?.id !== transferencia.to_account_id ? 'sender' : 'receiver',
                            value: transferencia.value,
                            date: transferencia.created_at,
                            name: ` ${transferencia.to_account.agencia}  ${transferencia.to_account.numero}`
                        }}/>
                    ))}
                </>
            ) : (
                <Text color='gray500' fontSize={12} ml={15} mt={5}>Nenhuma transferencia...</Text>
            )}
    </Div>
  )
}

export default TransfersSection