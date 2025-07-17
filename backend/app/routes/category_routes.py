from flask import Flask, jsonify, request
from app.models.category import Category
app = Flask(__name__)


@app.route('/categories', methods=['GET'])
def list_categories():
    categories = [
        Category("Brands"),
        Category("Hair and Beards"),
        Category("Body"),
        Category("Face"),
        Category("Perfumes")
    ]
    return jsonify([{"id": cat.id, "name": cat.name} for cat in categories])
@app.route('/categories/<int:category_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_category(category_id):
    if request.method == 'GET':
        category = Category("Hair and Beards")
        return jsonify({"id": category.id, "name": category.name})
    
    elif request.method == 'PUT':
        updated_category = Category("Updated Hair and Beards")
        return jsonify({"id": updated_category.id, "name": updated_category.name})
    
    elif request.method == 'DELETE':
        return jsonify({"message": f"Category with id {category_id} deleted successfully"})
if __name__ == '__main__':
    app.run(debug=True)