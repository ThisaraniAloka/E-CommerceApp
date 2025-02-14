import React, { useState, useEffect } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, ScrollView, 
    StyleSheet, Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const CheckoutScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
            navigation.setOptions({ headerShown: false });
        }, [navigation]);

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [coupon, setCoupon] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = () => {
        if (!fullName || !address || !contact) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }
        if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
            Alert.alert("Error", "Please enter your card details.");
            return;
        }
        if (paymentMethod === "paypal" && !paypalEmail) {
            Alert.alert("Error", "Please enter your Paypal email.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert("Success", "Your order has been placed!");
        }, 2000);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Checkout</Text>

            {/* User Details */}
            <View style={styles.section}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="John Doe" 
                    value={fullName} 
                    onChangeText={setFullName} 
                />

                <Text style={styles.label}>Address</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="123, Main Street, City" 
                    value={address} 
                    onChangeText={setAddress} 
                />

                <Text style={styles.label}>Contact Number</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="+1234567890" 
                    value={contact} 
                    onChangeText={setContact} 
                    keyboardType="phone-pad" 
                />
            </View>

            {/* Payment Methods */}
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <View style={styles.paymentMethods}>
                <TouchableOpacity 
                    style={[styles.paymentOption, paymentMethod === "card" && styles.selected]} 
                    onPress={() => setPaymentMethod("card")}
                >
                    <Icon name="credit-card" size={20} color={paymentMethod === "card" ? "#fff" : "#333"} />
                    <Text style={[styles.paymentText, paymentMethod === "card" && styles.selectedText]}>Credit/Debit Card</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.paymentOption, paymentMethod === "paypal" && styles.selected]} 
                    onPress={() => setPaymentMethod("paypal")}
                >
                    <Icon name="paypal" size={20} color={paymentMethod === "paypal" ? "#fff" : "#333"} />
                    <Text style={[styles.paymentText, paymentMethod === "paypal" && styles.selectedText]}>Paypal</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.paymentOption, paymentMethod === "cod" && styles.selected]} 
                    onPress={() => setPaymentMethod("cod")}
                >
                    <Icon name="money" size={20} color={paymentMethod === "cod" ? "#fff" : "#333"} />
                    <Text style={[styles.paymentText, paymentMethod === "cod" && styles.selectedText]}>Cash on Delivery</Text>
                </TouchableOpacity>
            </View>

            {/* Conditional Inputs for Payment Methods */}
            {paymentMethod === "card" && (
                <View style={styles.section}>
                    <Text style={styles.label}>Card Number</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="1234 5678 9012 3456" 
                        value={cardNumber} 
                        onChangeText={setCardNumber} 
                        keyboardType="numeric" 
                    />

                    <Text style={styles.label}>Expiry Date</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="MM/YY" 
                        value={expiryDate} 
                        onChangeText={setExpiryDate} 
                        keyboardType="numeric" 
                    />

                    <Text style={styles.label}>CVV</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="123" 
                        value={cvv} 
                        onChangeText={setCvv} 
                        keyboardType="numeric" 
                    />
                </View>
            )}

            {paymentMethod === "paypal" && (
                <View style={styles.section}>
                    <Text style={styles.label}>Paypal Email</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="youremail@paypal.com" 
                        value={paypalEmail} 
                        onChangeText={setPaypalEmail} 
                    />
                </View>
            )}

            {/* Coupon */}
            <View style={styles.section}>
                <Text style={styles.label}>Coupon Code</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter coupon code" 
                    value={coupon} 
                    onChangeText={setCoupon} 
                />
            </View>

            {/* Checkout Button */}
            <TouchableOpacity style={styles.button} onPress={handleCheckout} disabled={isLoading}>
                {isLoading ? (
                    <Text style={styles.buttonText}>Processing...</Text>
                ) : (
                    <Text style={styles.buttonText}>Confirm Order</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    section: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15 },
    label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginTop: 5, fontSize: 16 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    paymentMethods: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15 },
    paymentOption: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ccc", marginBottom: 10 },
    selected: { backgroundColor: "#9F3400", borderColor: "#DE4800" },
    paymentText: { marginLeft: 10, fontSize: 16 },
    selectedText: { color: "#fff" },
    button: { backgroundColor: "#9F3400", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20 },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default CheckoutScreen;
