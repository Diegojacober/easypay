import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewTransfer from "../pages/NewTransfer";


const Stack = createStackNavigator();

export default function StackRoutes() {
    return(
        <Stack.Navigator>
            {/* <Stack.Screen title="TransfersPage" component={NewTransfer}/> */}
        </Stack.Navigator>
    )
}