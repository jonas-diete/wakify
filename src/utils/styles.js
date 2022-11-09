import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emojis: {
      width: 90,
      height: 90,
      borderRadius: 100 / 2,
    },
    rowContainer: {
      flexDirection: 'row',
      marginBottom: 15,
    
    },
    emojiSpacing:{
      marginLeft:15,
      marginRight: 15,
    },

    title: {
      textAlign: 'center',
      marginVertical: 25,
      fontSize: 20,

    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
      elevation: 3,
      width: 180,
      marginVertical: 10,
      backgroundColor: '#FB6E6E',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      textAlign: 'center'
    },

    logoText: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 28,
      paddingHorizontal: 32,
      fontSize: 50,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#FB6E6E',
    },

    captionText: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: 'light',
      lineHeight: 21,
      letterSpacing: 0.25,
      // color: '#245992',
      marginBottom: 20,
    },

    logo: {
      width: 250,
      height: 250,
    },
});




export default styles;