import React from 'react';
import Login from './views/pages/login/Login';
import AddPersonel from './views/pages/addPersonel/AddPersonel';
import AddBranch from './views/pages/addBranch/AddBranch';
import AddVehicle from './views/pages/addVehicle/AddVehicle';
import AssignVehicleToPersonel from './views/pages/assignVehicleToPersonel/AssignVehicleToPersonel';
import AddPersonelsToBranch from './views/pages/addPersonelsToBranch/AddPersonelsToBranch';
import BranchDetail from './views/pages/branchDetail/BranchDetail';
import Dashboard from './views/pages/dashboard/Dashboard';


const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/addPersonel', name: 'AddPersonel', element: AddPersonel },
  { path: '/addBranch', name: 'AddBranch', element: AddBranch },
  { path: '/addVehicle', name: 'AddVehicle', element: AddVehicle },
  {
    path: '/assignVehicleToPersonel',
    name: 'AssignVehicleToPersonel',
    element: AssignVehicleToPersonel,
  },
  {
    path: '/addPersonelsToBranch',
    name: 'AddPersonelsToBranch',
    element: AddPersonelsToBranch,
  },
  { path: '/branch/:id', name: 'Branch Detail', element: BranchDetail },

];

export { privateRoutes };
