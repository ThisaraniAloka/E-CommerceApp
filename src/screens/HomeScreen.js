import React, { useLayoutEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const products = [
    { id: "1", name: "Gleaming Silver Pendant Necklace", price: "$10", image: require("../assets/uni1.jpg") },
    { id: "2", name: "Chic Satin Party Dress", price: "$24", image: require("../assets/uni2.jpg") },
    { id: "3", name: "Elegant Sleeveless Short Dress", price: "$17", image: require("../assets/uni3.jpg") },
    { id: "4", name: "Gold-Plated Drop Earrings", price: "$11", image: require("../assets/uni4.jpg") },
    { id: "5", name: "Flowing Maxi Long Frock", price: "$27", image: require("../assets/uni5.jpg") },
    { id: "6", name: "Bohemian Style Long Frock", price: "$24", image: require("../assets/uni6.jpg") },
    { id: "7", name: "Classic Stud Earrings", price: "$13", image: require("../assets/uni7.jpg") },
    { id: "8", name: "Diamond-Accent Hoop Earrings", price: "$14", image: require("../assets/uni8.jpg") },
    { id: "9", name: "Sleek Gold Band Ring", price: "$34", image: require("../assets/uni9.jpg") },
    { id: "10", name: "Traditional Silk Saree", price: "$19", image: require("../assets/uni10.jpg") },
    { id: "11", name: "Luxurious Pearl Necklace", price: "$35", image: require("../assets/uni11.jpg") },
    { id: "12", name: "Crystal Teardrop Earrings", price: "$27", image: require("../assets/uni12.jpg") },
    { id: "13", name: "Vintage Charm Necklace", price: "$20", image: require("../assets/uni13.jpg") },
    { id: "14", name: "Office pink trouser", price: "$19", image: require("../assets/uni14.jpg") },
];

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null,
        });
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search products..." placeholderTextColor={"gray"} />
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                    { id: "1", name: "Saree", image: require("../assets/carousel1.jpg") },
                    { id: "2", name: "Skirt", image: require("../assets/carousel2.jpg") },
                    { id: "3", name: "Party Wear", image: require("../assets/carousel3.jpg") },
                    { id: "4", name: "Office Wear", image: require("../assets/carousel4.jpg") },
                    { id: "5", name: "Long Frock", image: require("../assets/carousel5.jpg") },
                    { id: "6", name: "Crop Top", image: require("../assets/carousel6.jpg") },
                ].map((item) => (
                    <View key={item.id} style={styles.carouselItem}>
                        <Image source={item.image} style={styles.carouselImage} />
                        <Text style={styles.carouselText}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate("ProductDetails", { product: item })}>
                        <Image source={item.image} style={styles.productImage} />
                        <TouchableOpacity style={styles.cartIcon}>
                            <Icon name="shopping-cart" size={16} color="white" />
                        </TouchableOpacity>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <View style={styles.productFooter}>
                                <Text style={styles.productPrice}>{item.price}</Text>
                                <View style={styles.rating}>
                                    <Text style={styles.ratingText}>4.5</Text>
                                    <Icon name="star" size={14} color="orange" />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Home")}>
                    <Icon name="home" size={24} color="black" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Cart")}>
                    <Icon name="shopping-cart" size={24} color="black" />
                    <Text style={styles.footerText}>Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Account")}>
                    <Icon name="user" size={24} color="black" />
                    <Text style={styles.footerText}>Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        paddingHorizontal: 10,
        width: 300,
        height: 35,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 16,
    },
    searchInput: {
        flex: 1,
        height: "100%",
        fontSize: 14,
    },
    carouselItem: {
        alignItems: "center",
        marginRight: 15,
        width: 110,
        position: "relative",
    },
    carouselImage: {
        width: 100,
        height: 200,
        borderRadius: 10,
    },
    carouselText: {
        position: "absolute",
        bottom: -5,
        left: "5%",
        right: "20%",
        width: "90%",
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        paddingVertical: 5,
        textAlign: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    productCard: {
        flex: 1,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        overflow: "hidden",
        position: "relative",
    },
    productImage: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cartIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "black",
        padding: 5,
        borderRadius: 20,
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    productFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },
    productPrice: {
        backgroundColor: "#9F3400",
        color: "white",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 15,
        fontSize: 12,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 12,
        marginRight: 3,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: "#f8f8f8",
    },
    footerItem: {
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        marginTop: 5,
    },
});

export default HomeScreen;
