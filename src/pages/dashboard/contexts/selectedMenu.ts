import { createContext, useContext, useState } from "react"

type ItemContextType = {
    item: number,
    setItem: React.Dispatch<React.SetStateAction<number>>
}
export const ItemContext = createContext<ItemContextType | null>(null)

export const getItemContext = () => useContext(ItemContext)