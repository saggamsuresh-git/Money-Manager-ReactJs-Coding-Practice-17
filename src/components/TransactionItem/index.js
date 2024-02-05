// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, deleteTransaction} = props
  const {title, amount, id, type} = details

  const onDeleteTransaction = () => {
    // console.log('Hello')
    deleteTransaction(id)
  }

  return (
    <div className="transaction-history-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button
        className="delete-btn"
        type="button"
        data-testid="delete"
        onClick={onDeleteTransaction}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </div>
  )
}

export default TransactionItem
