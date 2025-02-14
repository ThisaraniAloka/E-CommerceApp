import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailsScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [cart, setCart] = React.useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "", 
        });
    }, [navigation]);

    React.useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cart');
                if (storedCart) {
                    setCart(JSON.parse(storedCart));
                }
            } catch (error) {
                console.log("Error loading cart", error);
            }
        };

        loadCart();
    }, []);

    const reviews = [
        { id: 1, message: "Great product! Totally worth the price." },
        { id: 2, message: "Very comfortable and durable. Highly recommend!" },
        { id: 3, message: "Good quality, but the color wasn't exactly what I expected." },
        { id: 4, message: "Amazing experience. Would buy again." },
    ];

    const renderReview = ({ item }) => (
        <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>"{item.message}"</Text>
        </View>
    );

    const handleAddToCart = async () => {
        // Add the product to the cart
        const updatedCart = [...cart, product];
        setCart(updatedCart);

        // Save the updated cart in AsyncStorage
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            // Navigate to the Cart screen and pass the updated cart
            navigation.navigate('Cart', { cartItems: updatedCart });
        } catch (error) {
            console.log("Error saving cart", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <View style={styles.ratingContainer}>
                <Icon name="star" size={20} color="gold" />
                <Text style={styles.ratingText}>4.5</Text>
            </View>

            <Text style={styles.reviewsTitle}>Customer Reviews</Text>
            <FlatList data={reviews} renderItem={renderReview} keyExtractor={(item) => item.id.toString()} horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}/>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate("Checkout", { product })}>
                    <Icon name="shopping-cart" size={20} color="white" />
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.cartButton}
                    onPress={handleAddToCart}
                >
                    <Icon name="cart-plus" size={20} color="white" />
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
    },
    productImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    productPrice: {
        fontSize: 18,
        color: "#9F3400",
        marginTop: 10,
        fontWeight: "bold",
    },
    buyButton: {
        backgroundColor: "#9F3400",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    cartButton: {
        backgroundColor: "#DE4800",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: "45%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        marginLeft: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 16,
        color: "gold",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        position: "absolute",
        bottom: 20,
    },
    reviewsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    carousel: {
        marginTop: 10,
    },
    reviewContainer: {
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 15,
        minHeight: 60,
        maxHeight:80,
    },
    reviewText: {
        fontSize: 14, 
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 5,
    },
});

export default ProductDetailsScreen;
