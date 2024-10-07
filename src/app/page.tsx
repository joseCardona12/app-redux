"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/index";
import { IUser } from "@/interfaces/userInterface";
import { setAuth } from "@/redux/slices/authSlice";
import React, { useState } from "react";

export default function HomeView():React.ReactNode{
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  console.log(auth);
  const initialState: IUser = {
    name: "",
    email: "",
    password: ""
  }
  const [user, setUser] = useState<IUser>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleLogin = ():void =>{
    console.log(user);
    dispatch(setAuth(user));
    console.log(auth);
  }
  return(
    <form>
      <input type="text" name="name" onChange={(e)=>handleChange(e)} />
      <input type="email" name="email" onChange={(e)=>handleChange(e)} />
      <input type="password" name="password" onChange={(e)=>handleChange(e)} />
      <input type="button" value={"Login"} onClick={handleLogin}/>
    </form>
  )
}