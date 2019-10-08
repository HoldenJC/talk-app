import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default ({ children, tip, onClick, btnClassName, tipClassName, placement }) => (
	<Tooltip title={tip} className={tipClassName} placement={placement}>
		{tip === 'comments' ? (
			<IconButton
				onClick={onClick}
				className={btnClassName}
				disabled
				disableFocusRipple
				disableRipple
				disableTouchRipple
			>
				{children}
			</IconButton>
		) : (
			<IconButton onClick={onClick} className={btnClassName}>
				{children}
			</IconButton>
		)}
	</Tooltip>
)
