import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import InputBar from "./InputBar";

export default function WelcomeView({scrollToBottom, sendMessage, setInputBarText, inputBarText}){
    return(
        <View style={styles.container}>
            {/* PART 1: The Hero Banner */}
            <View style={styles.heroBanner}>
                <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format' }} 
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                <View style={styles.heroOverlay}>
                    <Text style={styles.heroTitle}>Bleibleh Barber Co.</Text>
                    <Text style={styles.heroSubtitle}>Precision Cuts • Modern Style</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* PART 3: Updated Sample Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.chip} onPress={() => sendMessage("Buzz Cut")}>
                        <Text style={styles.chipText}>Buzz Cut</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.chip} onPress={() => sendMessage("Regular Cut")}>
                        <Text style={styles.chipText}>Regular Cut</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chip} onPress={() => sendMessage("Taper Fade")}>
                        <Text style={styles.chipText}>Taper Fade</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.introBox}>
                    <Text variant="bodyLarge" style={styles.introText}>
                        Ready for a fresh look? Select a service above or tell us what you're looking for.
                    </Text>
                </View>
            </ScrollView>

            {/* PART 2: Fixed Chat Input Footer */}
            <View style={styles.inputFooter}>
                <InputBar 
                    onSendPressed={sendMessage} 
                    onSizeChange={() => scrollToBottom(false)}
                    onChangeText={setInputBarText}
                    text={inputBarText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroBanner: {
        width: '100%',
        height: 200, 
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.5, 
    },
    heroOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroTitle: {
        color: 'white',
        fontSize: 34,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    heroSubtitle: {
        color: '#f0f0f0',
        fontSize: 16,
        marginTop: 5,
        fontWeight: '500',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 25,
        gap: 12,
        flexWrap: 'wrap',
    },
    chip: {
        backgroundColor: '#1a1a1a', 
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 25, 
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    chipText: {
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 14,
    },
    introBox: {
        paddingHorizontal: 40,
        alignItems: 'center',
    },
    introText: {
        textAlign: 'center',
        color: '#444',
        fontSize: 15,
        lineHeight: 22,
    },
    inputFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#eee',
    }
});