import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'pink', // Match gradient background
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: 20, // Prevent overlapping with the notch
        paddingBottom: 15,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute back button, title, and logo
    },
    backButton: {
        marginLeft: 10,
        padding: 5,
        marginRight: '5%',
    },
    placeholder: {
        width: '19%', // Same width as the back button to maintain alignment
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center', // Center the title
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    logoWrapper: {
        marginRight: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default styles;