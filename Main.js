import React from "react";
import DrawerNavigation from "./navigation/DrawerNavigation";
import StackNavigator from "./navigation/StackNavigator";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <>{user?.role == "admin" ? <DrawerNavigation /> : <StackNavigator />}</>
  );
};

export default Main;
