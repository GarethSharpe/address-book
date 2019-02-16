import firebase from "firebase";

const config = {
	projectId: process.env.REACT_APP_PROJECT_ID,
	apiKey: process.env.REACT_APP_API_KEY,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};

firebase.initializeApp(config);

class FirebaseAPI {

  static async getMembers() {
    const snapshot = await firebase.database().ref(`/`).once("value");
    const data = snapshot.val();
		const list = Object.keys(data).map((key) => data[key]);
		list.forEach((value) => {
			value.ts = new Date(value.ts).toLocaleTimeString();
    });
		return list;
	}
	
	static async signIn(email, password) {
		const rv = await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
			return error;
		});
		return rv;
	}
  
}

export default FirebaseAPI;