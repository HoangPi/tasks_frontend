import { createContext, useContext } from "react"

export type Project = {
    name: string,
    owner: string,
    members: string[],
    description: string,
}

type ProjectContextType = {
    project: Project,
    setProject: React.Dispatch<React.SetStateAction<Project>>
}

export const ProjectContext = createContext<ProjectContextType | null>(null)

export const getProjectContext = () => useContext(ProjectContext)