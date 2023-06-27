import { AppBar, Toolbar, Typography } from '@mui/material'

import Profile from './Profile'

const AppHeader = () => (
	<AppBar position="static" color="transparent">
		<Toolbar>
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				Block History List
			</Typography>
			<Profile />
		</Toolbar>
	</AppBar>
)

export default AppHeader
