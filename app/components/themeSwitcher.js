"use client";

import {useTheme} from "next-themes";
import {Skeleton, Switch} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MoonStarsFill, SunFill } from "react-bootstrap-icons";

export default function ThemeSwitcher() {

  const { theme, setTheme } = useTheme()

  const [isSelected, setIsSelected] = useState(theme == "dark" ? true : false);
  const [isMounted, setIsMounted] = useState(false)
  function handleChange(e){
    setTheme(isSelected ? "light" : "dark")
    setIsSelected(e)
  }
  useEffect(() => {
    setIsMounted(true)
  },[])
  if(isMounted){
    return(
        <Switch isSelected={isSelected} onValueChange={(e) => handleChange(e)} startContent={<SunFill/>} endContent={<MoonStarsFill/>}/>
    )
  }
  else{
    return <Skeleton className="flex rounded-full w-[48px] h-[28px]"/>
  }


};