import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
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
    maxCalories: null,
    showForm: true,
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
    const { mealPlan, totalNutrition } = this.state;

    const nutrition = getNutrition(mealPlan.find((meal) => meal.id === id));

    this.setState({
      mealPlan: mealPlan.filter((meal) => meal.id !== id),
      totalNutrition: {
        protein: totalNutrition.protein - nutrition.protein,
        fat: totalNutrition.fat - nutrition.fat,
        carbs: totalNutrition.carbs - nutrition.carbs,
        calories: totalNutrition.calories - nutrition.calories,
      },
    });
  }

  setMaxCalories() {}

  render() {
    const { mealPlan, recipes, totalNutrition, maxCalories, showForm } =
      this.state;

    console.log(showForm);
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
                  <Toast>
                    <Toast.Header closeButton={false}>
                      {maxCalories ? (
                        <h6>{maxCalories - totalNutrition.calories} cal left</h6>
                      ) : (
                        <Button
                          onClick={() => this.setState({ showForm: true })}
                        >
                          Calculate Your Intake
                        </Button>
                      )}
                    </Toast.Header>
                    <Toast.Body>
                      <b>Calories:</b> {totalNutrition.calories} cal
                      <br />
                      <b>Protein:</b> {totalNutrition.protein} g
                      <br />
                      <b>Fat:</b> {totalNutrition.fat} g
                      <br />
                      <b>Carbs:</b> {totalNutrition.carbs} g
                    </Toast.Body>
                  </Toast>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>

        <Modal show={showForm}>
          <Modal.Header><Button onClick={() => this.setState({showForm: false})}>x</Button></Modal.Header>
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
        </Modal>
      </Container>
    );
  }
}

export default App;
