import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilBuilding,
  cilCalculator,
  cilCarAlt,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHome,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Genel Bakış',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Personel Ekle',
    to: '/addPersonel',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Araç Ekle',
    to: '/addVehicle',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Araç ve Personel Atama',
    to: '/assignVehicleToPersonel',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Şube Ekle',
    to: '/addBranch',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Şube ve Personel Atama',
    to: '/addPersonelsToBranch',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
];

export default _nav;
