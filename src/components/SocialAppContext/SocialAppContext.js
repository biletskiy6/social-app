import React from 'react';

const SocialAppContext = React.createContext();
export const SocialAppContextProvider = SocialAppContext.Provider
export const SocialAppContextConsumer = SocialAppContext.Consumer
export default SocialAppContext;