package it4409.group33;

import it4409.group33.Model.Cart;
import it4409.group33.Model.Order;
import it4409.group33.Repository.CartRepository;
import it4409.group33.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order createOrderFromCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for user id: " + userId);
        }
        Order order = new Order();
        order.setProductJsonArray(cart.getProductJsonArray());
        order.setUserId(cart.getUserId());
        order.setTotal(cart.getTotal());
        order.setDiscountedPrice(cart.getDiscountedPrice());
        order.setTotalQuantity(cart.getTotalQuantity());
        order.setTotalProducts(cart.getTotalProducts());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.CREATED);
        orderRepository.save(order);
        cartRepository.delete(cart);
        return order;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getAllStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByUserIdAndStatus(Long userId,Order.OrderStatus status) {
        return orderRepository.findByUserIdAndStatus(userId,status);
    }

    public Order updateOrderStatusToPaid(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.CREATED) {
                order.setStatus(Order.OrderStatus.AWAITING_SHIPMENT);
                return orderRepository.save(order);
            } else {
                throw new RuntimeException("Order status is not 'CREATED', cannot be updated to 'PAID'.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToShipping(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.AWAITING_SHIPMENT) {
                order.setStatus(Order.OrderStatus.SHIPPING);
                return orderRepository.save(order);
            } else {
                throw new RuntimeException("Order status is not 'AWAITING_SHIPMENT', cannot be updated to 'SHIPPING'.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToDelivered(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.SHIPPING) {
                order.setStatus(Order.OrderStatus.DELIVERED);
                return orderRepository.save(order);
            } else {
                throw new RuntimeException("Order status is not 'SHIPPING', cannot be updated to 'DELIVERED'.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToCompleted(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getStatus() == Order.OrderStatus.DELIVERED) {
                order.setStatus(Order.OrderStatus.COMPLETED);
                return orderRepository.save(order);
            } else {
                throw new RuntimeException("Order status is not 'DELIVERED', cannot be updated to 'COMPLETED'.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToCancelled(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Order.OrderStatus currentStatus = order.getStatus();
            if (currentStatus == Order.OrderStatus.CREATED ||
                    currentStatus == Order.OrderStatus.AWAITING_SHIPMENT ||
                    currentStatus == Order.OrderStatus.SHIPPING ||
                    currentStatus == Order.OrderStatus.DELIVERED) {
                order.setStatus(Order.OrderStatus.CANCELLED);
                return orderRepository.save(order);
            } else {
                throw new RuntimeException("Order status is not eligible for cancellation.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    public Order updateOrderStatusToRefunded(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Order.OrderStatus currentStatus = order.getStatus();
            if (currentStatus == Order.OrderStatus.DELIVERED || currentStatus == Order.OrderStatus.CANCELLED) {
                order.setStatus(Order.OrderStatus.REFUNDED);
                return orderRepository.save(order);
            } else {
                throw new RuntimeException("Order status is not eligible for refund.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }
}

