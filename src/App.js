import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Toast from "react-bootstrap/Toast";
import "./App.css";
import testRecipes from "./mockdata";

const apiKey = "92e57b4dba754a429e75213a195d43bc";

class App extends Component {
  state = {
    recipes: testRecipes,
    mealPlan: [],
    minCalories: null,
    maxCalories: null,
  };

  // componentDidMount() {
  //   fetch(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${apiKey}`)
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

  removeMeal(id) {
    this.setState({
      mealPlan: this.state.mealPlan.filter((meal) => meal.id !== id),
    });
  }

  render() {
    const { mealPlan, recipes } = this.state;
    return (
      <Container fluid="xl">
        <Navbar bg="light">
          <Container fluid>
            <Navbar.Brand href="#">React Meal Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <Form.Control
                  type="weight"
                  placeholder="Weight"
                  className="me-2"
                  aria-label="Weight"
                />
                <Form.Control
                  type="height"
                  placeholder="Height"
                  className="me-2"
                  aria-label="Height"
                />
                <Button variant="outline-success">Calculate</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row>
          <div class="recipes">
            {recipes.map((recipe) => {
              return (
                <Card style={{ margin: "5px" }}>
                  <Card.Img variant="top" src={recipe.image} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text></Card.Text>
                    <Button variant="dark" onClick={() => this.addMeal(recipe)}>
                      Add
                    </Button>
                    <Button variant="light">More Info</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Row>

        <div class="meals">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Meal Plan</Accordion.Header>
              <Accordion.Body>
                {mealPlan.map((meal) => {
                  return (
                    <Toast
                      onClose={() => this.removeMeal(meal.id)}
                      style={{ marginBottom: "5px" }}
                    >
                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">{meal.title}</strong>
                        <small>
                          {
                            meal.nutrition.nutrients.find(
                              ({ name }) => name === "Calories"
                            ).amount
                          }{" "}
                          kcal
                        </small>
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
      </Container>
    );
  }
}

export default App;
