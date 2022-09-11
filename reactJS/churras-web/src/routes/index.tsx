import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Appointments from '../pages/Appointments';
import AppointmentDetail from '../pages/AppointmentDetail';
import AppointmentCreate from '../pages/AppointmentCreate';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/404';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/appointments" component={Appointments} isPrivate />
    <Route path="/appointment/:id_appointment/show" component={AppointmentDetail} isPrivate />
    <Route path="/appointment/create" component={AppointmentCreate} isPrivate />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
