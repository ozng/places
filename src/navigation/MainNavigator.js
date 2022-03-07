import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigation from './DrawerNavigation';

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    )
}

export default MainNavigator