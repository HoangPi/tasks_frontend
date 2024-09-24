import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Project } from "../../pages/addproject/contexts/ProjectContext"
import { AxiosClient } from "../../APIs/axiosClient"

type StoredProject = {
    id: number,
    name: string,
    description: string,
    members: string[],
    owner: string
}

export const ProjectsInitState: {items: StoredProject[], choosen: number} = {
    items: [],
    choosen: -1
}

export const projectSlice = createSlice({
    name: 'project',
    initialState: ProjectsInitState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(CreateProject.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload]
        }).addCase(GetProjects.fulfilled, (state, action) => {
            console.log(action.payload)
            state.items = action.payload
        })
    }
})

export const CreateProject = createAsyncThunk('project/create', 
    async (project: Project): Promise<StoredProject> => {
        try{

            const res = await AxiosClient.post('project/create',{
                ...project
            })
            return res.data as StoredProject
        }
        catch(err){
            console.error(err)
            throw new Error("Internal error")
        }
    }
)

export const GetProjects = createAsyncThunk('project/get',
    async (): Promise<StoredProject[]> => {
        try{
            const res = await AxiosClient.get('project')
            return res.data.projects.map((item: any) => ({
                name: item.name,
                id: item.id,
                description: item.description,
                members: item.employees
            }))
            // res.data.projects as StoredProject[] 
        }
        catch(err){
            console.error(err)
            throw new Error("Error")
        }
    }
)

export const { } = projectSlice.actions


export default projectSlice.reducer