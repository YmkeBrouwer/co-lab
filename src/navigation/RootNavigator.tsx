import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { ActivityIndicator, View } from 'react-native'
import { useApp } from '../context/AppContext'
import SignupScreen from '../screens/SignupScreen'
import ProfileSetupScreen from '../screens/ProfileSetupScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import ProfileDetailScreen from '../screens/ProfileDetailScreen'
import ProjectsScreen from '../screens/ProjectsScreen'
import NewProjectScreen from '../screens/NewProjectScreen'
import ProjectDetailScreen from '../screens/ProjectDetailScreen'
import ConnectionsScreen from '../screens/ConnectionsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import { colors } from '../theme'
import {
  OnboardingStackParamList,
  DiscoverStackParamList,
  ProjectsStackParamList,
  ConnectionsStackParamList,
  ProfileStackParamList,
} from './types'

const Tab = createBottomTabNavigator()
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>()
const DiscoverStack = createNativeStackNavigator<DiscoverStackParamList>()
const ProjectsStack = createNativeStackNavigator<ProjectsStackParamList>()
const ConnectionsStack = createNativeStackNavigator<ConnectionsStackParamList>()
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="DiscoverList" component={DiscoverScreen} />
      <DiscoverStack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ headerShown: true, title: '' }} />
    </DiscoverStack.Navigator>
  )
}

function ProjectsStackScreen() {
  return (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProjectsStack.Screen name="ProjectsList" component={ProjectsScreen} />
      <ProjectsStack.Screen name="NewProject" component={NewProjectScreen} options={{ headerShown: true, title: 'Neues Projekt' }} />
      <ProjectsStack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ headerShown: true, title: '' }} />
    </ProjectsStack.Navigator>
  )
}

function ConnectionsStackScreen() {
  return (
    <ConnectionsStack.Navigator screenOptions={{ headerShown: false }}>
      <ConnectionsStack.Screen name="ConnectionsList" component={ConnectionsScreen} />
      <ConnectionsStack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ headerShown: true, title: '' }} />
    </ConnectionsStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MyProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Profil bearbeiten' }} />
    </ProfileStack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.grey3,
      }}
    >
      <Tab.Screen name="Discover" component={DiscoverStackScreen} options={{ tabBarIcon: ({ color, size }) => <Feather name="compass" size={size} color={color} /> }} />
      <Tab.Screen name="Projects" component={ProjectsStackScreen} options={{ tabBarIcon: ({ color, size }) => <Feather name="folder" size={size} color={color} /> }} />
      <Tab.Screen name="Connections" component={ConnectionsStackScreen} options={{ tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} /> }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} /> }} />
    </Tab.Navigator>
  )
}

export default function RootNavigator() {
  const { hasSession, isOnboarded, isLoaded } = useApp()

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }}>
        <ActivityIndicator color={colors.black} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {isOnboarded ? (
        <MainTabs />
      ) : (
        // schon eingeloggt aber noch kein Profil (z.B. nach Signup) -> direkt
        // zu ProfileSetup, sonst bei Signup starten
        <OnboardingStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={hasSession ? 'ProfileSetup' : 'Signup'}>
          <OnboardingStack.Screen name="Signup" component={SignupScreen} />
          <OnboardingStack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        </OnboardingStack.Navigator>
      )}
    </NavigationContainer>
  )
}