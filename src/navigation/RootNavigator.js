// die ganze Navigation von der App. Zwei Navigatoren kombiniert:
// - Tab Navigator für die 4 Haupt-Screens unten in der Bar
// - ein Stack nur innerhalb von Projects, damit ich zum Formular wechseln
//   und mit goBack() wieder zurück kann (Tab Navigator kann das alleine nicht)
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import DiscoverScreen from '../screens/DiscoverScreen'
import ProjectsScreen from '../screens/ProjectsScreen'
import NewProjectScreen from '../screens/NewProjectScreen'
import ConnectionsScreen from '../screens/ConnectionsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { colors } from '../theme'

const Tab = createBottomTabNavigator()
const ProjectsStack = createNativeStackNavigator()

// eigener kleiner Stack nur für Projects, sonst würde "Neues Projekt"
// als extra Tab auftauchen und das wollte ich nicht
function ProjectsStackScreen() {
  return (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProjectsStack.Screen name="ProjectsList" component={ProjectsScreen} />
      <ProjectsStack.Screen
        name="NewProject"
        component={NewProjectScreen}
        options={{ headerShown: true, title: 'Neues Projekt' }}
      />
    </ProjectsStack.Navigator>
  )
}

export default function RootNavigator() {
  return (
    // muss ganz aussen um alles rum, sonst funktioniert die Navigation nicht
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.grey3,
        }}
      >
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{ tabBarIcon: ({ color, size }) => <Feather name="compass" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsStackScreen}
          options={{ tabBarIcon: ({ color, size }) => <Feather name="folder" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Connections"
          component={ConnectionsScreen}
          options={{ tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}