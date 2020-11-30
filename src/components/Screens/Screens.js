import React, { useState } from 'react';
import Screen from './Screen/Screen.js';

const Screens = ({ children }) => {

  /* <Screens /> actually accepts components AND Arrays as
  children, so we check to see which we got and then proceed
  to put them all in an Array which we can be sure that all
  elements are React components. */

  let screenComponents = children.reduce((accumulator, child) => {

    if (Array.isArray(child)) {
      child.forEach(component => accumulator.push(component));
      return accumulator;
    }

    accumulator.push(child);

    return accumulator

  }, []);

  const screenVisibilyArray = screenComponents.map((component, index) => {
    if (index === 0) return true; // home screen is the only visible initally
    return false;
  });

  const [screens, setScreens] = useState(screenVisibilyArray);

  const screenChangeHandler = (direction, index) => {
    
    if (direction === 'prev') {
      if (index === 0) return;
      setScreens(oldScreens => {
        const updatedScreens = [...oldScreens];
        updatedScreens[index] = false;
        return updatedScreens;
      });
    }

    if (direction === 'next') {
      /* If the current screen happens to be the
      last and screenChangeHandler is called with
      'next' as direction, go back to the Home screen. */
      if (index === screens.length - 1) {

        const homeArray = screens.map((item, index) => {
          if (index === 0) return true;
          return false
        });

        setScreens(homeArray);
        return;
      }

      setScreens(oldScreens => {
        const updatedScreens = [...oldScreens];
        updatedScreens[index+1] = true;
        return updatedScreens;
      });
    }

  }

  /* This utility wraps each screen component
  with <Screen />  so that those components
  can be enhanced with logic and styles to
  make the screens work nicely together. */
  const screenWrapper = (component, index) => {

    return (
      <Screen
        key={index}
        screens={screens}
        index={index}
        screenChangeHandler={(direction) => screenChangeHandler(direction, index)}
        screenName={component.props['screenName']}
        backToMainScreens={component.props['backToMainScreens']}
      >
      
        {React.cloneElement(
          component,
          {screenChangeHandler: (direction) => screenChangeHandler(direction, index)}
        )}
      
      </Screen>
    );

  }

  const wrappedScreenComponents = screenComponents.map((screenComponent, index) => {
    return screenWrapper(screenComponent, index);
  });

  return wrappedScreenComponents;
}

export default Screens;
