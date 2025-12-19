import { createContext } from "../../features/preact";
import { useContext } from "../../features/preact/hooks";

export interface NavbarContextValues {
    itemChanged: (content: any) => void;
};

export const NavbarContext = createContext<Partial<NavbarContextValues>>({});

export function useNavbarContext() : NavbarContextValues
{ 
    return useContext(NavbarContext) 
}