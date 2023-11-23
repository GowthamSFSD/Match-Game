import './index.css'

const TabItem = props => {
  const {eachTabList, category, onChangeTabButton} = props
  const {tabId, displayText} = eachTabList
  const isActive = category === tabId

  const activeClassName = isActive ? 'active-button' : ''
  const buttonClicked = () => {
    onChangeTabButton(tabId)
  }

  return (
    <li>
      <button
        onClick={buttonClicked}
        type="button"
        className={`button ${activeClassName}`}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
