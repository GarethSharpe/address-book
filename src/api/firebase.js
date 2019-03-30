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
    const snapshot = await firebase.database().ref('/members').once("value");
		const data = snapshot.val();
		const list = Object.keys(data).map((key) => { 
			data[key].key = key;
			return data[key] 
		});
		list.sort((a, b) => {
			if (a.member < b.member) return -1;
			if (a.member > b.member) return 1;
			return 0;
		});
		return list;
	}
	
	static async signIn(email, password) {
		const rv = await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
			return error;
		});
		return rv;
	}

	static async createUser(email, password) {
		const rv = await firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
			return error;
		});
		return rv;
	}

	static getCurrentUser() {
		return firebase.auth().currentUser;
	}

	static async createFamily(family) {
		const rv = await firebase.database().ref('/members').push(family).catch((error) => {
			return error;
		});
		return rv;
	}

	static async updateFamily(key, family) {
		firebase.database().ref(`/members/${key}`).set(family).catch((error) => {
			return error;
		});
		return true;
	}

	static async deleteFamily(key) {
		firebase.database().ref(`/members/${key}`).remove().catch((error) => {
			return error;
		});
		return true;
	}

	static async isRegistrationOpen() {
		const snapshot = await firebase.database().ref("/registration").once("value");
		const isRegistrationOpen = snapshot.val();
		return isRegistrationOpen;
	}

	static async toggleRegistration(isRegistrationOpen) {
		await firebase.database().ref("/registration").set(isRegistrationOpen)
	}

	static async setAdmin(adminEmail) {
		await firebase.database().ref("/admins").push(adminEmail);
	}

	static async getAdmins() {
		const snapshot = await firebase.database().ref('/admins').once("value");
		const data = snapshot.val();
		const list = Object.keys(data).map((key) => { 
			return data[key] 
		});
		return list;
	}
  
}

export default FirebaseAPI;