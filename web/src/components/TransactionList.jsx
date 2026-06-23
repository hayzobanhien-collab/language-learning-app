function TransactionList({ transactions, categories }) {
  if (transactions.length === 0) {
    return <p className="empty-state">Chưa có giao dịch nào</p>
  }

  return (
    <div className="transaction-list">
      {transactions.map(transaction => {
        const category = categories[transaction.category]
        return (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {category?.icon || '💰'}
            </div>
            <div className="transaction-info">
              <h4>{category?.name || transaction.category}</h4>
              {transaction.description && (
                <p className="description">{transaction.description}</p>
              )}
              <p className="date">{new Date(transaction.date).toLocaleDateString('vi-VN')}</p>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toLocaleString('vi-VN')} ₫
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TransactionList