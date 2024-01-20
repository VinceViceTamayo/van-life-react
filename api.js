import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, doc, getDoc, query, where } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDNYRlYb3qxH5vh0rbXC6sgIbYHpwfl-qs",
  authDomain: "vanlife-52ef5.firebaseapp.com",
  projectId: "vanlife-52ef5",
  storageBucket: "vanlife-52ef5.appspot.com",
  messagingSenderId: "772300220276",
  appId: "1:772300220276:web:33c6df7d3c827498ee2e21"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })

    return dataArr

}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return vanSnapshot.data()

}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
    return dataArr

}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}