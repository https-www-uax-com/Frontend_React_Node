import React from 'react';
import SampleManagement from '../../components/SampleManagement';
import ExperimentManagement from '../../components/ExperimentManagement';

function ResearcherPage() {
    return (
        <div>
            <h1>Panel del Investigador</h1>
            <SampleManagement />
            <ExperimentManagement />
        </div>
    );
}

export default ResearcherPage;