import { useEffect, useState } from "react"
import styled from "styled-components"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([])

  useEffect(() => {
    getVeggie()
  }, [])

    const getVeggie = async () => {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json()
      setVeggie(data.recipes)
    }
  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem'
        }}>
        {veggie.map((recipe) => {
          return(
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={'/recipe/' + recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                </Link>
              </Card>
            </SplideSlide>
          )
        })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: realtive;


  img {
    border-radius: 2rem;
    position: absoulute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Veggie