import { useState } from 'react'

function TransactionForm({ type, categories, onTransactionAdded }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: type,
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: formData.date,
          description: formData.description
        })
      })

      if (response.ok) {
        const newTransaction = await response.json()
        onTransactionAdded(newTransaction)
        
        // Reset form
        setFormData({
          category: '',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          description: ''
        })
        alert('Giao dịch đã được thêm thành công!')
      }
    } catch (error) {
      console.error('Error adding transaction:', error)
      alert('Lỗi khi thêm giao dịch')
    }
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Loại:</label>
        <select 
          name="category" 
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn loại --</option>
          {Object.entries(categories).map(([key, cat]) => (
            <option key={key} value={key}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Số tiền:</label>
        <input 
          type="number" 
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Ngày:</label>
        <input 
          type="date" 
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Ghi chú:</label>
        <input 
          type="text" 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ghi chú (tùy chọn)"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        ➕ Thêm
      </button>
    </form>
  )
}

export default TransactionForm