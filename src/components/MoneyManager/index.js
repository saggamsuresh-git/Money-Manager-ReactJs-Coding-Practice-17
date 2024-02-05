import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
// Write your code here
class MoneyManager extends Component {
  state = {
    inputAmount: '',
    inputTitle: '',
    typeOfTransaction: transactionTypeOptions[0].displayText,
    historyList: [],
  }

  onChangeType = event => {
    // console.log(event.target.value)
    this.setState({typeOfTransaction: event.target.value})
  }

  onInputTitleChange = event => {
    // console.log(event.target.value)
    this.setState({inputTitle: event.target.value})
  }

  onInputAmountChange = event => {
    // console.log(event.target.value)
    this.setState({inputAmount: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {inputAmount, inputTitle, typeOfTransaction} = this.state
    const newTransaction = {
      title: inputTitle,
      amount: inputAmount,
      type: typeOfTransaction,
      id: v4(),
    }
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
      inputAmount: '',
      inputTitle: '',
      typeOfTransaction: transactionTypeOptions[0].displayText,
    }))
  }

  deleteTransaction = id => {
    // console.log('Delete Triggered')
    const {historyList} = this.state
    const filteredList = historyList.filter(each => id !== each.id)
    this.setState({historyList: filteredList})
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expensesAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].optionId) {
        expensesAmount += parseInt(eachTransaction.amount)
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += parseInt(eachTransaction.amount)
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {historyList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += parseInt(eachTransaction.amount)
      } else {
        expensesAmount += parseInt(eachTransaction.amount)
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const {historyList, inputAmount, inputTitle, typeOfTransaction} = this.state
    // console.log(typeOfTransaction)
    return (
      <div className="bg-container">
        <div className="profile-container">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span className="color">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balance={balanceAmount}
          income={incomeAmount}
          expenses={expensesAmount}
        />
        <div className="history-containers">
          <form onSubmit={this.addTransaction} className="form-container">
            <h1>Add Transaction</h1>
            <div className="title-container">
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                onChange={this.onInputTitleChange}
                value={inputTitle}
              />
            </div>
            <div className="title-container">
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onInputAmountChange}
                value={inputAmount}
              />
            </div>
            <div className="title-container">
              <label htmlFor="dropDown">TYPE</label>
              <select
                id="dropDown"
                className="dropDown"
                onChange={this.onChangeType}
                value={typeOfTransaction}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <div className="history-items-container">
            <h1>History</h1>
            <ul className="table-header-container">
              <li key="tableHeader12345" className="table-header">
                <p className="table-header-cell">Title</p>
                <p className="table-header-cell">Amount</p>
                <p className="table-header-cell">Type</p>
                <span> </span>
                <span> </span>
              </li>
              {historyList.map(each => (
                <li key={each.id}>
                  <TransactionItem
                    details={each}
                    key={each.id}
                    deleteTransaction={this.deleteTransaction}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
