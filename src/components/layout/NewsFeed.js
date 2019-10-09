import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// material ui imports
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
	...theme.themeStyle,
	slideDiv       : {
		width  : '100%',
		height : '100%'
	},
	slider         : {
		height         : 397,
		overflow       : 'auto',
		scrollbarWidth : 'none'
	},
	storyImage     : {
		height    : 200,
		objectFit : 'cover',
		display   : 'block',
		margin    : 'auto',
		padding   : '0px 0px 10px 0px'
	},
	slideDiv       : {
		marginBottom : 25,
		padding      : 5
	},
	aClass         : {
		color : 'inherit'
	},
	timeStyle      : {
		display   : 'block',
		textAlign : 'center',
		color     : 'rgba(0,0,0,0.3)',
		position  : 'relative',
		bottom    : '5px'
	},
	storyTitle     : {
		fontWeight : 600
	},
	storyDesc      : {
		color : 'rgba(0,0,0,0.5)'
	},
	loadingSpinner : {
		padding   : 15,
		width     : '75%',
		textAlign : 'center',
		objectFit : 'cover'
	}
})

class NewsFeed extends React.Component {
	state = {
		news    : [],
		loading : true
	}
	componentDidMount() {
		axios
			.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=12f761599239415d99ec6007d6f6f87c`)
			.then((res) => {
				console.log(res.data.articles)
				this.setState({
					news    : res.data.articles,
					loading : false
				})
			})
			.catch((err) => console.log(err))
	}

	render() {
		dayjs.extend(relativeTime)
		const { classes } = this.props
		const { news, loading } = this.state

		const newsContent = news.map((story, index) => (
			<a key={index} className={classes.aClass} href={story.url} target="_blank" rel="noopener noreferrer">
				<div className={classes.slideDiv}>
					<div>
						<img
							src={story.urlToImage}
							className={classes.storyImage}
							onError={(i) => (i.target.style.display = 'none')}
						/>
						{console.log(story.urlToImage)}
						{console.log(story.author)}
					</div>
					<span className={classes.timeStyle}>{dayjs(story.publishedAt).fromNow()}</span>
					<hr className={classes.stealthSeparator} />
					<span className={classes.storyTitle}>{story.title}</span>
					<hr className={classes.stealthSeparator} />
					<span className={classes.storyDesc}>{story.description}</span>
					<hr className={classes.stealthSeparator} />
					{story.author ? <div>Story by {story.author}</div> : null}
				</div>
			</a>
		))

		const settings = {
			dots           : false,
			infinite       : true,
			fade           : true,
			adaptiveHeight : false,
			arrows         : false,
			lazyLoad       : 'ondemand',
			autoplay       : true,
			autoplaySpeed  : 3000,
			accessiblity   : true,
			speed          : 1000,
			slidesToScroll : 1,
			slidesToShow   : 1
		}
		return (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<Slider {...settings} className={classes.slider}>
						{loading === true ? (
							<CircularProgress size={15} className={classes.loadingSpinner} />
						) : (
							newsContent
						)}
					</Slider>
				</div>
			</Paper>
		)
	}
}

NewsFeed.propTypes = {
	classes : PropTypes.object.isRequired
}

export default withStyles(styles)(NewsFeed)
