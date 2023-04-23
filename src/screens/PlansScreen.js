import React, { useState, useEffect } from "react";
import db from "../firebase";
import "./PlansScreen.css";

function PlansScreen({ user }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then(querySnapshot => {
                const products = {};
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: priceSnap.id,
                            priceData: priceSnap.data()
                        }
                    });
                });
                setProducts(products);
            });
    }, []);

    console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection("custommers")
            .doc(user.uid)
            .collection("checkout__sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });
        
        docRef.onSnapshot(async (snap) => {
            const { errror, sessionId } = snap.data();
        })
    };

    return (
        <div className="plansScreen">
            {Object.entries(products).map(([productId, productData]) => {
                // TODO add some logic to check if the user subscription is active
                return (
                    <div className="plansScreen__plan">
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.discription}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>
                            Subscribe
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default PlansScreen;
