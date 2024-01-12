import { ROLES } from '../constants/roles.js'; 

export const isClient = () => {
  const userRole = localStorage.getItem('role_id');
  return userRole === ROLES.CLIENT;
};

export const isAdmin = () => {
  const userRole = localStorage.getItem('role_id');
  return userRole === ROLES.ADMIN;
};
