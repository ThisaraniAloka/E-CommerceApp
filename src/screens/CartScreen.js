import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const CartScreen = ({ route }) => {
    const [cartItems, setCartItems] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const navigation = useNavigation();

    useEffect(() => {
            navigation.setOptions({ headerShown: false });
        }, [navigation]);

    React.useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem("cart");
                if (storedCart) {
                    let cart = JSON.parse(storedCart);

                    cart = cart.map(item => ({
                        ...item,
                        price: parseFloat(item.price.toString().replace(/[^0-9.]/g, "")),
                        quantity: item.quantity ? item.quantity : 1
                    }));

                    setCartItems(cart);
                }
            } catch (error) {
                console.log("Error loading cart", error);
            }
        };
        loadCart();
    }, []);

    // Recalculate total whenever cartItems change
    React.useEffect(() => {
        calculateTotal(cartItems);
    }, [cartItems]);

    const updateQuantity = async (itemId, action) => {
        try {
            const updatedCart = cartItems.map(item => {
                if (item.id === itemId) {
                    let newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
                    newQuantity = Math.max(newQuantity, 1); // Ensure at least 1
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.log("Error updating quantity", error);
        }
    };

    const removeItemFromCart = async (itemId) => {
        try {
            const updatedCart = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.log("Error removing item from cart", error);
        }
    };

    const calculateTotal = (cart) => {
        let totalPrice = 0;
        cart.forEach(item => {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity, 10);
            if (!isNaN(price) && !isNaN(quantity)) {
                totalPrice += price * quantity;
            }
        });
        setTotal(totalPrice);
    };

    const handleCheckout = () => {
        navigation.navigate("Checkout");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Cart</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>My cart is empty</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity 
                                        style={styles.quantityButton} 
                                        onPress={() => updateQuantity(item.id, "decrease")}
                                    >
                                        <Text style={styles.quantityText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityValue}>{item.quantity}</Text>
                                    <TouchableOpacity 
                                        style={styles.quantityButton} 
                                        onPress={() => updateQuantity(item.id, "increase")}
                                    >
                                        <Text style={styles.quantityText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => removeItemFromCart(item.id)}
                            >
                                <Text style={styles.deleteText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        color: "gray",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 16,
        color: "gray",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quantityButton: {
        backgroundColor: "#ddd",
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#9F3400",
        padding: 8,
        borderRadius: 5,
    },
    deleteText: {
        color: "white",
        fontWeight: "bold",
    },
    totalContainer: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    checkoutButton: {
        backgroundColor: "#9F3400",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    checkoutText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default CartScreen;
