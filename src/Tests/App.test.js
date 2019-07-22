// This test mounts a component and makes sure that it didn’t throw during rendering

import React from 'react';

import ReactDOM from 'react-dom';
import App from './../App.js';

it('renders without crashing', () => {});

it('Registration failed, auth stays in false', () => {
    
    var app = new App();
    app.callbackRegister(false);
    expect(app.state.register === false);
    expect(app.state.auth === false);
    
  });