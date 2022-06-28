import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './components/Authentification/Login';
import PrivateRoute from './utils/privateRoute';
import { MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import MainContainer from './mainContainer';
import AddVehicule from './components/Vehicules/addVehiculeForm/addVehicule';
import VehiculesList from './components/Vehicules/vehiculesList';
import Vehicule from './components/Vehicules/vehicule';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import DemandesList from './components/Problemes/demandesList';
import { DeclarationProbleme } from './components/Problemes/declarationProbleme/declarationProbleme';
import Probleme from './components/Problemes/probleme';
import EmployeesList from './components/Employees/employeesList';
import { AddRole } from './components/Employees/employeesList/add_role';
import { AjouterEmployee } from './components/Employees/addEmployee/ajouterEmployee';
import BonTravailList from './components/BonTravail/bt_list';
import BonTravail from './components/BonTravail/bon_travail';
import { Register } from './components/Authentification/Register';
import EditProfile from './components/Employees/editProfil';
import Dashboard from './components/Dashboared';
import NewPlan from './components/Vehicules/vehicule/shared/plans/new_plan';
import SetReminder from './components/Reminders/setReminder';
import RemindersList from './components/Reminders/remindersList';
import Plan from './components/Vehicules/vehicule/shared/plans/plan';
type HeaderProps = {
  children: React.ReactNode;
};

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS
        theme={{ colorScheme, primaryShade: { light: 9, dark: 7 }, breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        }, }}
      >
        <NotificationsProvider>
        <ModalsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainContainer />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path='/profil/:id' element={<EditProfile />}></Route>
            <Route path="/vehicules" element={<VehiculesList />}></Route>
            <Route path="/vehicules/add_vehicule" element={<AddVehicule />} />
            <Route path="/vehicules/vehicule/:vehicule_id" element={<Vehicule />}/>
            <Route path="/vehicules/vehicule/:vehicule_id/new_plan" element={<NewPlan />}/>
            <Route path="/problemes" element={<DemandesList />}></Route>
            <Route path="/problemes/declare_probleme" element={<DeclarationProbleme />}></Route>
            <Route path="/problemes/demande_intervention/:probleme_id" element={<Probleme />} />
            <Route path="/employees" element={<EmployeesList />}></Route>
            <Route path="/employees/add_role" element={<AddRole />}></Route>
            <Route path="/employees/add_employee" element={<AjouterEmployee />}></Route>
            <Route path="/comptes_rendus" element={<BonTravailList />}></Route>
            <Route path="/comptes_rendus/bon_travail/:bt_id" element={<BonTravail />}></Route>
            <Route path="/interventions" element={<BonTravailList />}></Route>
            <Route path="/interventions/bon_travail/:bt_id" element={<BonTravail />}></Route>
            <Route path='/rappels' element={<RemindersList />}/>
            <Route path="/rappels/set_reminder" element={<SetReminder />}/>
            <Route path="/plans/plan/:pm_id" element={<Plan />}/>
            <Route path="/" element={<Navigate to="/dashboard" replace/>}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Registre" element={<Register />} />
        </Routes>
        </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
