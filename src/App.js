import React, { Component } from "react";
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

function getNutrition(meal) {
  const calories = meal.nutrition.nutrients.find(
    ({ name }) => name === "Calories"
  )
    ? meal.nutrition.nutrients.find(({ name }) => name === "Calories").amount
    : 0;
  const fat = meal.nutrition.nutrients.find(({ name }) => name === "Fat")
    ? meal.nutrition.nutrients.find(({ name }) => name === "Fat").amount
    : 0;
  const protein = meal.nutrition.nutrients.find(
    ({ name }) => name === "Protein"
  )
    ? meal.nutrition.nutrients.find(({ name }) => name === "Protein").amount
    : 0;
  const carbs = meal.nutrition.nutrients.find(
    ({ name }) => name === "Carbohydrates"
  )
    ? meal.nutrition.nutrients.find(({ name }) => name === "Carbohydrates")
        .amount
    : 0;

  return {
    calories,
    fat,
    protein,
    carbs,
  };
}

class App extends Component {
  state = {
    recipes: testRecipes,
    mealPlan: [],
    totalNutrition: { calories: 0, protein: 0, fat: 0, carbs: 0 },
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
    const { mealPlan, totalNutrition } = this.state;
    console.log(meal);
    if (mealPlan.find(({ id }) => id === meal.id)) {
      return;
    }

    const addedNutrition = getNutrition(meal);

    console.log(addedNutrition);
    this.setState({
      mealPlan: [...mealPlan, meal],
      totalNutrition: {
        protein: totalNutrition.protein + addedNutrition.protein,
        fat: totalNutrition.fat + addedNutrition.fat,
        carbs: totalNutrition.carbs + addedNutrition.carbs,
        calories: totalNutrition.calories + addedNutrition.calories,
      },
    });
  }

  removeMeal(id) {
    this.setState({
      mealPlan: this.state.mealPlan.filter((meal) => meal.id !== id),
    });
  }

  render() {
    const { mealPlan, recipes, totalNutrition } = this.state;
    return (
      <Container fluid="xl">
        <Navbar bg="light">
          <Container fluid>
            <Navbar.Brand href="#">React Meal Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
          </Container>
        </Navbar>

        <Row>
          <Col lg="10">
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
                        onClick={() => this.addMeal(recipe)}
                      >
                        Add
                      </Button>
                      <Button variant="light">More Info</Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Col>

          <Col>
            <div class="meals">
              <Container>
                <Row>
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
                </Row>
                <Row>
                  <div class="nutrition">
                    Calories: {totalNutrition.calories} cal
                    <br />
                    Protein: {totalNutrition.protein} g
                    <br />
                    Fat: {totalNutrition.fat} g
                    <br />
                    Carbs: {totalNutrition.carbs} g
                  </div>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>

        <div class="form">
          <Form className="d-flex">
            <Form.Group controlId="validationCustom01">
              <Form.Control
                required
                type="weight"
                placeholder="Weight"
                className="me-2"
                aria-label="Weight"
              />
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Control
                required
                type="height"
                placeholder="Height"
                className="me-2"
                aria-label="Height"
              />
            </Form.Group>
            <Form.Group controlId="validationCustom03">
              <Form.Select required>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="validaionCustom04">
              <Form.Control
                required
                type="age"
                placeholder="Age"
                className="me-2"
                aria-label="Age"
              />
            </Form.Group>
            <Button variant="outline-success">Calculate</Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default App;
