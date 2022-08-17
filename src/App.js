import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import "./App.css";
import testRecipes from "./mockdata";

const apiKey = "92e57b4dba754a429e75213a195d43bc";

class App extends Component {
  state = {
    recipes: testRecipes,
    mealPlan: [],
  };

  // componentDidMount() {
  //   fetch(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${apiKey}`)
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ recipes: data.results || [] })
  //   })
  //   .catch(console.log)
  // }

  addMeal(meal) {
    const { mealPlan } = this.state;
    if (mealPlan.find(({ id }) => id === meal.id)) {
      return;
    }
    this.setState({ mealPlan: [...mealPlan, meal] });
  }

  removeMeal(id){
    this.setState({ mealPlan: this.state.mealPlan.filter((meal) => meal.id !== id)});
  }

  render() {
    const { mealPlan, recipes } = this.state;
    return (
      <div class="recipes">
        {recipes.map((recipe) => {
          return (
            <Card style={{ margin: "5px" }}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text></Card.Text>
                <Button
                  variant="dark"
                  onClick={() =>
                    this.addMeal({ id: recipe.id, title: recipe.title })
                  }
                >
                  Add
                </Button>
                <Button variant="light">More Info</Button>
              </Card.Body>
            </Card>
          );
        })}

        <div class="meals">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Meal Plan</Accordion.Header>
              <Accordion.Body>
                {mealPlan.map((meal) => {
                  return (
                    <Toast onClose={() => this.removeMeal(meal.id)}>
                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">{meal.title}</strong>
                        <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                        Hello, world! This is a toast message.
                      </Toast.Body>
                    </Toast>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default App;
