import {Component} from 'react'

import TabItem from '../TabItem'
import Thumbnail from '../Thumbnail'

import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props

    this.state = {
      isGameOver: false,
      seconds: 60,
      score: 0,
      category: tabsList[0].tabId,
      imageListItem: imagesList[0],
    }

    this.playAgain = () => {
      this.timerId = setInterval(this.time, 1000)
      this.setState({
        isGameOver: false,
        seconds: 60,
        score: 0,
        category: tabsList[0].tabId,
      })
    }

    this.getFilteredImagesList = () =>
      imagesList.filter(eachImageList => {
        const {category} = this.state
        return eachImageList.category === category
      })

    this.onChangeTabButton = tabId => {
      this.setState({
        category: tabId,
      })
    }

    this.thumbnailButtonClicked = clickedId => {
      const {imageListItem} = this.state
      const {id} = imageListItem
      if (id === clickedId) {
        const newImageList =
          imagesList[Math.floor(Math.random() * imagesList.length)]

        this.setState(preveState => ({
          score: preveState.score + 1,
          imageListItem: newImageList,
        }))
      } else {
        clearInterval(this.timerId)
        this.setState({isGameOver: true})
      }
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.time, 1000)
  }

  time = () => {
    this.setState(preveState => ({
      seconds: preveState.seconds - 1,
    }))
  }

  isGameOverOrNot = () => {
    const {seconds, isGameOver} = this.state
    if (seconds === 0 || isGameOver === true) {
      clearInterval(this.timerId)
      return true
    }
    return false
  }

  render() {
    const {category, score, seconds, imageListItem} = this.state
    const filteredImagesList = this.getFilteredImagesList()
    const isGameOver = this.isGameOverOrNot()
    const {tabsList} = this.props
    return (
      <div className="match-game-main-container">
        <nav className="nav-container">
          <div className="nav-content">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
            />
            <div className="score-and-second-container">
              <p className="score">Score: </p>
              <span className="score-count">{score}</span>
              <div className="seconds-container">
                <img
                  className="timer"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                />
                <p>{seconds} sec</p>
              </div>
            </div>
          </div>
        </nav>
        {isGameOver ? (
          <div>out</div>
        ) : (
          <div className="game-bg-container">
            <div className="game-responsive-container">
              <div className="image-container">
                <img
                  className="random-image"
                  src={imageListItem.imageUrl}
                  alt="match"
                />
              </div>
              <div className="tab-container">
                <ul className="tabList-container">
                  {tabsList.map(eachTabList => (
                    <TabItem
                      key={eachTabList.tabId}
                      eachTabList={eachTabList}
                      category={category}
                      onChangeTabButton={this.onChangeTabButton}
                    />
                  ))}
                </ul>
              </div>
              <ul className="thumbnail-container">
                {filteredImagesList.map(eachImageList => (
                  <Thumbnail
                    key={eachImageList.id}
                    eachImageList={eachImageList}
                    thumbnailButtonClicked={this.thumbnailButtonClicked}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
        {isGameOver && (
          <div className="game-over">
            <div className="response">
              <div className="trophy-container">
                <img
                  className="trophy"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="trophy"
                />
                <p>YOUR SCORE</p>
                <p>{score}</p>
                <button
                  onClick={this.playAgain}
                  className="button-play"
                  type="button"
                >
                  <img
                    className="reset"
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                  />
                  <p>PLAY AGAIN</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
