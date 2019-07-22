// This test mounts a component and makes sure that it didn’t throw during rendering

import React from 'react';

import ReactDOM from 'react-dom';
import RoomHandler from './../Chat/RoomHandler.js';

it('renders without crashing', () => {});

it('User s rooms can be requestd', () => {
    var roomHandler = new RoomHandler();
    roomHandler.getRoomsForUser()
    expect(roomHandler.rooms === '')

    
  });