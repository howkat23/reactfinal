import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import MyMenu from './MyMenu';
import MyHotdog from './MyHotdog';
import React from 'react';
// import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <Toast show={show} onClose={() => toggleShow(!show)}>
      <Toast.Header>
      <strong className="mr-auto">React-Bootstrap</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
      </Toast>
  );
};


const App = () => (
  <Container className="p-3">
    <Jumbotron>
    <h1 className="header">Welcome To React-Bootstrap</h1>
    <ExampleToast>
    We now have Toasts
    <span role="img" aria-label="tada">
    🎉
    </span>
    </ExampleToast>
    </Jumbotron>
  </Container>
);



function App() {

  const [mealPlans, setMealPlans] = useState(
    localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []);
  const [selectedDay, setSelectedDay] = useState(false);

  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans))
  }, [mealPlans])

  const addMeal = () => {
    const newMeal = {
      title: "Today is ...",
      id: uuid(),
      mealForADay: "",
      ingredients: ""
    }
    setMealPlans([newMeal, ...mealPlans])
    console.log(newMeal);
  }

  const deleteDay = (mealId) => {
    setMealPlans(mealPlans.filter(({id}) => id !== mealId))
  }

  const updateDay = (myUpdatedMeal) => {
    const updatedMeals = mealPlans.map((mealPlan) => {
      if (mealPlan.id === myUpdatedMeal.id) {
        return myUpdatedMeal;
      }
      return mealPlan;
    }) 
      setMealPlans(updatedMeals)
  } 

  const getActiveMeal = () => {
    return mealPlans.find(({id})=> id === selectedDay)
  }
  
  return (
    <div className="App">
      <MyMenu 
      mealPlans={mealPlans} 
      addMeal={addMeal} 
      deleteDay={deleteDay}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
      />
      <MyHotdog selectedDay={getActiveMeal()} updateDay={updateDay}/>
    </div>
  );
}


export default App;
