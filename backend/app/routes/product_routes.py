from flask import Flask, jsonify, request
from app.models.product import Product

app = Flask(__name__)

@app.route('/')
def products():
    return "https://player.vimeo.com/video/871463199?h=bf967a15de" 

@app.route('/products', methods=['GET'])
def list_products():
   Products = [
        Product("Marini Naturals Shampoo", "A gentle shampoo for all hair types.", 15.99, "https://example.com/shampoo.jpg", "Hair and Beards"),
        Product("Marini Naturals Conditioner", "A nourishing conditioner for healthy hair.", 17.99, "https://example.com/conditioner.jpg", "Hair and Beards"),
        Product("Marini Naturals Body Wash", "A refreshing body wash with natural ingredients.", 12.99, "https://example.com/bodywash.jpg", "Body"),
        Product("Marini Naturals Face Cream", "A hydrating face cream for all skin types.", 20.99, "https://example.com/facecream.jpg", "Face"),
        Product("Marini Naturals Perfume", "A long-lasting perfume with a unique scent.", 45.99, "https://example.com/perfume.jpg", "Perfumes"),
        Product("Nivea", "Nivea Moisturizing Cream", "A rich cream for dry skin.", 10.99, "https://example.com/cream.jpg", "Face"),
        Product("Dove", "Dove Body Wash", "A nourishing body wash for soft skin.", 12.99, "https://example.com/bodywash.jpg", "Body"),
       
    ]
   return jsonify([{"id": prod.id, "name": prod.name, "description": prod.description, "price": prod.price, "image_url": prod.image_url, "category": prod.category} for prod in products])

@app.route('/products/<int:product_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_product(product_id):
    if request.method == 'GET':
        product = Product("Marini Naturals Shampoo", "A gentle shampoo for all hair types.", 15.99, "https://example.com/shampoo.jpg", "Hair and Beards")
        return jsonify({"id": product.id, "name": product.name, "description": product.description, "price": product.price, "image_url": product.image_url, "category": product.category})
    
    elif request.method == 'PUT':
        updated_product = Product("Updated Marini Naturals Shampoo", "An updated gentle shampoo for all hair types.", 16.99, "https://example.com/updated_shampoo.jpg", "Hair and Beards")
        return jsonify({"id": updated_product.id, "name": updated_product.name, "description": updated_product.description, "price": updated_product.price, "image_url": updated_product.image_url, "category": updated_product.category})
    
    elif request.method == 'DELETE':
        return jsonify({"message": f"Product with id {product_id} deleted successfully"})
       

if __name__ == '__main__':
    app.run(debug=True)
    