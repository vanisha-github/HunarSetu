import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ToastHost from './components/Toast.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import OpportunityDNA from './pages/OpportunityDNA.jsx'
import CareerExplorer from './pages/CareerExplorer.jsx'
import CareerDetail from './pages/CareerDetail.jsx'
import LearningRoadmap from './pages/LearningRoadmap.jsx'
import SkillPassport from './pages/SkillPassport.jsx'
import OpportunityNetwork from './pages/OpportunityNetwork.jsx'
import TalentDiscovery from './pages/TalentDiscovery.jsx'
import FacilitatorDashboard from './pages/FacilitatorDashboard.jsx'
import CSRImpact from './pages/CSRImpact.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dna" element={<OpportunityDNA />} />
          <Route path="careers" element={<CareerExplorer />} />
          <Route path="careers/:careerId" element={<CareerDetail />} />
          <Route path="learning" element={<LearningRoadmap />} />
          <Route path="passport" element={<SkillPassport />} />
          <Route path="opportunities" element={<OpportunityNetwork />} />
          <Route path="talent" element={<TalentDiscovery />} />
          <Route path="facilitator" element={<FacilitatorDashboard />} />
          <Route path="csr" element={<CSRImpact />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastHost />
    </>
  )
}
