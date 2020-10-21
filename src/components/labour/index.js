import React from 'react';
import Labour from './Labour';
import { LabourContextProvider } from '../../context/labourContext';

const AboutLabour = () => {
    return (
        <LabourContextProvider>
            <Labour />
        </LabourContextProvider>
    )
}

export default AboutLabour;