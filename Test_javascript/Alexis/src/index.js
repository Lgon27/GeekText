import React from "react";
import ReactDOM from "react-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
      <ButtonGroup vertical>
        <Container fluid style={{ lineHeight: "32px" }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <p1 class="solid">
              <p2>Book : Random title</p2>
            </p1>
            <DropdownButton
              as={ButtonGroup}
              title="+"
              id="bg-vertical-dropdown-1"
              drop="right"
            >
              <Dropdown.Item eventKey="1">Wishlist_1</Dropdown.Item>
              <Dropdown.Item eventKey="2">Wishlist_2</Dropdown.Item>
              <Dropdown.Item eventKey="2">Wishlist_3</Dropdown.Item>
            </DropdownButton>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <p1 class="solid">
              <p2>Book : Random title</p2>
            </p1>
            <DropdownButton
              as={ButtonGroup}
              title="+"
              id="bg-vertical-dropdown-2"
              drop="right"
            >
              <Dropdown.Item eventKey="1">Wishlist_1</Dropdown.Item>
              <Dropdown.Item eventKey="2">Wishlist_2</Dropdown.Item>
              <Dropdown.Item eventKey="2">Wishlist_3</Dropdown.Item>
            </DropdownButton>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <p1 class="solid">
              <p2>Book : Random title</p2>
            </p1>
            <DropdownButton
              as={ButtonGroup}
              title="+"
              id="bg-vertical-dropdown-3"
              drop="right"
            >
              <Dropdown.Item eventKey="1">Wishlist_1 </Dropdown.Item>
              <Dropdown.Item eventKey="2">Wishlist_2 </Dropdown.Item>
              <Dropdown.Item eventKey="2">Wishlist_3 </Dropdown.Item>
            </DropdownButton>
          </Grid>
        </Container>

        <Dropdown as={ButtonGroup} drop="right">
          <Button variant="success">Buy</Button>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu vertical>
            <Dropdown.Item href="#/action-1">Wish list 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Wish List 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Wish List 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
