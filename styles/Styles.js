import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
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
  diceRow: {
    marginVertical: 15,
    paddingHorizontal: 45,
    justifyContent: 'space-around',
  },
  pointsRow: {
    paddingHorizontal: 45,
    justifyContent: 'space-around',
    marginLeft: 25,
    marginTop: 20,
  },
  pointsToSelectRow: {
    paddingHorizontal: 45,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#b15674',
    width: 150,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  rulesHeadingText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  notifText: {
    fontSize: 18,
    color:'#b15674',
    marginTop: 10,
  },
  statusNotifText: {
    fontSize: 18,
    marginBottom: 10,
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
  scoreboardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  rankCell: {
    flex: 1,
    marginRight: 15,
  },
  nameCell: {
    flex: 3,
  },
  dateCell: {
    flex: 3,
  },
  timeCell: {
    flex: 2,
  },
  pointCell: {
    flex: 3,
  },
  clearButton: {
    marginTop: 25,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#D3212D',
    width: 200,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});