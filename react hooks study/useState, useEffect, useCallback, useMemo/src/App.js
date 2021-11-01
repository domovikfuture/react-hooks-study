import {useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// const calcValue = () => {
//     console.log('random')
//     return Math.random() * (50 - 1) + 1;
// }

const countTotal = (num) => {
    console.log('counting...')
    return num + 10
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            "https://cdnuploads.aa.com.tr/uploads/Contents/2021/04/15/thumbs_b_c_98a5162fd8749c4ad5bcf8ae50fb6ba0.jpg?v=125033",
            "https://cdnuploads.aa.com.tr/uploads/Contents/2021/04/15/thumbs_b_c_98a5162fd8749c4ad5bcf8ae50fb6ba0.jpg?v=125033",
        ]
    }, []);

    function logging() {
        console.log('log!')
    }

    useEffect(() => {
        console.log('effect');
        document.title = `Slide: ${slide}`;
    }, []);

    useEffect(() => {
        console.log('effect update');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }

    }, []);

    useEffect(() => {
        console.log('autoplay')
    }, [autoplay]);

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay(i) {
        setAutoplay(autoplay => !autoplay);
    }

    // const [state, setState] = useState({
    //    slide: 0,
    //    autoplay: false
    // });
    // function changeSlide(i) {
    //     setState(state => ({...state, slide: state.slide + 1}));
    // }
    //
    // function toggleAutoplay() {
    //     setState(state => ({...state, autoplay: !state.autoplay}));
    // }

    const total = useMemo(() => {
        return countTotal(slide)
    }, [slide]);

    const style = useMemo(() => {
        return {
            color: slide > 4 ? 'red' : 'black'
        }
    }, [slide])

    useEffect(() => {
        console.log('styles!')
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total} </div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>Назад</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>Вперед</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>Toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages());
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);

    return (
      <>
          <button onClick={() => setSlider(false)}>Click</button>
          {slider ? <Slider/> : null}
      </>
  );
}

export default App;
