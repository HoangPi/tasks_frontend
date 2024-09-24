import { createAsyncThunk, createSlice, Store } from "@reduxjs/toolkit"
import { Project } from "../../pages/addproject/contexts/ProjectContext"
import { AxiosClient } from "../../APIs/axiosClient"

type StoredProject = {
    id: number,
    name: string,
    description: string,
    members: string[],
    owner: string
}

export const ProjectsInitState: {items: StoredProject[]} = {
    items: []
}

export const projectSlice = createSlice({
    name: 'project',
    initialState: ProjectsInitState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(CreateProject.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload]
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