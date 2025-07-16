from flask import Blueprint, jsonify
from app.models import db, Product, Order, OrderItem
from sqlalchemy import func

analytics_bp = Blueprint('analytics', __name__, url_prefix='/analytics')

@analytics_bp.route('/products')
def product_analytics():
    top_sellers = db.session.query(
        Product.name,
        func.sum(OrderItem.quantity).label('total_sold')
    ).join(OrderItem).group_by(Product.id).order_by(func.sum(OrderItem.quantity).desc()).limit(5).all()

    most_viewed = Product.query.order_by(Product.views.desc()).limit(5).all()

    return jsonify({
        'top_sellers': [{'name': p[0], 'total_sold': p[1]} for p in top_sellers],
        'most_viewed': [{'name': p.name, 'views': p.views} for p in most_viewed]
    })

@analytics_bp.route('/orders')
def order_analytics():
    total_orders = db.session.query(func.count(Order.id)).scalar()

    total_revenue = db.session.query(
        func.sum(OrderItem.quantity * OrderItem.price)
    ).scalar()

    orders_per_day = db.session.query(
        func.date(Order.created_at).label('day'),
        func.count(Order.id)
    ).group_by(func.date(Order.created_at)).all()

    return jsonify({
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'orders_per_day': [{'day': o[0].isoformat(), 'count': o[1]} for o in orders_per_day]
    })
