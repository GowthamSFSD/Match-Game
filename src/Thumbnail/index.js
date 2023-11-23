import './index.css'

const Thumbnail = props => {
  const {eachImageList, thumbnailButtonClicked} = props
  const {id, thumbnailUrl} = eachImageList
  const thumbnailClicked = () => {
    thumbnailButtonClicked(id)
  }
  return (
    <li className="thumbail-con">
      <button className="button" onClick={thumbnailClicked} type="button">
        <img className="image" alt="thumbnail" src={thumbnailUrl} />
      </button>
    </li>
  )
}

export default Thumbnail
