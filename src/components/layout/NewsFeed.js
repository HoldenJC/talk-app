import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'
import dayjs from 'dayjs'
import NoImg from '../../images/no-img.svg'

// material ui imports
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
	...theme.themeStyle,
	slideDiv   : {
		width  : '100%',
		height : '100%'
	},
	slider     : {},
	storyImage : {
		maxWidth  : '100%',
		objectFit : 'cover',
		padding   : '0px 0px 10px 0px'
	}
})

class NewsFeed extends React.Component {
	state = {
		news : []
	}
	componentDidMount() {
		axios
			.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=12f761599239415d99ec6007d6f6f87c`)
			.then((res) => {
				console.log(res.data.articles)
				this.setState({
					news : res.data.articles
				})
			})
			.catch((err) => console.log(err))
	}

	render() {
		const { classes } = this.props
		const { news } = this.state

		const newsContent = news.map((story, index) => (
			<div key={index} className={classes.slideDiv}>
				<div className="image-wrapper">
					{console.log(story.urlToImage)}
					<img src={story.urlToImage} className={classes.storyImage} />
				</div>
				{dayjs(story.publishedAt).format('h:mm a, MMMM DD YYYY')}
				<hr className={classes.stealthSeparator} />
				{story.title}
			</div>
		))

		const settings = {
			dots           : true,
			infinite       : false,
			arrows         : false,
			accessiblity   : true,
			lazyLoad       : 'progressive',
			speed          : 500,
			slidesToScroll : 1,
			slidesToShow   : 1
		}
		return (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<Slider {...settings} className={classes.slider}>
						{newsContent}
					</Slider>
					<br />
				</div>
			</Paper>
		)
	}
}

NewsFeed.propTypes = {
	classes : PropTypes.object.isRequired
}

export default withStyles(styles)(NewsFeed)
