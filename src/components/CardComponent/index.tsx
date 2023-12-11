import { Div, Icon, Text } from "react-native-magnus"

type CardType = {
  id: number
  cvv: number
  cardNumber: string
  cardName: string
  date: string
}

interface ICardProps {
  card: CardType;
}

function CardComponent({ card }: ICardProps) {
  return (
    <Div borderColor="gray700" borderWidth={1} w={380} h={'66%'} mt={15} style={{ borderRadius: 5 }} bg="blue">
      <Div w={'100%'} alignItems="flex-start" pl={15} pt={4}>
        <Icon name="integrated-circuit-chip" fontFamily="MaterialCommunityIcons" fontSize={50} />
      </Div>
      <Div mt={20} justifyContent="center" alignItems="center">
        <Div>
          <Text color="white" fontSize={21}>{card.cardNumber}</Text>
        </Div>
        <Div flexDir="row" style={{gap: 45}} mt={38}>
          <Text color="white">{card.cardName}</Text>
          <Text color="white">{card.date}</Text>
          <Text color="white">{card.cvv}</Text>
        </Div>
      </Div>
    </Div>
  )
}

export default CardComponent
