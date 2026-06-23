import { useEffect, useState } from 'react'

function Summary({ transactions }) {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    net: 0
  })

  useEffect(() => {
    const total_income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const total_expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    setSummary({
      total_income,
      total_expense,
      net: total_income - total_expense
    })
  }, [transactions])

  return (
    <div className="summary">
      <div className="summary-card income">
        <h3>💵 Tổng Thu Nhập</h3>
        <p className="amount">{summary.total_income.toLocaleString('vi-VN')} ₫</p>
      </div>

      <div className="summary-card expense">
        <h3>💸 Tổng Chi Tiêu</h3>
        <p className="amount">{summary.total_expense.toLocaleString('vi-VN')} ₫</p>
      </div>

      <div className={`summary-card net ${summary.net >= 0 ? 'positive' : 'negative'}`}>
        <h3>💰 Số Dư</h3>
        <p className="amount">
          {summary.net >= 0 ? '+' : '-'} {Math.abs(summary.net).toLocaleString('vi-VN')} ₫
        </p>
      </div>
    </div>
  )
}

export default Summary