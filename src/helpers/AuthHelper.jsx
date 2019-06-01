import { Redirect, Route } from "react-router-dom";
import React from "react";

export const ROLES = {
  MANAGER: 1,
  USER: 2
};

export function checkUserRole() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user)
    if (user.managing_org) {
      return ROLES.MANAGER;
    } else {
      return ROLES.USER;
    }
}

export function checkUserLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return true;
  } else {
    return false;
  }
}
