import React, { Component } from 'react';
import './App.css';
import queens from './queens.json';

class App extends Component {
  constructor() {
    super();
    this.state = {rows: queens};
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

export default App;
