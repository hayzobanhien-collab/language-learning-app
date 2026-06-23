import { useState, useEffect } from 'react'
import './App.css'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState({ income: {}, expense: {} })

  useEffect(() => {
    fetchCategories()
    fetchTransactions()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions')
      const data = await response.json()
      setTransactions(data.data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Chi Tiêu App</h1>
        <p>Quản lý tài chính của bạn</p>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Tổng Quan
        </button>
        <button 
          className={`nav-btn ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
        >
          💵 Thu
        </button>
        <button 
          className={`nav-btn ${activeTab === 'expense' ? 'active' : ''}`}
          onClick={() => setActiveTab('expense')}
        >
          💸 Chi
        </button>
        <button 
          className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📜 Lịch Sử
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'overview' && (
          <section className="section">
            <Summary transactions={transactions} />
          </section>
        )}

        {activeTab === 'income' && (
          <section className="section">
            <h2>💵 Thêm Thu Nhập</h2>
            <TransactionForm 
              type="income" 
              categories={categories.income}
              onTransactionAdded={handleTransactionAdded}
            />
            <h3>Lịch sử Thu Nhập</h3>
            <TransactionList 
              transactions={transactions.filter(t => t.type === 'income')}
              categories={categories.income}
            />
          </section>
        )}

        {activeTab === 'expense' && (
          <section className="section">
            <h2>💸 Thêm Chi Tiêu</h2>
            <TransactionForm 
              type="expense" 
              categories={categories.expense}
              onTransactionAdded={handleTransactionAdded}
            />
            <h3>Lịch sử Chi Tiêu</h3>
            <TransactionList 
              transactions={transactions.filter(t => t.type === 'expense')}
              categories={categories.expense}
            />
          </section>
        )}

        {activeTab === 'history' && (
          <section className="section">
            <h2>📜 Lịch Sử Giao Dịch</h2>
            <TransactionList 
              transactions={transactions}
              categories={{...categories.income, ...categories.expense}}
            />
          </section>
        )}
      </main>
    </div>
  )
}

export default App