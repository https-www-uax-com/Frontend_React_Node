import React from 'react';
import LabManagement from '../../components/LabManagement';
import ResearcherManagement from '../../components/ResearcherManagement';
import ExperimentManagement from '../../components/ExperimentManagement';

function AdminPage() {
    return (
        <div>
            <h1>Panel de Administración</h1>
            <LabManagement/>
            <ResearcherManagement/>
            <ExperimentManagement />
        </div>
    );
}

export default AdminPage;