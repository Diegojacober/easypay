import React, {useState} from 'react'
import { Button, Div, Icon, Image, Text } from 'react-native-magnus'
import useAuthStore from '../../stores/useAuthStore';

function Header() {
    const [logout, user] = useAuthStore(
        (state) => [
            state.logout,
            state.user
        ]
    );

    const [avatarUrl, setAvatarUrl] = useState<string | null>(user && user?.url_image)

    const handleLogout = () => {
        logout()
    }

    return (
        <Div mt={5} mb={18} flexDir='row' alignItems='center' justifyContent='space-between'>
            <Div flexDir='row' alignItems='center' >
                <Image w={50} h={50} rounded="circle" source={{
                    uri: avatarUrl === null ? `https://ui-avatars.com/api/?background=random&name=${user?.first_name}${user?.last_name}` : avatarUrl
                }} />
                <Div ml={8}>
                    <Text color='gray400' mb={2} fontSize={14}>{`${user?.first_name} ${user?.last_name}`}</Text>
                    <Text color='gray400' fontSize={10}>{`${user?.email}`}</Text>
                </Div>
            </Div>
            <Div>
                <Button bg="transparent" h={52} w={52} rounded="circle" onPress={handleLogout}>
                    <Icon name="logout" color="white" fontSize={20} />
                </Button>
            </Div>
        </Div>
    )
}

export default Header

