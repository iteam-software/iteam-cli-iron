import React from 'react';
import AppLayout from '../containers/AppLayout';

class Home extends React.Component {
  render() {
    return (
      <AppLayout>
        <section>
          <h1>Home</h1>
          <p>Hello, from Home!</p>
        </section>
      </AppLayout>
    );
  }
}

export default Home;