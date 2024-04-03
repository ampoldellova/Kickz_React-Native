import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    Image,
    Pressable,
    TextInput,
    Button,
    Alert,
    Modal,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import Toast from "react-native-toast-message";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import baseurl from "../../assets/common/baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from '@expo/vector-icons';
import filipinoBarwords from 'filipino-badwords-list';
import Filter from 'bad-words';

const ProductDetail = () => {
    const filter = new Filter({ list: filipinoBarwords.array });
    const route = useRoute();
    const navigation = useNavigation();
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const [rating, setRating] = useState(1);
    const [ratings, setRatings] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [SelectedReview, setSelectedReview] = useState(null);
    const [comment, setComment] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const addItemToCart = (item) => {
        Toast.show({
            type: "success",
            text1: "Message",
            text2: "Item successfully added to your cart 🛒",
        });
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };

    const getRatings = async () => {
        console.log(route.params);
        const { data } = await axios.get(
            `${baseurl}ratings/product/${route?.params?.item?._id}`
        );
        setRating(data.rating);
    };

    const handleProductPress = (review) => {
        setSelectedReview(review);
        setComment(review.comment);
        setRatings(review.ratings);
        setModalVisible(true);
    };

    useFocusEffect(
        useCallback(() => {
            getRatings();
        }, [])
    );

    const editComment = async () => {
        const token = await AsyncStorage.getItem("authToken");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        };

        axios
            .put(
                `${baseurl}edit/review/${SelectedReview?._id}`,
                { comment: comment, ratings: ratings },
                config
            )
            .then((res) => {
                setComment("");
                setRatings(1);
                setModalVisible(false); Toast.show({
                    type: 'success',
                    text1: 'Edit Review',
                    text2: 'Your review is edited successfully',
                });
                navigation.goBack();
            })
            .catch((error) => console.log(error));
    };

    const deleteComment = async (id) => {
        axios
            .delete(`${baseurl}delete/review/${id}`)
            .then((res) => {
                Alert.alert("Deleted Review", "Your review is successfully deleted!");
                navigation.navigate("Home");
            })
            .catch((error) => console.log(error));
    };

    const user = useSelector((state) => state.user.user);
    console.log(SelectedReview)
    return (
        <>
            <ImageBackground
                source={require("../../assets/homeBackground.png")}
                style={styles.background}
            >
                <ScrollView
                    style={{ marginTop: 40, flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {route.params.images.map((item, index) => (
                            <ImageBackground
                                style={{ width, height, marginTop: 25, resizeMode: "contain" }}
                                source={{ uri: item }}
                                key={index}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 70,
                                            resizeMode: "contain",
                                            marginTop: -25,
                                            marginLeft: 10,
                                        }}
                                        source={{ uri: route?.params?.brandImage[0] }}
                                    />
                                    <View
                                        style={{
                                            borderRadius: 20,
                                            marginTop: -35,
                                            marginRight: 20,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "bold",
                                                color: route?.params?.stock <= 0 ? "red" : "green",
                                            }}
                                        >
                                            {route?.params?.stock <= 0 ? "Out of Stock" : "In Stock"}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        ))}
                    </ScrollView>

                    <View style={{ padding: 10, backgroundColor: "white" }}>
                        <Text
                            style={{ fontSize: 35, fontWeight: "bold", fontStyle: "italic" }}
                        >
                            {route?.params?.name}
                        </Text>

                        <Text style={{ fontSize: 12, textAlign: "justify", marginTop: 15 }}>
                            {route?.params?.description}
                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "gray",
                                    fontStyle: "italic",
                                    fontSize: 14,
                                    marginRight: 2,
                                }}
                            >
                                Product Ratings:{" "}
                            </Text>
                            <Rating
                                style={{ marginTop: 2.5 }}
                                readonly
                                startingValue={rating}
                                ratingCount={5}
                                imageSize={14}
                            />
                        </View>

                        <Text
                            style={{
                                fontSize: 14,
                                fontStyle: "italic",
                                color: "gray",
                                fontWeight: "bold",
                            }}
                        >
                            Type: {route?.params?.type}
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                fontStyle: "italic",
                                color: "gray",
                                fontWeight: "bold",
                            }}
                        >
                            Colorway: {route?.params?.colorway}
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                fontStyle: "italic",
                                color: "gray",
                                fontWeight: "bold",
                            }}
                        >
                            Size: {route?.params?.size}
                        </Text>

                        <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 15 }}>
                            ₱ {route?.params?.price}
                        </Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginBottom: 60,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}
                    >

                        {route.params?.item?.reviews.length === 0 ? (
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                No Reviews Yet.
                            </Text>
                        ) : (
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                Product Reviews:
                            </Text>
                        )}

                        {route.params?.item?.reviews?.map((review, index) => (
                            <React.Fragment key={index}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 10,
                                        alignItems: "flex-start",
                                        marginTop: 10,
                                    }}
                                >
                                    {review?.user?.image === "" ? (
                                        <Image
                                            source={require("../../assets/user.png")}
                                            style={{ width: 30, height: 30, borderRadius: 30 }}
                                        />
                                    ) : (
                                        <Image
                                            source={{ uri: review?.user?.image }}
                                            style={{ width: 30, height: 30, borderRadius: 30 }}
                                        />
                                    )}
                                    <View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {review?.user?.name}
                                            </Text>

                                            {review?.user?._id === user._id ? (
                                                <>
                                                    {showOptions && (

                                                        <View style={styles.menu}>
                                                            <TouchableHighlight
                                                                style={styles.menuItem}
                                                                onPress={() => {
                                                                    deleteComment(review._id);
                                                                    setShowOptions(false);
                                                                }}
                                                            >
                                                                <Text style={{ color: "red" }}>Delete</Text>
                                                            </TouchableHighlight>
                                                            <TouchableHighlight
                                                                style={styles.menuItem}
                                                                onPress={() => {
                                                                    handleProductPress(review);
                                                                    setShowOptions(false);
                                                                }}
                                                            >
                                                                <Text style={{ color: "#008DDA" }}>Edit</Text>
                                                            </TouchableHighlight>
                                                        </View>
                                                    )}

                                                    <Pressable onPress={() => setShowOptions(!showOptions)} style={{ marginLeft: "auto" }}>
                                                        <Feather name="more-vertical" size={20} color="black" />
                                                    </Pressable>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </View>
                                        <Rating
                                            style={{ alignSelf: "flex-start" }}
                                            readonly
                                            startingValue={review?.ratings}
                                            ratingCount={5}
                                            imageSize={14}
                                        />
                                        <Text
                                            style={{ textAlign: "justify", width: 280, fontSize: 12 }}
                                        >
                                            {filter.clean(review?.comment)}
                                        </Text>
                                    </View>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </ScrollView>

                <Pressable
                    onPress={() => addItemToCart(route?.params?.item)}
                    style={{
                        backgroundColor: "#0F0F0F",
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        height: 50,
                        bottom: 0,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        {addedToCart ? (
                            <Ionicons name="cart-sharp" size={24} color="white" />
                        ) : (
                            <Ionicons name="cart-outline" size={24} color="white" />
                        )}
                        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
                            {addedToCart ? (
                                <Text>Added to Cart</Text>
                            ) : (
                                <Text>Add to Cart</Text>
                            )}
                        </Text>
                    </View>
                </Pressable>
            </ImageBackground>

            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent style={{ width: "100%", height: 400 }}>
                    <Rating
                        ratingCount={5}
                        imageSize={30}
                        startingValue={ratings}
                        minValue={1}
                        showRating
                        onFinishRating={(text) => setRatings(text)}
                    />
                    <Text style={{ fontSize: 16, marginTop: 20 }}>
                        Product: {SelectedReview && SelectedReview.product.name}
                    </Text>

                    <TextInput
                        editable
                        multiline
                        numberOfLines={5}
                        onChangeText={(text) => setComment(text)}
                        placeholder="Enter your review for this product"
                        value={comment}
                        style={{ padding: 10, borderWidth: 1, textAlignVertical: "top", marginTop: 10, borderRadius: 10 }}
                    />
                    <Pressable onPress={editComment} style={{ padding: 10, backgroundColor: "#0F0F0F", marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Submit</Text>
                    </Pressable>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    ></ScrollView>
                </ModalContent>
            </BottomModal>
        </>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        height: "100%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        position: 'absolute',
        top: -37.5,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1,
    },
    menuItemContainer: {
        flexDirection: "row",
    },
    menuItem: {
        padding: 5,
    },
    menuItem: {
        padding: 10,
    },
});
