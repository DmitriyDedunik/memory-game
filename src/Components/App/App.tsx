import React, {useState} from "react"
import {useRef} from 'react';
import ReactModal from 'react-modal';
import "./App.css"
import {SquareItem} from "../SquareItem/SquareItem";
import image1 from '../../images/image1.svg'
import image2 from '../../images/image2.svg'
import image3 from '../../images/image3.svg'
import image4 from '../../images/image4.svg'
import image5 from '../../images/image5.svg'
import image6 from '../../images/image6.svg'
import image7 from '../../images/image7.svg'
import image8 from '../../images/image8.svg'

interface ImageItem {
    numberId: number;
    image: string;
    showImage: boolean;
    match: boolean;
}

const images: string[] = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
];

// Создаем массив пар картинок
const pairs = images.map((image, index) => [
    {numberId: index, image, showImage: false, match: false},
    {numberId: index, image, showImage: false, match: false}]);
// Перемешиваем массив пар
const shuffledPairs = pairs.flat().sort(() => Math.random() - 0.5);

let numberMoves: number = 0;

export const App = () => {

    const [randomPairs, setRandomPairs] = React.useState(shuffledPairs);
    const refTimeout = useRef<NodeJS.Timeout | null>(null);
    const [id, setId] = useState<number>(0);
    // const [numberMoves, setNumberMoves] = useState<number>(0);

    const onClickSquare = (id: number) => {

        setRandomPairs((prevRandomPairs) =>
            prevRandomPairs.map((el, index) => {
                return index === id ? {...el, showImage: true} : el
            })
        );

        setId(id)
    }

    const handlePlayAgain = () =>{
        randomPairs.sort(() => Math.random() - 0.5);
        setRandomPairs((randomPairs) =>
            randomPairs.map((el, index) => {
                return {...el, showImage: false, match: false}
            })
        );

        numberMoves = 0;
    }

    const lastNumberImageElement = randomPairs[id].numberId
    const pairsMatch = randomPairs.filter(
        (pair) => pair.match).length;

    const shownImageCount = randomPairs.filter(
        (pair) => pair.showImage && !pair.match).length;

    // Если количество кликов равно двум
    if (shownImageCount === 2) {

        numberMoves = numberMoves + 1;

        const countMatches = randomPairs.filter(
            (pair) => pair.showImage && (pair.numberId === lastNumberImageElement) && !pair.match).length;

        if (countMatches === 2) {
            setRandomPairs((prevRandomPairs) => {
                return prevRandomPairs.map((el) => {
                    return el.numberId === lastNumberImageElement ? {...el, match: true} : el
                });
            });
        }
        if (countMatches != 2) {
            refTimeout.current = setTimeout(() => {
                setRandomPairs((prevRandomPairs) => {
                    return prevRandomPairs.map((el) => {
                        // Закрываем карточки
                        return !el.match ? {...el, showImage: false} : el
                    });
                });
            }, 1500);
        }

    }

    if (shownImageCount > 2) {

        if (refTimeout.current != null) {
            clearTimeout(refTimeout.current);
        }

        setRandomPairs((prevRandomPairs) => {
            const newRandomPairs = prevRandomPairs.map((el, index) => {
                // Закрываем две предыдущие карточки и открываем только ту, по которой нажали
                return !el.match ? {...el, showImage: false} : el
            });
            newRandomPairs[id].showImage = true;
            return newRandomPairs;
        });

    }

    return (
        <React.Fragment>
            <div className="main-container">
                <div className="grid">
                    <div className="memory">
                        <h1>MEMORY</h1>
                    </div>
                    <div className="moves-made">
                        <h2>СДЕЛАНО</h2>
                        <h2>ХОДОВ</h2>
                        <h2 className="count_moves-made">{numberMoves}</h2>
                    </div>
                    <div className="container">
                        {
                            Array.from({length: 16}, (_, index) => (
                                <SquareItem
                                    key={index}
                                    id={index}
                                    image={randomPairs[index].image}
                                    showImage={randomPairs[index].showImage}
                                    match={randomPairs[index].match}
                                    onClickSquare={() => onClickSquare(index)}
                                />
                            ))
                        }
                    </div>
                    <div className="still-attempts">
                        <h2>ОСТАЛОСЬ</h2>
                        <h2>ПОПЫТОК</h2>
                        <h2 className="count_moves-made">{40 - numberMoves}</h2>
                    </div>
                </div>
                <ReactModal
                        isOpen={pairsMatch === 16 || numberMoves === 40}
                        // onRequestClose={/* функция, которая вызывается при закрытии модального окна */}
                        // shouldCloseOnOverlayClick={/* true, если вы хотите закрывать окно при клике на оверлей */}
                        // другие свойства по желанию
                        style={{
                            content: {
                                width: '689px',
                                height: '372px',
                                margin: 'auto', // Центрируем модальное окно по центру экрана
                                padding: '0',
                            },
                            overlay: {
                                background: 'rgba(0, 0, 0, 0.5)', // Задаем прозрачный оверлей
                            },
                        }}
                    >
                    <div className="message-form">
                        <p className="message-text-first">{numberMoves ===40 ? "УВЫ, ВЫ ПРОИГРАЛИ" : "УРА, ВЫ ВЫИГРАЛИ!"}</p>
                        <p className="message-text-second">{pairsMatch ===16 ? `ЭТО ЗАНЯЛО ${numberMoves} ХОДОВ` : "У ВАС КОНЧИЛИСЬ ХОДЫ"}</p>
                        <button className="play-again-button" onClick={handlePlayAgain}>
                            ИГРАТЬ ЕЩЕ
                        </button>
                    </div>
                </ReactModal>
            </div>
        </React.Fragment>
    )
}