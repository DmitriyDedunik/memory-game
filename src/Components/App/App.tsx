import React from "react"
import { useRef } from 'react';
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
    { numberImage: index, image, showImage: false, match: false },
    { numberImage: index, image, showImage: false, match: false }]);
// Перемешиваем массив пар
const shuffledPairs = pairs.flat().sort(() => Math.random() - 0.5);

export const App = () => {

    const [countClick, setCountClick] = React.useState(0);
    const [lastNumberImageElement, setLastNumberImageElement] = React.useState<number | null>(null)
    const [randomPairs, setRandomPairs] = React.useState(shuffledPairs);
    const refTimeout = useRef<NodeJS.Timeout | null>(null);

    const onClickSquare = (id: number) => {

        setLastNumberImageElement(randomPairs[id].numberImage);

        setRandomPairs((prevRandomPairs) => {
            const newRandomPairs = prevRandomPairs;
            newRandomPairs[id].showImage = true;
            // console.log(id);
            // console.log(newRandomPairs);
            return newRandomPairs;
        });

        const countShowImage = randomPairs.filter(
            (pair) =>
                pair.showImage === true).length;

        // Если количество кликов равно двум
        if (countShowImage === 1){
            console.log(randomPairs.filter(
                (pair) => pair.showImage && pair.numberImage === lastNumberImageElement ).length);

            const countMatches = randomPairs.filter(
                (pair) => pair.showImage && pair.numberImage === lastNumberImageElement ).length;
            if (countMatches === 2){
                setRandomPairs((prevRandomPairs) => {
                    const newRandomPairs = prevRandomPairs.map((el) => {
                        if (el.numberImage === lastNumberImageElement) {
                            return { ...el, match: true };
                        } else {
                            return el;
                        }
                    });
                    return newRandomPairs;
                });
            }
            else {
                refTimeout.current = setTimeout(() => {
                    setRandomPairs((prevRandomPairs) => {
                        const newRandomPairs = prevRandomPairs.map((el) => {
                            // Закрываем карточки
                            if (el.match != true){
                                return { ...el, showImage: false };
                            }else {
                                return el;
                            }
                        });
                        return newRandomPairs;
                    });
                }, 1500);
            }
        }
        else if (countShowImage > 1) {
            if (refTimeout.current != null) {
                clearTimeout(refTimeout.current);
            }
            setCountClick(0);
            setRandomPairs((prevRandomPairs) => {
                const newRandomPairs = prevRandomPairs.map((el) => {
                    // Закрываем две предыдущие карточки и открываем только ту, по которой нажали
                    if (el.match != true){
                        return { ...el, showImage: false };
                    }else {
                        return el;
                    }
                });
                newRandomPairs[id].showImage = true;
                return newRandomPairs;
            });
        }else {

        };
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
                        <h2 className="count_moves-made">28</h2>
                    </div>
                    <div className="container">
                        {
                            Array.from({ length: 16 }, (_, index) => (
                                <SquareItem
                                    key={index}
                                    id={index}
                                    image={randomPairs[index].image}
                                    showImage={randomPairs[index].showImage}
                                    onClickSquare={() => onClickSquare(index)}
                                />
                            ))
                        }
                    </div>
                    <div className="still-attempts">
                        <h2>ОСТАЛОСЬ</h2>
                        <h2>ПОПЫТОК</h2>
                        <h2 className="count_moves-made">12</h2>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}