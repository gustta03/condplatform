import { useEffect } from 'react';
import { Theme } from '../../components/SideBarTheme';
import { TokenValidate } from '../../auth/auth';

import { Cards } from './components/Cards';

import { LineCharts } from './components/LineCharts';
import { Title } from './style';

export const Dashboard = () => {
  useEffect(() => {
    const Validate = async () => {
      const token = localStorage.getItem('@user:admin');

      if (token) {
        const validate = await TokenValidate();
        console.log(validate);
      }
    };
    Validate();
  }, []);

  return (
    <Theme>
      <Title>Dashboard</Title>
      <Cards />
      <LineCharts />
    </Theme>
  );
};
