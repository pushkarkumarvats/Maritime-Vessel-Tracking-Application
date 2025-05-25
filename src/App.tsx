import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MapView from './pages/MapView';
import VesselDetails from './pages/VesselDetails';
import NotFound from './pages/NotFound';
import { VesselProvider } from './context/VesselContext';

function App() {
  return (
    <VesselProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MapView />} />
            <Route path="/vessel/:id" element={<VesselDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </VesselProvider>
  );
}

export default App;