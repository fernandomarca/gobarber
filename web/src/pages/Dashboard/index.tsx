import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();
  return (
    <Container>
      <h1>Dashboard</h1>
      <Link to="/reset-password">reset</Link>
    </Container>
  );
};

export default Dashboard;
