import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
    showForm: false,
    height: null,
    weight: null,
    age: null,
    gender: "male",
    goal: 0,
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

  handleSubmit(e) {
    e.preventDefault();
    const { weight, height, age, gender, goal } = this.state;

    let calorieGoal = null;

    if (gender === "male") {
      calorieGoal =
        10 * (weight / 2.205) + 6.25 * height - 5 * age + 5 + 500 * goal;
    } else {
      calorieGoal =
        10 * (weight / 2.205) + 6.25 * height - 5 * age - 161 + 500 * goal;
    }

    this.setState({ maxCalories: calorieGoal, showForm: false });
  }

  render() {
    const { mealPlan, recipes, totalNutrition, maxCalories, showForm } =
      this.state;

    const { weight, height, age, gender, goal } = this.state;
    console.log(weight, height, age, gender, goal);

    return (
      <div>
        <Navbar>
          <Container fluid>
            <Navbar.Brand href="#" id="title">
              MEAL PLANNER
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="#my-website" id="credit">
                Jenn Ruan
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container fluid="xl">
          <Row>
            <Col xl="10" lg="9" md="8">
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
                          <h6>
                            {maxCalories - totalNutrition.calories} cal left
                          </h6>
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
            <div class="form">
              <Form className="d-flex" onSubmit={this.handleSubmit.bind(this)}>
                <Container>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom01">
                      <Form.Control
                        required
                        type="weight"
                        placeholder="Weight (lbs)"
                        className="me-2"
                        aria-label="Weight"
                        value={weight}
                        onChange={(e) => {
                          this.setState({ weight: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
                      <Form.Control
                        required
                        type="height"
                        placeholder="Height (cm)"
                        className="me-2"
                        aria-label="Height"
                        value={height}
                        onChange={(e) => {
                          this.setState({ height: e.target.value });
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <Form.Group controlId="validationCustom03">
                        <Form.Select
                          required
                          value={gender}
                          onChange={(e) => {
                            this.setState({ gender: e.target.value });
                          }}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="validaionCustom04">
                        <Form.Control
                          required
                          type="age"
                          placeholder="Age"
                          className="me-2"
                          aria-label="Age"
                          value={age}
                          onChange={(e) => {
                            this.setState({ age: e.target.value });
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom05">
                      <Form.Select
                        required
                        value={goal}
                        onChange={(e) => {
                          this.setState({ goal: e.target.value });
                        }}
                      >
                        <option value="0">Maintain my current weight</option>
                        <option value="2">Gain 2lb/week</option>
                        <option value="1">Gain 1lb/week</option>
                        <option value="0.5">Gain 0.5lb/week</option>
                        <option value="-0.5">Lose 0.5lb/week</option>
                        <option value="-1">Lose 1lb/week</option>
                        <option value="-2">Lose 2lb/week</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        onClick={() => this.setState({ showForm: false })}
                      >
                        Close
                      </Button>
                      <Button variant="outline-dark" type="submit">
                        Calculate
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </div>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default App;
