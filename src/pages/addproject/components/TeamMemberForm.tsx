import Grid from '@mui/material/Grid2';
import { getProjectContext } from '../contexts/ProjectContext';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { useDebounce } from "@uidotdev/usehooks"
import { AxiosClient } from '../../../APIs/axiosClient';


export default function PaymentForm() {
  const projectContext = getProjectContext()
  const [search, setSearch] = useState('')
  const [foundUsers, setFoundUsers] = useState<string[]>([])
  const debouncedValue = useDebounce(search, 1500)
  useEffect(() => {
    if (!debouncedValue) {
      return
    }
    AxiosClient.post('/user/find', {
      username: debouncedValue,
      exclude: projectContext?.project.members
    }).then(res => {
      return res.data.map((item: any) => {
        return item.username
      })
    }).then((users) => {
      setFoundUsers(users)
    })
  }, [debouncedValue])
  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 12}}>

      <Autocomplete
        size='medium'
        disablePortal
        options={foundUsers}
        value={search}
        onInputChange={(ev: any)=> ev?.target?.value && setSearch(ev.target.value)}
        sx={{ width: 300 }}
        onBlur={()=>setSearch('')}
        renderInput={(params) => {
          return <TextField {...params} label={"Teammate"}></TextField>
        }}
        onChange={(_,value) => {
          if(!value) return
          setSearch('')
          setFoundUsers([])
          projectContext?.setProject(p=>({...p, members: [...projectContext.project.members, value]}))
        }}
      ></Autocomplete>
      </Grid>

      {projectContext?.project.members.map((item, key) => (<React.Fragment key={key}>
        <Grid size={{ xs: 3 }} key={key}>
          <Chip
            label={item}
            variant='outlined'
            onDelete={() => { projectContext.setProject(p => ({
              ...p,
              members: projectContext.project.members.filter(value => (value !== item))
            })) }}
          />
        </Grid>
      </React.Fragment>))}
    </Grid>
  );
}
