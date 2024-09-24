import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosClient } from "../../APIs/axiosClient"

type Employee = {
    id: number,
    username: string,
    name: string
}

const employeeInitValue: {items: Employee[]} = {
    items: []
}

export const employeeSlice = createSlice({
    name: "employee",
    initialState: employeeInitValue,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getEmployees.fulfilled, (state,action) => {
            state.items = action.payload
        })
    }
})

export const getEmployees = createAsyncThunk('employee/get',
    async (): Promise<Employee[]> => {
        try{
            const res = await AxiosClient.get('user/employee')
            return res.data.employees
        }
        catch(err){
            throw err
        }
    }
)

export const {  } = employeeSlice.actions

export default employeeSlice.reducer