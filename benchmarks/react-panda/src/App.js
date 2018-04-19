import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: sortBy(comparingName, props.rows)
    };
  }

  render() {
    return (
      <section>
        <input type="search" placeholder="Search..." />
        <table>
          <thead>
            <tr>
              <td><strong>Name</strong></td>
              <td><strong>Age</strong></td>
              <td><strong>Origin</strong></td>
              <td><strong>Season</strong></td>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map(r =>
              <tr>
                <td>{r.name}</td>
                <td>{r.age}</td>
                <td>{r.origin}</td>
                <td>{r.season}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

function sortBy(f, xs) {
  var ys = [].concat(xs);
  ys.sort(f);
  return ys;
}

function comparingName(a, b) {
  return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
}

export default App;
