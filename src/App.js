import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./App.css";
import testRecipes from './mockdata';

const apiKey = '92e57b4dba754a429e75213a195d43bc';

class App extends Component {
  state = {
    recipes: testRecipes,
  }

  // componentDidMount() {
  //   fetch(`https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${apiKey}`)
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ recipes: data.results || [] })
  //   })
  //   .catch(console.log)
  // }

  render() {
  const {recipes} = this.state;
  return (
    <div>
    {/* {recipes.map((recipe) => { return(
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{recipe.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">steve@apple.com</h6>
          <img class="card-img-top" src={recipe.image}/>
        </div>
      </div>)
    })} */}

<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
  }
}

export default App;
