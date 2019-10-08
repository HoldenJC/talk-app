export default {
	palette    : {
		primary   : {
			light        : '#757de8',
			main         : '#3F51B5',
			dark         : '#002984',
			contrastText : '#fff'
		},
		secondary : {
			light        : '#ffb04c',
			main         : '#F57F17',
			dark         : '#bc5100',
			contrastText : '#000'
		}
	},
	themeStyle : {
		typography       : {
			useNextVariants : true
		},
		form             : {
			textAlign : 'center'
		},
		image            : {
			maxWidth : 200,
			margin   : '20px auto 20px auto'
		},
		screenTitle      : {
			margin : '10px auto 10px auto'
		},
		textField        : {
			margin : '10px auto 10px auto'
		},
		button           : {
			marginTop : 20,
			position  : 'relative'
		},
		customError      : {
			color     : 'red',
			fontSize  : '0.8rem',
			marginTop : 10
		},
		progress         : {
			position : 'absolute'
		},
		label            : {
			'&$focusedLabel' : {
				color : '#757de8'
			}
		},
		underline        : {
			'&:after' : {
				borderBottom : `2px solid #757de8`
			}
		},
		stealthSeparator : {
			border : 'none',
			margin : 4
		},
		separator        : {
			width        : '100%',
			borderBottom : '1px solid rgba(0,0,0,0.1)',
			marginBottom : '20px'
		}
	}
}
