import { Redirect, Route } from "react-router-dom";
import React from "react";

export const ROLES = {
  MANAGER: 1,
  USER: 2
};

export const USER_TYPE = {
  ADMIN: 1,
  REGISTRAR: 2,
  USER: 3
};

export function checkUserRole() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user)
    if (user.managing_org) {
      return ROLES.MANAGER;
    } else {
      return ROLES.USER;
    }
}

export function loggedInUserType() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    return user.user_type;
  }
  return "";
}

export function checkUserLogin() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    return true;
  } else {
    return false;
  }
}

export function getCurrentUser() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user;
}
