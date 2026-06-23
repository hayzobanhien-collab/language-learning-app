from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JSON_SORT_KEYS'] = False

# Sample data structure
transactions = []

# Categories
INCOME_CATEGORIES = {
    "salary": {"name": "Lương", "icon": "💵"},
    "allowance": {"name": "Phụ cấp", "icon": "📈"},
    "bonus": {"name": "Thưởng", "icon": "🎁"}
}

EXPENSE_CATEGORIES = {
    "rent": {"name": "Tiền nhà", "icon": "🏠"},
    "food": {"name": "Tiền ăn", "icon": "🍽️"},
    "utilities": {"name": "Tiền điện nước", "icon": "💡"},
    "living": {"name": "Phí sinh hoạt", "icon": "📋"},
    "travel": {"name": "Tiền du lịch", "icon": "✈️"},
    "social": {"name": "Tiền giao lưu", "icon": "🎯"}
}

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Chi Tiêu App Backend is running"
    })

@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify({
        "income": INCOME_CATEGORIES,
        "expense": EXPENSE_CATEGORIES
    })

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """Get all transactions"""
    return jsonify({
        "total": len(transactions),
        "data": transactions
    })

@app.route('/api/transactions', methods=['POST'])
def create_transaction():
    """Create new transaction"""
    data = request.get_json()
    
    # Validation
    if not all(k in data for k in ['type', 'category', 'amount', 'date']):
        return jsonify({"error": "Missing required fields"}), 400
    
    transaction = {
        "id": len(transactions) + 1,
        "type": data['type'],  # 'income' or 'expense'
        "category": data['category'],
        "amount": data['amount'],
        "date": data['date'],
        "description": data.get('description', ''),
        "created_at": datetime.now().isoformat()
    }
    
    transactions.append(transaction)
    return jsonify(transaction), 201

@app.route('/api/transactions/<int:id>', methods=['GET'])
def get_transaction(id):
    """Get single transaction"""
    transaction = next((t for t in transactions if t['id'] == id), None)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404
    return jsonify(transaction)

@app.route('/api/transactions/<int:id>', methods=['PUT'])
def update_transaction(id):
    """Update transaction"""
    data = request.get_json()
    transaction = next((t for t in transactions if t['id'] == id), None)
    
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404
    
    transaction.update({
        "type": data.get('type', transaction['type']),
        "category": data.get('category', transaction['category']),
        "amount": data.get('amount', transaction['amount']),
        "date": data.get('date', transaction['date']),
        "description": data.get('description', transaction['description'])
    })
    
    return jsonify(transaction)

@app.route('/api/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    """Delete transaction"""
    global transactions
    transaction = next((t for t in transactions if t['id'] == id), None)
    
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404
    
    transactions = [t for t in transactions if t['id'] != id]
    return jsonify({"message": "Transaction deleted"}), 200

@app.route('/api/summary', methods=['GET'])
def get_summary():
    """Get income/expense summary"""
    total_income = sum(t['amount'] for t in transactions if t['type'] == 'income')
    total_expense = sum(t['amount'] for t in transactions if t['type'] == 'expense')
    
    return jsonify({
        "total_income": total_income,
        "total_expense": total_expense,
        "net": total_income - total_expense
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, port=port)