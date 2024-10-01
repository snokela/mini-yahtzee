import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    // marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#D8BFD8',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#D8BFD8',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  // gameboard: {
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // gameinfo: {
  //   backgroundColor: '#fff',
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   fontSize: 20,
  //   marginTop: 10
  // },
  diceRow: {
    marginVertical: 15,
    paddingHorizontal: 45,
    justifyContent: 'space-around',

  },
  // pointsRowContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 15,
  // },
  pointsRow: {
    paddingHorizontal: 45,
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginLeft: 25,
    marginTop: 20,
  },
  pointsToSelectRow: {
    paddingHorizontal: 45,
    justifyContent: 'space-around',
    marginBottom: 20,
    // alignItems: 'center',
  },
  // flex: {
  //   flexDirection: "row"
  // },
  button: {
    marginTop: 15,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#D87093',
    width: 150,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:'#38383a',
    fontSize: 18,
    fontWeight: 'bold'
  },
  rulesHeadingText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  notifText: {
    fontSize: 18,
  },
  statusNotifText: {
    fontSize: 18,
    color:'#dc376e'
  },
  notifTextPlayer: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  totalPointsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulesContainer: {
    alignItems: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  paragraph: {
    marginBottom: 5,
  },
  paragraphHeading: {
    fontWeight: 'bold',
  },
  gameboardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});