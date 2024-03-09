import axios from "axios";
import React, {useState, useEffect} from "react";
import Card from "./Card";
import './Deck.css'

function Deck() {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setDeck(res.data.deck_id);
        }
        loadDeck();
    }, []);

    async function drawCard() {
        const draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);

        if (draw.data.remaining === 0) throw new Error("Deck empty!");

        const card = draw.data.cards[0];

      setCards(c => [
        ...c,
        {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image,
        },
      ]);
    };

    async function shuffleDeck() {
        setCards([])
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        setDeck(res.data.deck_id);
    }

    function renderDeck() {
        if (!deck) return null;

        return (
            <button
                onClick={drawCard}
            >Draw</button>
        );
    }

    function reShuffle() {
        if (!deck) return null;

        return (
            <button
            onClick={shuffleDeck}>
                Reshuffle Deck
            </button>
        )
        
    }



    return (
        <div className="deck">
            {renderDeck()}
            {reShuffle()}

            {cards.map(c => <Card key={c.id} name={c.name} image={c.image} />)}

        </div>
    )
}

export default Deck